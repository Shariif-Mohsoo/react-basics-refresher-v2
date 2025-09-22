import { createContext, useCallback, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

// const Provider = ({ children }) => {
//   const [count, setCount] = useState(5);
//   const valueToShare = {
//     count,
//     incrementCount: () => {
//       setCount(count + 1);
//     },
//   };
//   //   console.log(count);
//   return (
//     <BooksContext.Provider value={valueToShare}>
//       {children}
//     </BooksContext.Provider>
//   );
// };

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);

  //2nd way
  const fetchBooks = useCallback(async () => {
    const { data } = await axios.get("http://localhost:3003/books");
    setBooks(data);
  }, []);

  const createBook = async (title) => {
    // const updatedBooks = [
    //   ...books,
    //   { id: Math.round(Math.random() * 9999), title },
    // ];
    // // console.log(updatedBooks);
    // setBooks(updatedBooks);

    //2nd way
    const response = await axios.post("http://localhost:3003/books", {
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
    await axios.delete(`http://localhost:3003/books/${id}`);
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
    const { data } = await axios.put(`http://localhost:3003/books/${id}`, {
      title,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) return { ...book, ...data };
      return book;
    });
    setBooks(updatedBooks);
  };

  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
};

export { Provider };
export default BooksContext;

//import BooksContext,{Provider} from './bla/bla/bla';
