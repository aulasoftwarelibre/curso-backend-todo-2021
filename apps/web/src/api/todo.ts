import axios from 'axios';
import { mutate } from 'swr';
import { Todo } from '../interfaces';
import { v4 as uuid } from 'uuid';

const newTodo = (label: string): Todo => ({
  id: uuid(),
  label: (label || '').trim(),
  done: false,
});

export const deleteTodo = async (id: string) => {
  await axios.delete(`/api/todos/${id}`);

  mutate('/api/todos');
};

export const addTodo = async (label: string) => {
  await axios.post('/api/todos', { ...newTodo(label) });

  mutate('/api/todos');
};

export const setDone = async (id: string, done: boolean) => {
  await axios.patch<Todo>(`/api/todos/${id}`, { done });

  mutate('/api/todos');
};

export const toggleDone = async (id: string) => {
  const {
    data: { done },
  } = await axios.get<Todo>(`/api/todos/${id}`);

  setDone(id, !done);
};

export const setLabel = async (id: string, label: string) => {
  await axios.patch<Todo>(`/api/todos/${id}`, { label });

  mutate('/api/todos');
};
