import "./index.css";

import { useEffect } from "react";

import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

import useBooksContext from "./hooks/use-books-context";

const App = () => {
  const { fetchBooks } = useBooksContext();
  //Don't do this
  // fetchBooks(); //It wll result in infinite requests(which will slow down the system)
  // Prefered Approach
  useEffect(() => {
    fetchBooks();
  }, []); //inserting value in this case like(books) will result in infiite look because fetchBook() method itself changes the state.

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList />
      <BookCreate />
    </div>
  );
};

export default App;
