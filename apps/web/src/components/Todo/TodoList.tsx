import { NavLink, useParams } from 'react-router-dom';
import React, { useCallback, useMemo } from 'react';
import TodoItem from './TodoItem';
import { useInput, useOnEnter, useTodos } from '../../hooks';
import { Todo } from '../../interfaces';
import { addTodo, deleteTodo, setDone } from '../../api';

export const TodoList = () => {
  const { filter } = useParams<{ filter: string }>();
  const [todos = [], { isLoading, isError }] = useTodos();

  const left = useMemo(
    () => todos.reduce((p, c) => p + (c.done ? 0 : 1), 0),
    [todos]
  );

  const visibleTodos = useMemo(
    () =>
      filter
        ? todos.filter((i) => (filter === 'active' ? !i.done : i.done))
        : todos,
    [todos, filter]
  );

  const anyDone = useMemo(() => todos.some((i: Todo) => i.done), [todos]);
  const allSelected = useMemo(
    () => visibleTodos.every((i) => i.done),
    [visibleTodos]
  );

  const onToggleAll = useCallback(() => {
    visibleTodos.forEach((i) => setDone(i.id, !allSelected));
  }, [visibleTodos, allSelected]);

  const onClearCompleted = useCallback(() => {
    todos.forEach((i) => {
      if (i.done) {
        deleteTodo(i.id);
      }
    });
  }, [todos]);

  const { value, onChange, setValue } = useInput();
  const onAddTodo = useOnEnter(() => {
    if (value) {
      addTodo(value);
      setValue('');
    }
  }, [value]);

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyPress={onAddTodo}
          value={value}
          onChange={onChange}
        />
      </header>

      <section className="main">
        <input
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
          checked={allSelected}
          onChange={onToggleAll}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{left}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <NavLink exact={true} to="/" activeClassName="selected">
              All
            </NavLink>
          </li>
          <li>
            <NavLink to="/active" activeClassName="selected">
              Active
            </NavLink>
          </li>
          <li>
            <NavLink to="/completed" activeClassName="selected">
              Completed
            </NavLink>
          </li>
        </ul>
        {anyDone && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};

export default TodoList;
