#!/bin/bash
set -euo pipefail

LOG_FILE="$(dirname "$0")/startup.log"
FRONTEND_DIR="./client"
BACKEND_DIR="./server"

touch "$LOG_FILE"

truncate -s 0 "$LOG_FILE"

log_info() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - INFO: $1" | tee -a "$LOG_FILE"
}

log_error() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - ERROR: $1" >&2 | tee -a "$LOG_FILE"
}

check_port() {
  local port="$1"
  if netstat -tulnp | grep -q ":$port "; then
    log_error "Port $port is already in use."
    return 1
  else
    return 0
  fi
}

start_mongodb() {
  if ! pgrep -x "mongod"; then
    log_info "Starting MongoDB..."
    sudo systemctl start mongodb || {
      log_error "Failed to start MongoDB."
    }
  else
    log_info "MongoDB is already running."
  fi
}

install_frontend_dependencies() {
  if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    log_info "Installing frontend dependencies..."
    pushd "$FRONTEND_DIR" > /dev/null
    npm install
    if [ $? -ne 0 ]; then
      log_error "Failed to install frontend dependencies."
      popd > /dev/null
      exit 1
    fi
    popd > /dev/null
  else
    log_info "Frontend dependencies already installed."
  fi
}

build_frontend() {
  log_info "Building frontend..."
  pushd "$FRONTEND_DIR" > /dev/null
  npm run build
  if [ $? -ne 0 ]; then
    log_error "Failed to build frontend."
    popd > /dev/null
    exit 1
  fi
  popd > /dev/null
}

install_backend_dependencies() {
  if [ ! -d "$BACKEND_DIR/node_modules" ]; then
    log_info "Installing backend dependencies..."
    pushd "$BACKEND_DIR" > /dev/null
    npm install
    if [ $? -ne 0 ]; then
      log_error "Failed to install backend dependencies."
      popd > /dev/null
      exit 1
    fi
    popd > /dev/null
  else
    log_info "Backend dependencies already installed."
  fi
}

configure_backend() {
  log_info "Configuring backend..."

  if [ ! -f "$BACKEND_DIR/.env" ]; then
      log_error "Missing .env file in $BACKEND_DIR. Please create one."
      exit 1
  fi
  export $(grep -v '^#' "$BACKEND_DIR/.env" | xargs)

  if [ -z "$PORT" ]; then
      export PORT=3001
      log_info "PORT environment variable not found in .env, using default value: 3001"
  fi

  if check_port "$PORT"; then
    exit 1
  fi
}

copy_frontend_build() {
    log_info "Copying frontend build to backend public directory..."
    if [ -d "$BACKEND_DIR/public" ]; then
        rm -rf "$BACKEND_DIR/public"
    fi
    mkdir "$BACKEND_DIR/public"
    cp -r "$FRONTEND_DIR/build/"* "$BACKEND_DIR/public/"
    if [ $? -ne 0 ]; then
        log_error "Failed to copy frontend build to backend public directory."
        exit 1
    fi
}

start_backend() {
  log_info "Starting backend..."
  pushd "$BACKEND_DIR" > /dev/null
  npm start
  if [ $? -ne 0 ]; then
    log_error "Failed to start backend."
    popd > /dev/null
    exit 1
  fi
  popd > /dev/null
}

cleanup() {
  log_info "Cleaning up..."
  exit_code=$1
  exit $exit_code
}

trap 'log_error "Script terminated due to an error."; cleanup $exit_code' ERR
trap 'log_info "Script interrupted."; cleanup 130' INT TERM

start_mongodb
install_frontend_dependencies
build_frontend
install_backend_dependencies
configure_backend
copy_frontend_build
start_backend

log_info "Application started successfully."