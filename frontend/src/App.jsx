import "./App.css";
import basket_logo from "./assets/basket_transparent.svg";
import vercel_logo from "./assets/vercel.png";
function App() {
  return (
    <div className="h-screen overflow-y-hidden">
      <img src={basket_logo} className="h-[10rem] mx-auto mt-8" />
      <p className="text-center mt-2 mb-8 text-base font-body font-semibold text-black/40">
        <img className="inline h-4 opacity-50" src={vercel_logo} /> for farmers
      </p>
      <div className="text-center text-2xl font-body mx-10 p-4 border bg-white/70 rounded-2xl drop-shadow-md">
        <div className=" mb-4">Existing Users</div>
        <button className="bg-primary font-body text-lg text-white active:bg-primary/80 px-4 py-2 rounded-2xl">
          Log In
        </button>
        <div className=" mt-8">Create an Account</div>
        <div className=" mb-4 text-base text-black/30">
          Select an account type
        </div>
        <div className="flex flex-row">
          <button className="inline-block border text-lg flex-1 border-secondary font-body text-secondary active:bg-secondary/10 px-4 py-2 mr-1 rounded-2xl">
            Farmer
          </button>
          <button className="inline-block border text-lg flex-1 border-secondary font-body text-secondary active:bg-secondary/10 px-4 py-2 ml-1 rounded-2xl">
            Shopper
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
