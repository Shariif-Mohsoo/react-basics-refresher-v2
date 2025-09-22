import BookShow from "./BookShow";

import useBooksContext from "../hooks/use-books-context";

const BookList = () => {
  // const { count, incrementCount } = useContext(booksContext);
  const { books } = useBooksContext();

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
