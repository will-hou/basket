import "./App.css";
import basket_logo from "./assets/basket_transparent.svg";
import vercel_logo from "./assets/vercel.png";

import Auth from "./components/auth.jsx";

function App() {
  return (
    <div className="h-screen overflow-y-hidden">
      <img src={basket_logo} className="h-[10rem] mx-auto mt-8" />
      <p className="text-center mt-2 mb-8 text-base font-body font-semibold text-black/40">
        <img className="inline h-4 opacity-50" src={vercel_logo} /> for farmers
      </p>
      <div className="text-center text-2xl font-body mx-10 p-4 border bg-white/70 rounded-2xl drop-shadow-md">
        <Auth />
      </div>
    </div>
  );
}

export default App;
