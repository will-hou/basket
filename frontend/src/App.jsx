import "./App.css";

import vercel_logo from "./assets/vercel.png";

import Auth from "./components/auth.jsx";
import Basket from "./components/basket.jsx";

function App() {
  return (
    <div className="h-screen overflow-y-hidden">
      <Basket size="10" />
      <h1 className="text-center text-6xl font-display text-secondary font-bold mt-2">
        Basket
      </h1>
      <p className="text-center mt-2 mb-8 text-base font-body font-semibold text-black/40">
        {/* <img className="inline h-4 opacity-50" src={vercel_logo} /> for farmers */}
        Fresh groceries, delivered together.
      </p>
      <div className="text-center text-2xl font-body mx-10 p-4 border bg-white/70 rounded-2xl drop-shadow-md">
        <Auth />
      </div>
    </div>
  );
}

export default App;
