import "./index.css";

import { useEffect, useState } from "react";

import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

const App = () => {
  const [books, setBooks] = useState([]);

  //2nd way
  const fetchBooks = async () => {
    const { data } = await axios.get("http://localhost:3001/books");
    setBooks(data);
  };
  //Don't do this
  // fetchBooks(); //It wll result in infinite requests(which will slow down the system)
  // Prefered Approach
  useEffect(() => {
    fetchBooks();
  }, []); //inserting value in this case like(books) will result in infiite look because fetchBook() method itself changes the state.

  const createBook = async (title) => {
    // const updatedBooks = [
    //   ...books,
    //   { id: Math.round(Math.random() * 9999), title },
    // ];
    // // console.log(updatedBooks);
    // setBooks(updatedBooks);

    //2nd way
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });
    // console.log(response);
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    // const updatedBooks = books.filter((book) => book.id !== id);
    // setBooks(updatedBooks);

    //2nd Way
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const editBookById = async (id, title) => {
    //   const updatedBooks = books.map((book) => {
    //     if (book.id === id) return { ...book, title };
    //     return book;
    //   });
    //  setBooks(updatedBooks);

    //2nd way
    const { data } = await axios.put(`http://localhost:3001/books/${id}`, {
      title,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) return { ...book, ...data };
      return book;
    });
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
};

export default App;
