import React, { useState, useEffect } from 'react';
import { Todo } from './types';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(), // Simple unique ID
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8 sm:mb-10 tracking-tight">
          My Todo List
        </h1>
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleComplete={toggleComplete}
          onDelete={deleteTodo}
        />
        <footer className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Dualite Alpha. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;
