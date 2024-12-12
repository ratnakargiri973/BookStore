import React, { useState } from 'react'
import axios from 'axios'
import instance from '../axiosConfig.js';

function AddBook() {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        price: "",
        description: "",
        publisher: "",
        image: ""
    });
    const [successMsg, setSuccessMsg] = useState(false);

    function handleChange(e){
        const {name, value} = e.target;
        if (name === "image") {
            setFormData({ ...formData, [name]: e.target.files[0] });
        }        
        else{
            setFormData({...formData, [name]: value});
        }
    }

    async function handleSubmit(e){
      e.preventDefault();
      const frm = new FormData();
      frm.append("title", formData.title);
      frm.append("author", formData.author);
      frm.append("price", formData.price);
      frm.append("description", formData.description);
      frm.append("publisher", formData.publisher);
      frm.append("image", formData.image);

      try {
        const response = await instance.post("api/add/book", frm);
        if (response.status === 201) setSuccessMsg(true);
    } catch (error) {
        console.error('Error adding book:', error);
    }
    }

  return (
    <>
      {successMsg && <h3>Book Added Successfully</h3>}
      <h2>Add a book</h2>
      <form action="" ncType="multipart/form-data" onSubmit={handleSubmit}>
        <input 
           type="text" 
           name="title"
           placeholder='Title'
           value={formData.title}
           onChange={handleChange}
           />
           <br />
        <input 
           type="text" 
           name="author"
           placeholder='Author' 
           value={formData.author}
           onChange={handleChange}/>
           <br />
        <input 
           type="text" 
           name="price"
           placeholder='Price' 
           value={formData.price}
           onChange={handleChange}/>
           <br />
        <textarea 
           type="text" 
           name="description"
           placeholder='Description' 
           value={formData.description}
           onChange={handleChange}></textarea>
           <br />
        <input 
           type="text" 
           name="publisher" 
           placeholder='Publisher'
           value={formData.publisher}
           onChange={handleChange}/>
           <br />
        <input 
           type="file" 
           name="image"
           onChange={handleChange}/>
           <br />
        <button type='submit'>Add Book</button>
      </form>
    </>
  )
}

export default AddBook
