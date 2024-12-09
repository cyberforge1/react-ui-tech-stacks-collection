// src/pages/FormPage/FormPage.tsx

import React, { useState, useEffect } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../api/api';
import { Todo } from '../../types/types';

const FormPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Ensure todos is initialized as an empty array
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setIsLoading(true);
    try {
      const data = await getTodos();
      setTodos(data || []); // Ensure todos is always an array
      setError(null);
    } catch (error) {
      console.error('Error loading todos:', error);
      setError('Failed to load todos. Please try again later.');
      setTodos([]); // Reset todos to an empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (title: string) => {
    try {
      await createTodo({ title });
      loadTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleUpdateTodo = async (id: number, title: string) => {
    try {
      await updateTodo(id, { title });
      loadTodos();
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  return (
    <div>
      <h1>Todo Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TodoForm onSubmit={handleAddTodo} buttonText="Add Todo" />
      {isLoading ? (
        <p>Loading todos...</p>
      ) : (
        <ul>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li key={todo.id}>
                {isEditing === todo.id ? (
                  <TodoForm
                    onSubmit={(title) => handleUpdateTodo(todo.id, title)}
                    initialTitle={todo.title}
                    buttonText="Update Todo"
                  />
                ) : (
                  <>
                    <h3>{todo.title}</h3>
                    <button onClick={() => setIsEditing(todo.id)}>Edit</button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default FormPage;
