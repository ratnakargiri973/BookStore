import mongoose from "mongoose";

var bookSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minLength: [4, "Title should be atleast of 4 characters"]
      },
      author: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      publisher: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      }
});

const Books = mongoose.model("Books", bookSchema);
export default Books;