// src/pages/TodoForm/TodoForm.tsx

import React, { useState } from 'react';

interface TodoFormProps {
  onSubmit: (title: string) => void;
  initialTitle?: string;
  buttonText: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialTitle = '', buttonText }) => {
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles form submission and calls the onSubmit callback.
   * @param e - Form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure the title is not empty or whitespace
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      setError(null); // Clear any previous errors
      console.log('Submitting title:', title); // Debugging log
      onSubmit(title.trim());
      setTitle(''); // Reset form after successful submission
    } catch (error) {
      console.error('Error during submission:', error);
      setError('Failed to submit. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default TodoForm;
