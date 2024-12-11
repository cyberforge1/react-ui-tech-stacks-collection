// src/pages/TodoForm/TodoForm.tsx

import React, { useState } from 'react';

interface TodoFormProps {
  onSubmit: (title: string) => Promise<void> | void;
  initialTitle?: string;
  buttonText: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialTitle = '', buttonText }) => {
  if (typeof initialTitle !== 'string') {
    throw new Error('initialTitle must be a string');
  }

  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      setError(null); // Clear any previous errors
      console.log('Submitting title:', title);
      await onSubmit(title.trim());
      setTitle(''); // Reset form after successful submission
    } catch (error) {
      console.error('Error during submission:', error);
      setError('Failed to submit. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p style={{ color: 'red' }} aria-live="polite">
          {error}
        </p>
      )}
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError(null);
        }}
        placeholder="Title"
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default TodoForm;
