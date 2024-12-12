import React, { useState } from 'react'
import instance from '../axiosConfig';

function AddBlog() {
    const [formData, setFormData] = useState({
       title: "",
       author: "",
       content: "",
       category: "",
       image: ""
    });

    const [successMsg, setSuccessMsg] = useState("");

    function handleChange(e){
        const {name, value} = e.target;
        
        if(name === "image"){
            setFormData({...formData, [name]: e.target.files[0]})
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
        frm.append("content", formData.content);
        frm.append("category", formData.category);
        frm.append("image", formData.image);
        try {
            const response = await instance.post('api/post/blog', frm);
    
            if(response.status === 201) setSuccessMsg(response.data.message); 
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    }
  return (
    <>
    {successMsg && <h3>{successMsg}</h3>}
    <h2>Blogs</h2>
      <form action="" encType="multipart/form-data" onSubmit={handleSubmit}>
            <input 
               type="text" 
               name="title" 
               placeholder="Enter Blog Title" 
               value={formData.title}
               onChange={handleChange}/>
               <br />

            <input 
               type="text" 
               name="author" 
               placeholder="Enter Author Name" 
               value={formData.author}
               onChange={handleChange}/>
               <br />

            <textarea 
               type="text" 
               name="content" 
               placeholder="Content" 
               value={formData.content}
               onChange={handleChange}></textarea>
               <br />

            <input 
               type="text" 
               name="category" 
               placeholder="Enter Blog Category" 
               value={formData.category}
               onChange={handleChange}/>
               <br />

            <input 
               type="file" 
               name="image"
               onChange={handleChange}/>
           <br />

           <button type='submit'>Add Blog</button>
      </form>
    </>
  )
}

export default AddBlog;
