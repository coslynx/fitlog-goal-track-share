// src/pages/Dashboard.jsx
import React, { useCallback, useState } from 'react';
import GoalList from 'src/components/goals/GoalList.jsx';
import GoalForm from 'src/components/goals/GoalForm.jsx';
import { useAuth } from 'src/context/AuthContext.js';

/**
 * Dashboard component displaying a list of goals and a form to create new goals.
 */
const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [refreshGoals, setRefreshGoals] = useState(false);

  const handleGoalCreated = useCallback(() => {
    setRefreshGoals((prev) => !prev);
  }, []);

  // Basic error handling for AuthContext
  if (isAuthenticated === undefined) {
    console.error('AuthContext values are undefined.');
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h1>Dashboard</h1>
        <p style={{ color: 'red', fontStyle: 'italic' }}>
          Authentication status unavailable. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <GoalForm onGoalCreated={handleGoalCreated} />
      <GoalList refresh={refreshGoals} />
    </div>
  );
};

export default Dashboard;

/*
Testing Considerations:

Unit Tests:
- Rendering logic: Verify that the component renders correctly when the user is authenticated.
- Error handling: Verify that the component displays an appropriate error message when the authentication context is not available.
- Integration with GoalList and GoalForm: Verify that the GoalList and GoalForm components are rendered correctly within the Dashboard component.
- Verify that the component triggers a refresh of the GoalList after a new goal is created.

Integration Tests:
- Verify that the Dashboard component integrates correctly with the AuthContext and other components in the application.
- Test the data flow from the GoalForm component to the GoalList component.
- Test the creation of a new goal and verify that it appears in the GoalList.
- Ensure the user is redirected if not authenticated.

Accessibility Considerations:
- Ensure that the component is accessible to users with disabilities.
- Provide appropriate ARIA attributes for screen readers.
*/