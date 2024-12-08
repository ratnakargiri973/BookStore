import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Book() {
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  async function fetchData(idToFetch) {
    const response = await axios.get("http://localhost:8080/api/get/book/" + idToFetch);
    setBook(response.data);
  }

  return (
    <div className="flex justify-center items-center w-full p-4">
      <section
        id="singleBook"
        className="flex flex-col md:flex-row justify-center items-center gap-4 p-4 bg-gray-200 rounded shadow-md w-full max-w-xl"
      >
        <div>
          {book.image && (
            <img src={book.image} alt={book.title} className="w-full h-72 object-cover rounded-md" />
          )}
        </div>
        <div className="right flex flex-col justify-center items-center gap-2">
          <h4 className="text-lg font-bold">{book.title}</h4>
          <p className="text-gray-700">{book.author}</p>
          <p className="text-gray-600">{book.description}</p>
          <Link to="" className="text-blue-500 p-3 rounded-xl bg-red-200 hover:bg-red-300">
            Add to cart
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Book;
