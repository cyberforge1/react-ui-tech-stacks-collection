// src/__tests__/api/api.test.ts

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getHelloWorld,
  getMainMessage,
} from '../../api/api';
import { Todo } from '../../types/types';

describe('API Tests', () => {
  const API_BASE_URL = 'http://localhost:5001/api';
  let mock: InstanceType<typeof MockAdapter>; // Correctly typed mock

  beforeAll(() => {
    mock = new MockAdapter(axios); // Initialize the mock adapter
  });

  afterEach(() => {
    mock.reset(); // Reset mock state after each test
  });

  afterAll(() => {
    mock.restore(); // Restore Axios's original behavior
  });

  it('should fetch the main message', async () => {
    const mockResponse = { message: 'Welcome to the Todo Management API!' };
    mock.onGet(`${API_BASE_URL}/`).reply(200, mockResponse);

    const response = await getMainMessage();
    expect(response).toEqual('Welcome to the Todo Management API!');
  });

  it('should fetch the Hello World message', async () => {
    const mockResponse = { message: 'Hello, World!' };
    mock.onGet(`${API_BASE_URL}/helloworld/`).reply(200, mockResponse);

    const response = await getHelloWorld();
    expect(response).toEqual('Hello, World!');
  });

  it('should fetch all todos', async () => {
    const todos: Todo[] = [{ id: 1, title: 'Test Todo' }];
    mock.onGet(`${API_BASE_URL}/todos/`).reply(200, todos); // Return raw array

    const response = await getTodos();
    expect(response).toEqual(todos);
  });

  it('should fetch a todo by ID', async () => {
    const todo: Todo = { id: 1, title: 'Test Todo' };
    mock.onGet(`${API_BASE_URL}/todos/1/`).reply(200, todo); // Return raw todo

    const response = await getTodoById(1);
    expect(response).toEqual(todo);
  });

  it('should create a new todo', async () => {
    const newTodo: Todo = { id: 2, title: 'New Todo' };
    mock.onPost(`${API_BASE_URL}/todos/`).reply(201, newTodo); // Return raw todo

    const response = await createTodo({ title: 'New Todo' });
    expect(response).toEqual(newTodo);
  });

  it('should update a todo', async () => {
    const updatedTodo: Todo = { id: 1, title: 'Updated Todo' };
    mock.onPut(`${API_BASE_URL}/todos/1/`).reply(200, updatedTodo); // Return raw todo

    const response = await updateTodo(1, { title: 'Updated Todo' });
    expect(response).toEqual(updatedTodo);
  });

  it('should delete a todo', async () => {
    const mockResponse = { message: 'Todo deleted' };
    mock.onDelete(`${API_BASE_URL}/todos/1/`).reply(200, mockResponse); // Return message

    const response = await deleteTodo(1);
    expect(response.message).toEqual('Todo deleted');
  });
});
