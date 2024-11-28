import React from 'react';
import { TodoWrapperLocalStorage } from '../Components/Todo/TodoWrapperLocalStorage'; // Correct path to TodoWrapperLocalStorage
import './TodoPage.css';

const TodoPage = () => {
  return (
    <div className="todo-page">
      <div className="todo-page-container">
        <TodoWrapperLocalStorage />
      </div>
    </div>
  );
};

export default TodoPage;
