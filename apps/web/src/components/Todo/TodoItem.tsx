import React, { useCallback, useState, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { deleteTodo, setLabel, toggleDone } from '../../api';
import { useOnEnter } from '../../hooks';
import { Todo } from '../../interfaces';
import { useDoubleClick } from '@zattoo/use-double-click';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editing, setEditing] = useState(false);

  const onDelete = useCallback(() => deleteTodo(todo.id), [todo.id]);
  const onDone = useCallback(() => toggleDone(todo.id), [todo.id]);
  const onChange = useCallback(
    (event) => setLabel(todo.id, event.target.value),
    [todo.id]
  );

  const handleViewClick = useDoubleClick(() => setEditing(true));
  const finishedCallback = useCallback(() => {
    setEditing(false);
    setLabel(todo.id, todo.label.trim());
  }, [todo]);

  const onEnter = useOnEnter(finishedCallback, [todo]);
  const ref = useRef(null);
  useOnClickOutside(ref, finishedCallback);

  return (
    <li
      onClick={handleViewClick}
      className={`${editing ? 'editing' : ''} ${todo.done ? 'completed' : ''}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.done}
          onChange={onDone}
          autoFocus={true}
        />
        <label>{todo.label}</label>
        <button className="destroy" onClick={onDelete} />
      </div>
      {editing && (
        <input
          ref={ref}
          className="edit"
          value={todo.label}
          onChange={onChange}
          onKeyPress={onEnter}
        />
      )}
    </li>
  );
};

export default TodoItem;
