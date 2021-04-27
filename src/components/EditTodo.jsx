import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { getTodo, updateTodo } from "../api";
import { TodoForm } from "./TodoForm";

const EditTodo = () => {
  const [todo, setTodo] = useState();
  const match = useRouteMatch();
  const history = useHistory()

  useEffect(() => {
    console.log(match.params.id)
    const fetchTodo = async () => {
      const myTodo = await getTodo(match.params.id);
      console.log('matched todo: ', myTodo)
      setTodo(myTodo);
    };
    fetchTodo();
    
  }, []);

  const onSubmit = async (data) => {
    await updateTodo(data, match.params.id)
    console.log('My data: ', data);
    history.push('/')
  };
  return todo ? (
    <div className="container">
      <div className="mt-3">
        <h3>Edit Todo Item</h3>
        <TodoForm todo={todo} onSubmit={onSubmit} />
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export { EditTodo };
