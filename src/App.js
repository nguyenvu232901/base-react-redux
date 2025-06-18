import "./App.scss";

const App = () => {
  const handleClick = () => {
    console.log("Button clicked!");
    alert("Button clicked!");
  };
  return (
    <div className="app-container">
      hello word
      <button className="btn btn-primary" onClick={handleClick}>
        Test
      </button>
    </div>
  );
};

export default App;
