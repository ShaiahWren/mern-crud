import React from "react";
import { useForm } from "react-hook-form";
import { TodoForm } from "./TodoForm";
import { createTodo } from '../api'  
const CreateTodo = () => {
  


  const onSubmit = (data) => {
    console.log('data: ', data);
    createTodo(data);
  };
  return (
    <div className="container">
      <div className="mt-3">
        <h3>Create Todo Item</h3>
        <TodoForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export { CreateTodo };
