const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DATABASE_URL;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(`error connecting to mongodb: ${error}`);
  });

const todoSchema = new mongoose.Schema({
  title: String,
});

todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Todo", todoSchema);
