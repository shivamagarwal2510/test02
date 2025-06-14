import React from 'react';
import { Todo } from '../types';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3 transition-all duration-300 ease-in-out hover:shadow-md">
      <div className="flex items-center flex-grow">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className="mr-3 text-gray-500 hover:text-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-full"
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <Circle size={24} />
          )}
        </button>
        <span
          className={`text-lg flex-grow text-gray-800 ${
            todo.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-4 p-2 text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full"
        aria-label="Delete todo"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default TodoItem;
