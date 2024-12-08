import React from 'react'
import {Link} from 'react-router-dom';

function Books({ books }) {
  return (
    <>
      <section id='books' className='flex items-center flex-col gap-8'>
        <h2 className='font-bold text-5xl'>Our Collections</h2>
        <div className="books-wrapper flex justify-around items-start gap-8">
          {books.map((book) => (
            <div className="book flex flex-col justify-center items-center gap-2" key={book._id}>
              {book.image && (
                <Link to={`book/${book._id}`}>
                   <img src={book.image} alt={book.title} className='w-48 h-48 rounded'/>
                </Link>
              )}
              <h3>
                <Link to={`book/${book._id}`} className='text-gray-600 font-bold'>
                    {book.title}
                </Link>
              </h3>
              <p>{book.price}</p>
              <Link to={`book/${book._id}`} className='p-2 bg-blue-400 rounded-lg hover:bg-blue-200'>View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


export default Books
