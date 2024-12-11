import axios from 'axios';
import React, { useState } from 'react'

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "" 
  });
  const [message, setMessage] = useState("");

  function handleChange(e){
    const {name, value} = e.target;
    setData((prevData) => {
      return {...prevData, [name] : value};
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const finalData = Object.fromEntries(formData.entries());
      const response = await axios.post('http://localhost:8080/api/login/user', finalData);
  
      if(response.status === 200){
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error);
    }
   
  }
  return (
    <>
      {message.length > 0  && (
        <p><em>{message}</em></p>
      )}

      <h2> Log in to your account</h2>

      <form action="" onSubmit={handleSubmit}>
           <input 
              type="text" 
              name="username" 
              placeholder="Enter your username" 
              value={data.username}
              onChange={handleChange}
              />
              <br />
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              value={data.password}
              onChange={handleChange}
              />
              <br />

              <button type='submit'>Log In</button>
      </form>
    </>
  )
}

export default Login
