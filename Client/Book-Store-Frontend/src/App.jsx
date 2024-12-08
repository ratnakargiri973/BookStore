import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Books from './Components/Books';

function App() {
  const [books, setBooks] = useState([]);

 useEffect(()=>{
  fetchData();
 }, []);
  async function fetchData(){
    const response = await axios.get("http://localhost:8080/api/get/book");
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
