// src/components/goals/GoalList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios@1.8.3';
import { useAuth } from 'src/context/AuthContext.js';
import Button from 'src/components/common/Button.jsx';

// TypeScript interfaces for data consistency and safety
interface Goal {
  id: number;
  name: string;
  description: string;
  target: number;
  unit: string;
  current: number;
}

/**
 * GoalList component displaying a list of fitness goals fetched from an API.
 */
const GoalList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      const response = await axios.get(`${baseURL}/api/goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Basic data validation to ensure the API returns the expected format
        if (Array.isArray(response.data)) {
          setGoals(response.data);
        } else {
          console.error('API returned unexpected data format:', response.data);
          setError('Failed to load goals: Unexpected data format from API.');
        }
      } else {
        console.error('Failed to fetch goals:', response.status, response.statusText);
        setError(`Failed to load goals: Server responded with status ${response.status}`);
      }
    } catch (err: any) {
      console.error('Error fetching goals:', err.message);
      // Enhanced error handling with specific messages for different error types
      if (err.response) {
        setError(`Failed to load goals: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        setError('Failed to load goals: No response received from the server. Please check your network connection.');
      } else {
        setError(`Failed to load goals: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDeleteGoal = useCallback(
    async (goalId: number) => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
        const response = await axios.delete(`${baseURL}/api/goals/${goalId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Update the goals state to remove the deleted goal
          setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
        } else {
          console.error('Failed to delete goal:', response.status, response.statusText);
          setError(`Failed to delete goal: Server responded with status ${response.status}`);
        }
      } catch (err: any) {
        console.error('Error deleting goal:', err.message);
        // Enhanced error handling with specific messages for different error types
        if (err.response) {
          setError(`Failed to delete goal: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
        } else if (err.request) {
          setError('Failed to delete goal: No response received from the server. Please check your network connection.');
        } else {
          setError(`Failed to delete goal: ${err.message}`);
        }
      }
    },
    [token]
  );

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // Inline styles for the component
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const listItemStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const goalInfoStyle = {
    flexGrow: 1,
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  const loadingStyle = {
    fontSize: '16px',
    fontStyle: 'italic',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>My Fitness Goals</h2>
      {error && <div style={errorStyle}>{error}</div>}
      {loading ? (
        <div style={loadingStyle}>Loading...</div>
      ) : (
        <ul style={listStyle}>
          {goals.map((goal) => (
            <li key={goal.id} style={listItemStyle}>
              <div style={goalInfoStyle}>
                <strong>{goal.name}</strong> - {goal.description}<br />
                Target: {goal.target} {goal.unit}, Current: {goal.current}
              </div>
              <Button label="Delete" onClick={() => handleDeleteGoal(goal.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoalList;

/*
Testing Considerations:

Unit Tests:
- Rendering logic: Verify that the component renders correctly with different states (loading, error, data).
- Data fetching: Mock the API call and verify that the component fetches and displays the goals correctly.
- Error handling: Mock API errors and verify that the component displays appropriate error messages.
- Deletion functionality: Mock the delete API call and verify that the component updates the state correctly after deleting a goal.
- Empty goal lists: Test the component's behavior when the API returns an empty list of goals.
- Invalid data: Test the component's behavior when the API returns invalid data (e.g., missing fields, incorrect data types).

Integration Tests:
- Verify that the GoalList component integrates correctly with the AuthContext and other components in the application.
- Test the data flow from the API to the GoalList component.
- Test the deletion flow when the user clicks the "Delete" button.

Accessibility Considerations:
- Ensure that the component is accessible to users with disabilities.
- Provide appropriate ARIA attributes for screen readers.
- Ensure that the component is keyboard-navigable.
*/