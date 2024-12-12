import { cloudinaryUploader } from '../Middleware/Cloudinary.js';
import Books from '../Model/BookSchema.js';
import mongoose from 'mongoose';

export const AddBook = (async (req, res) => {
    try {
        const result = await cloudinaryUploader(req.file.buffer);
        const {title, author, price, description, publisher} = req.body;

        const bookToAdd = new Books({
            title,
            author,
            price,
            description,
            publisher,
            image: result.secure_url
        });

        await bookToAdd.save();
        res.status(201).send({message: "Book added sucessfully"});
    } catch (error) {
        res.status(500).send({error: error});
    }
});

export const getAllBooks = ( async (req, res) =>{
    try {
        let query = {}; 


        if(req.query.author) {
            query.author = { $regex: new RegExp(req.query.author, "i") };
        }
       
        if(req.query.publisher) {
            query.publisher = { $regex: new RegExp(req.query.publisher, "i") };
        }

        if(req.query.title) {
            query.title = { $regex: new RegExp(req.query.title, "i") };
        }

        if(req.query.minPrice && req.query.maxPrice){
            query.price = {
                $gte: req.query.minPrice,
                $lte: req.query.maxPrice,
            };
        }

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 4;
        const skip = (page - 1) * limit;

        const allBooks = await Books.find(query).skip(skip).limit(limit);
        res.send(allBooks);
    } catch (error) {
        res.status(500).send({error: error});
    }
});

export const getSingleBook = async (req, res) => {
    const {id} = req.params;
    try {
       if(!id){
        return res.status(400).send({message: "You must specify a id of the book"});
       };
       
       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message: "Given ID is not in proper format"});
       }

       const book = await Books.findById(id);
    //    console.log(book);
       
       if(!book){
        return res.status(404).send({message: "No Book is found with that ID"});
       };

       res.status(200).send(book);

    } catch (error) {
        res.status(500).send({error: err});
    }
}

export const updateBook = async (req, res) => {
    const {id} = req.params;

    const {title, author, price, description, publisher} = req.body;

    try {
        if(!id){
            return res.status(400).send({message: "You must specify a Book ID"});
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({message: "Given ID is not in proper format"});
        }

        const updateToBook = await Books.findByIdAndUpdate(id, {
             title,
             author, 
             price, 
             description, 
             publisher
        });

        if(!updateToBook){
            return res.status(404).send({message: "No Book is found with that ID"});
           };
    
           res.status(200).send(updateToBook);
    } catch (error) {
        res.status(500).send({error: error});
    }
}

export const deleteBook = async (req, res) => {
    const {id} = req.params;
 try {
    if(!id){
        return res.status(400).send({message: "You must specify a Book ID"})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({message: "The Book ID is not in proper format"});
    }

    const deletedBook = await Books.findByIdAndDelete(id);

    if (!deletedBook)
        return response
          .status(404)
          .send({ message: "No book found with the given ID" });
  
      res.send({ message: "Book with the given ID deleted" });
 } catch (error) {
      res.status(500).send({message: "Error deleting book", error});
 }
   
}