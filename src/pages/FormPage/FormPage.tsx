// src/pages/FormPage/FormPage.tsx

import React, { useState, useEffect } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../api/api';
import { Todo } from '../../types/types';

const FormPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Initialize todos as an empty array
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadTodos();
  }, []);

  /**
   * Fetches the todos from the backend and updates the state.
   */
  const loadTodos = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching todos...');
      const data = await getTodos();
      console.log('Todos fetched successfully:', data);
      setTodos(data || []); // Always ensure `todos` is an array
      setError(null);
    } catch (error) {
      console.error('Error loading todos:', error);
      setError('Failed to load todos. Please try again later.');
      setTodos([]); // Reset todos to an empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Adds a new todo by calling the API.
   * @param title - Title of the new todo
   */
  const handleAddTodo = async (title: string) => {
    try {
      console.log('Adding todo:', title);
      await createTodo({ title });
      console.log('Todo added successfully.');
      loadTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo. Please try again.');
    }
  };

  /**
   * Updates an existing todo by calling the API.
   * @param id - ID of the todo to update
   * @param title - Updated title of the todo
   */
  const handleUpdateTodo = async (id: number, title: string) => {
    try {
      console.log(`Updating todo (ID: ${id}) with title:`, title);
      await updateTodo(id, { title });
      console.log('Todo updated successfully.');
      loadTodos();
      setIsEditing(null);
    } catch (error) {
      console.error(`Error updating todo (ID: ${id}):`, error);
      setError('Failed to update todo. Please try again.');
    }
  };

  /**
   * Deletes a todo by calling the API.
   * @param id - ID of the todo to delete
   */
  const handleDeleteTodo = async (id: number) => {
    try {
      console.log(`Deleting todo (ID: ${id})`);
      await deleteTodo(id);
      console.log('Todo deleted successfully.');
      loadTodos();
    } catch (error) {
      console.error(`Error deleting todo (ID: ${id}):`, error);
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
