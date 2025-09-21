import BookShow from "./BookShow";

import { useContext } from "react";
import booksContext from "../context/books";

const BookList = () => {
  // const { count, incrementCount } = useContext(booksContext);
  const { books } = useContext(booksContext);

  const renderedBooks = books.map((book) => (
    <BookShow key={book.id} book={book} />
  ));
  return (
    <>
      {/* <button onClick={incrementCount}>Click</button>
      {count} */}
      <div className="book-list">{renderedBooks}</div>
    </>
  );
};

export default BookList;
