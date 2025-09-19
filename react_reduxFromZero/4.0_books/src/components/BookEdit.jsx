import { useState } from "react";

const BookEdit = ({ book, onSubmit }) => {
  const [title, setTitle] = useState(book.title);
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(`New title ${title}`);
    onSubmit(book.id, title);
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
