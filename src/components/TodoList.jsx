import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTodos } from "../api";
import axios from 'axios';

const TodoList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/").then((res) => {
      console.log("data: ", res.data);
      setItems(res.data)
      console.log('items: ', items)
    });

    // const fetchItems = async () => {
    //   const todos = await getTodos;
    //   setItems(todos);
    // };
    // fetchItems();
    // console.log("fetch items: ", items);
  }, []);

  return (
    <div className="container">
      <div className="mt-3">
        <h3>Todo List</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Text</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((todo) => {
                return (
                  <tr key={todo._id}>
                      <td>{todo.text}</td>
                      <td>
                          <Link to={`/edit/${todo._id}`}>Edit</Link>
                      </td>
                  </tr>
              )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { TodoList };
