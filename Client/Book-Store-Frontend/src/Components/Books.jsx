import React from 'react'

function Books({ books }) {
  return (
    <>
      <section>
        <h2>Our Collections</h2>
        <div className="books-wrapper">
          {books.map((book) => (
            <div className="book" key={book._id}>
              <h3>{book.title}</h3>
              {book.image && <img src={book.image} alt={book.title} />}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


export default Books
