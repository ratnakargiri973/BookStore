import express from 'express';
import { AddBook, 
        deleteBook, 
        getAllBooks, 
        getSingleBook, 
        updateBook } from '../Controller/BookController.js';
        import upload from '../Middleware/Multer.js';

const BookRouter = express.Router();

BookRouter.post("/add/book", upload.single("image"), AddBook);
BookRouter.get("/get/book", getAllBooks);
BookRouter.get("/get/book/:id", getSingleBook);
BookRouter.put("/update/book/:id", updateBook);
BookRouter.delete("/delete/book/:id", deleteBook);

export default BookRouter;

