const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Todo = require("./models/todo");

const url = process.env.DATABASE_URL;
const port = process.env.PORT;

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: "unknown endpoint",
  });
};

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(`error connecting to mongodb: ${error}`);
  });

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/api/todos", (request, response) => {
  Todo.find({}).then((todos) => {
    response.json(todos);
  });
});

app.get("/api/todos/:id", (request, response) => {
  Todo.findById(request.params.id)
    .then((todo) => {
      if (todo) {
        response.json(todo);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/api/todos", (request, response) => {
  const body = request.body;
  if (body.title === undefined) {
    return response.status(400).json({
      error: "title is missing",
    });
  }
  const todo = new Todo({
    title: body.title,
  });
  todo.save().then((savedTodo) => {
    response.json(savedTodo);
  });
});

app.delete("/api/todos/:id", (request, response) => {
  const id = request.params.id;
  Todo.findByIdAndRemove(id, (error, removedTodo) => {
    if (error) {
      response.json({
        error: error,
      });
    } else {
      console.log(`removed todo ${removedTodo.title}`);
      response.json(removedTodo);
    }
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
