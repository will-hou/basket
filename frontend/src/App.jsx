import "./App.css";

function App() {
  return (
    <div>
      <h1 className="font-display text-6xl m-10 text-center ">Basket</h1>
      <div className="text-center px-12">
        <div className="text-start my-4">For existing users:</div>
        <button className="bg-primary text-white active:bg-primary/80 px-4 py-2 rounded">
          Log In
        </button>
      </div>
    </div>
  );
}

export default App;
