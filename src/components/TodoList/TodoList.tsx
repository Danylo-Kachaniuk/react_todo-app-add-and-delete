import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[];
  filterValue: FilterType;
  onDelete: (id: number) => void;
  tempTodo: Todo | null;
  processingTodos: number[];
};

function filterTodo(todos: Todo[], filterBy: FilterType) {
  switch (filterBy) {
    case FilterType.all:
      return todos;
    case FilterType.completed:
      return todos.filter(todo => todo.completed);
    case FilterType.active:
      return todos.filter(todo => !todo.completed);
  }
}

export const TodoList: React.FC<Props> = ({
  todos,
  filterValue,
  onDelete,
  tempTodo,
  processingTodos,
}) => {
  const visibleTodos = filterTodo(todos, filterValue);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          isLoader={processingTodos.includes(todo.id)}
          onDelete={onDelete}
        />
      ))}
      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          key={tempTodo.id}
          isLoader={true}
          onDelete={onDelete}
        />
      )}
    </section>
  );
};
