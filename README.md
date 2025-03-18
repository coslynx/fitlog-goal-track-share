<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
fitness-tracker-mvp
</h1>
<h4 align="center">Track fitness goals, share progress, and achieve a healthier lifestyle.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-red" alt="JavaScript, HTML, CSS">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="MongoDB">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-mvp?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-mvp?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-mvp?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 API Documentation
- 🔑 License
- 👏 Authors

## 📍 Overview
This repository contains a Minimum Viable Product (MVP) for a fitness tracker web application, enabling users to set goals, track progress, and share their achievements. Built with React, Node.js, Express, and MongoDB, it provides user authentication, goal setting, and progress tracking features.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔑 | **User Authentication** | Secure user registration and login using bcryptjs and JSON Web Tokens (JWT).                                      |
| 🎯 | **Goal Setting**      | Users can set fitness goals with target values and units.                                                           |
| 📈 | **Progress Tracking** | Track progress towards goals by logging daily or weekly activities.                                                |
| 🤝 | **Social Sharing**    | Users can share their achievements with friends via a social feed (future implementation).                         |
| 📱 | **Responsive Design** | The application is designed to be responsive and accessible across various devices.                                |
| 🛡️ | **Secure API**        | The backend API is secured with JWT authentication to protect user data.                                       |

## 📂 Structure
```text
├── .env                     # Environment variables
├── .gitignore                # Specifies intentionally untracked files that Git should ignore
├── package.json              # Lists project dependencies and scripts
├── README.md                 # Project documentation
├── startup.sh                # Script to start the application
├── commands.json             # JSON file with commands
├── client                    # React frontend
│   ├── public                # Public assets
│   │   └── index.html        # HTML entry point
│   ├── src                   # React source code
│   │   ├── App.js            # Main application component
│   │   ├── index.js          # React DOM rendering
│   │   ├── components        # Reusable components
│   │   │   ├── common        # Common components
│   │   │   │   ├── Button.jsx  # Reusable button component
│   │   │   │   └── Input.jsx   # Reusable input component
│   │   │   ├── layout        # Layout components
│   │   │   │   └── Header.jsx  # Header component
│   │   │   ├── auth          # Authentication components
│   │   │   │   └── AuthForm.jsx  # Authentication form
│   │   │   └── goals         # Goal tracking components
│   │   │   │   ├── GoalList.jsx  # Goal list component
│   │   │   │   └── GoalForm.jsx  # Goal form component
│   │   ├── pages             # Application pages
│   │   │   ├── Home.jsx        # Home page component
│   │   │   └── Dashboard.jsx   # Dashboard component
│   │   ├── context           # Context API
│   │   │   └── AuthContext.js  # Authentication context
│   │   ├── services          # API services
│   │   │   └── api.js        # API service
│   │   ├── utils             # Utility functions
│   │   │   └── helpers.js    # Helper functions
│   │   └── styles            # Global styles
│   │       └── global.css    # Global CSS
├── server                    # Node.js backend
│   ├── models                # Mongoose models
│   ├── routes                # API routes
│   ├── controllers           # Route handlers
│   └── server.js             # Main server file
```

## 💻 Installation
  > [!WARNING]
  > ### 🔧 Prerequisites
  > - Node.js v18.0.0 or higher
  > - npm v6 or higher
  > - MongoDB installed and running

  ### 🚀 Setup Instructions
  1. Clone the repository:
     ```bash
     git clone https://github.com/coslynx/fitness-tracker-mvp.git
     cd fitness-tracker-mvp
     ```
  2. Install server dependencies:
     ```bash
     cd server
     npm install
     cd ..
     ```
  3. Install client dependencies:
     ```bash
     cd client
     npm install
     cd ..
     ```
  4. Configure environment variables:
     ```bash
     cp .env.example .env
     # Edit .env to configure database connection and other settings
     ```

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application:
   - Web interface: [http://localhost:3000](http://localhost:3000)

> [!TIP]
> ### ⚙️ Configuration
> - `REACT_APP_API_BASE_URL`:  Base URL of the backend API (default: http://localhost:3001)
> - `REACT_APP_AUTH_TOKEN_KEY`: Key used to store the authentication token in localStorage (default: fitness_app_auth_token)

### 📚 Examples

- 📝 **Registering a new user**:
  Open the web application and navigate to the registration page.

- 📝 **Creating a fitness goal**:
  Log in and use the goal creation form on the dashboard.

## 🌐 Hosting
### 🚀 Deployment Instructions

#### Deploying to Heroku
1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create fitness-tracker-mvp-production
   ```
4. Set up environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set REACT_APP_API_BASE_URL=https://your-heroku-app.herokuapp.com
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   ```
5. Deploy the code:
   ```bash
   git push heroku main
   ```

### 🔑 Environment Variables
- `NODE_ENV`: Set to `production` for production environment.
- `REACT_APP_API_BASE_URL`: Base URL of the backend API.
- `MONGODB_URI`: Connection string for the MongoDB database.
- `JWT_SECRET`: Secret key for JWT token generation.

## 📄 API Documentation
### 🔍 Endpoints
- **POST /api/auth/register**
  - Description: Register a new user
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST /api/auth/login**
  - Description: Login a user
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **GET /api/goals**
  - Description: Get all goals for a user
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[{ "id": string, "name": string, "description": string, "target": number, "unit": string, "current": number }]`

- **POST /api/goals**
  - Description: Create a new goal
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "name": string, "description": string, "target": number, "unit": string }`
  - Response: `{ "id": string, "name": string, "description": string, "target": number, "unit": string, "current": number }`

### 🔒 Authentication
1. Register a new user or login to receive a JWT token.
2. Include the token in the `Authorization` header for all protected routes:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

### 📝 Examples
```bash
# Register a new user
curl -X POST http://localhost:3001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Create a new goal
curl -X POST http://localhost:3001/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"name": "Weight Loss", "description": "Lose 10kg", "target": 10, "unit": "kg"}'

# Response
{
  "id": "goal123",
  "name": "Weight Loss",
  "description": "Lose 10kg",
  "target": 10,
  "unit": "kg",
  "current": 0
}
```

> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: fitlog-goal-track-share
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>