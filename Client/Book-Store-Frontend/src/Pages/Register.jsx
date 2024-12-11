import axios from 'axios';
import React, { useState } from 'react'

function Register() {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  })

  const [message, setMessage] = useState("");

  function handleChange(e){
    const {name, value} = e.target;
    setData((prev) => {
      return {...prev, [name]: value};
    });
  }

  async function handldeSubmit(e){
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const finalData = Object.fromEntries(formData.entries());

      const response = await axios.post('http://localhost:8080/api/add/user', finalData);
      console.log(response);
      if(response.status === 201) setMessage(response.data.message  + ". Check your for a confirmation link");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {message.length > 0 ? <h3>{message}</h3> : ""}
      <h2>Sign Up</h2>

      <form action="" onSubmit={handldeSubmit}>
        <input 
           type="text" 
           name="name"
           placeholder='Enter your name' 
           value={data.name}
           onChange={handleChange}
           autoFocus/>
           <br />

        <input 
           type="text" 
           name="username"
           placeholder='Pick a username' 
           value={data.username}
           onChange={handleChange}
           autoFocus/>
           <br />

        <input 
           type="email" 
           name="email"
           placeholder='Enter your email' 
           value={data.email}
           onChange={handleChange}
           autoFocus/>
           <br />

        <input 
           type="password" 
           name="password"
           placeholder='Enter your password' 
           value={data.password}
           onChange={handleChange}
           autoFocus/>
           <br />

        <input 
           type="number" 
           name="phone"
           placeholder='Enter your phone' 
           value={data.phone}
           onChange={handleChange}
           autoFocus/>
           <br />

           <button type='submit'>Register</button>
      </form>
    </>
  )
}

export default Register
