import React, { useState, useEffect } from 'react'
import instance from './axiosConfig.js';
import Books from './Components/Books';

function App() {
  const [books, setBooks] = useState([]);

 useEffect(()=>{
  fetchData();
 }, []);
  async function fetchData(){
    const response = await instance.get("api/get/book");
    // console.log(response.data);
    setBooks(response.data);
  }
  return (
    <>
      <Books books={books}/>
    </>
  )
}

export default App
