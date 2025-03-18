// src/components/goals/GoalForm.jsx
import React, { useState, useCallback } from 'react';
import { useAuth } from 'src/context/AuthContext.js';
import Button from 'src/components/common/Button.jsx';
import Input from 'src/components/common/Input.jsx';
import api from 'src/services/api.js';

// TypeScript interface for goal form data
interface GoalFormData {
  name: string;
  description: string;
  target: number | null;
  unit: string;
}

/**
 * GoalForm component providing a form for creating new fitness goals.
 */
const GoalForm = () => {
  const [formData, setFormData] = useState<GoalFormData>({
    name: '',
    description: '',
    target: null,
    unit: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAuth();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
      let value: any = e.target.value;
        if (fieldName === 'target') {
            value = value === '' ? null : Number(value);
        }
      setFormData({
        ...formData,
        [fieldName]: value,
      });
      setErrors({
        ...errors,
        [fieldName]: '', // Clear error on input change
      });
    },
    [formData, errors]
  );

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) {
      newErrors.name = 'Goal name is required';
    }
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    if (formData.target === null || isNaN(Number(formData.target))) {
      newErrors.target = 'Target value must be a number';
    }
    if (!formData.unit) {
      newErrors.unit = 'Unit is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      const response = await api.post(`${baseURL}/api/goals`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Clear the form
        setFormData({
          name: '',
          description: '',
          target: null,
          unit: '',
        });
        setErrors({});
        alert('Goal created successfully!');

        // TODO: Trigger a refresh of the GoalList component.
        //  This could be done via a callback prop, a context update, or a global state management solution.
      } else {
        console.error('Failed to create goal:', response.status, response.statusText);
        alert(`Failed to create goal: Server responded with status ${response.status}`);
      }
    } catch (err: any) {
      console.error('Error creating goal:', err.message);
      if (err.response) {
        alert(`Failed to create goal: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        alert('Failed to create goal: No response received from the server. Please check your network connection.');
      } else {
        alert(`Failed to create goal: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, token]);

  // Inline styles for the component
  const formContainerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '500px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={headingStyle}>Create New Goal</h2>
      {Object.keys(errors).length > 0 && (
        <div style={errorStyle}>
          {Object.values(errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          label="Goal Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange(e, 'name')}
          error={errors.name}
          placeholder="Enter goal name"
        />
        <Input
          label="Description"
          type="text"
          value={formData.description}
          onChange={(e) => handleInputChange(e, 'description')}
          error={errors.description}
          placeholder="Enter description"
        />
        <Input
          label="Target Value"
          type="number"
          value={formData.target === null ? '' : String(formData.target)}
          onChange={(e) => handleInputChange(e, 'target')}
          error={errors.target}
          placeholder="Enter target value"
        />
        <Input
          label="Unit"
          type="text"
          value={formData.unit}
          onChange={(e) => handleInputChange(e, 'unit')}
          error={errors.unit}
          placeholder="Enter unit (e.g., kg, steps)"
        />
        <Button
          label="Create Goal"
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </form>
    </div>
  );
};

export default GoalForm;

/*
Testing Considerations:

Unit Tests:
- Rendering logic: Verify that the component renders correctly with all the input fields and labels.
- Input handling: Verify that the component correctly updates the state when the user types in the input fields.
- Validation: Verify that the component correctly validates the form and displays appropriate error messages.
- Submit handling: Mock the API call and verify that the component correctly sends the data to the API when the user submits the form.
- Loading state: Verify that the component displays a loading indicator while the API request is in progress.
- Error handling: Mock API errors and verify that the component displays appropriate error messages to the user.
- Form clearing: Verify the form clears after a successful form submission.

Integration Tests:
- Verify that the GoalForm component integrates correctly with the AuthContext and other components in the application.
- Test the data flow from the GoalForm component to the API.
- Test the form submission flow when the user fills out the form and clicks the "Create Goal" button.
- Test the integration with GoalList: Ensure new goal appears in the GoalList upon creation.
- Ensure appropriate ARIA attributes for screen readers.
*/