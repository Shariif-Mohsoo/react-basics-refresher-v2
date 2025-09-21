import { useContext, useState } from "react";

import BooksContext from "../context/books";

const BookEdit = ({ book, onSubmit }) => {
  const [title, setTitle] = useState(book.title);

  const { editBookById } = useContext(BooksContext);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(`New title ${title}`);
    editBookById(book.id, title);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="book-edit">
      <label>Title</label>
      <input
        onChange={handleChange}
        value={title}
        className="input"
        autoFocus
      />
      <button className="button is-primary">Save</button>
    </form>
  );
};

export default BookEdit;
