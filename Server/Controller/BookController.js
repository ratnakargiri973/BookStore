import Books from '../Model/BookSchema.js';
import mongoose from 'mongoose';

export const AddBook = (async (req, res) => {
    try {
        const {title, author, price, description, publisher} = req.body;

        const bookToAdd = new Books({
            title,
            author,
            price,
            description,
            publisher
        });

        await bookToAdd.save();
        res.status(201).send({message: "Book added sucessfully"});
    } catch (error) {
        res.status(500).send({error: err});
    }
});

export const getAllBooks = ( async (req, res) =>{
    try {
        const allBooks = await Books.find();
        res.send(allBooks);
    } catch (error) {
        res.status(500).send({error: err});
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