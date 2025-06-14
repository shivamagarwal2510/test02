import React, { useState, useEffect } from 'react';
    import { Todo } from './types';
    import TodoForm from './components/TodoForm';
    import TodoList from './components/TodoList';
    import { motion } from 'framer-motion';

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-950 to-black py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-zinc-900 rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 border border-zinc-700"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-8 sm:mb-10 tracking-tight">
              My Todo List
            </h1>
            <TodoForm onAddTodo={addTodo} />
            <TodoList
              todos={todos}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
            />
            <footer className="mt-10 text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Dualite Alpha. All rights reserved.
            </footer>
          </motion.div>
        </div>
      );
    }

    export default App;
