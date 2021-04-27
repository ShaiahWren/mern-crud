const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./Models/Todo");

mongoose.connect("mongodb://127.0.0.1:2717/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongodb connection established successfully!");
  })
  .on("error", (error) => {
    console.log("Connection error: ", error);
  });

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

app.post("/create", (req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

app.put("/:id", (req, res) => {
    const id = req.params.id; 
    Todo.findById(id, (err, todo) => {
      if(!todo) {
          res.status(404).send("Todo not found");
      }else{
          todo.text = req.body.text;
          todo.save()
          .then((todo) => {
              res.json(todo);
          }).catch(err => res.status(500).send(err.message))
      }
    });
  });

app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
