function App() {
  /*
    PRACTICE OF BASICS
  */
  const name = "Mohsin";
  let message = "Bye There!";
  if (Math.random() > 0.5) {
    message = "Hello There";
  }
  return (
    <div>
      <h1>
        Hey!
        {" " + message}
        <h3>My name is: {name}</h3>
        Today is: {new Date().toLocaleTimeString()}
      </h1>

      <input
        style={{
          height: "30px",
          width: "25rem",
          fontSize: "20px",
          border: "3px solid red  ",
        }}
        type="number"
        min={1}
        max={20}
        autoFocus={true}
      />
    </div>
  );
}

export default App;
