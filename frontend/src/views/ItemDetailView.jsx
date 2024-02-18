import React, { useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import { BACKEND_HOST } from "../.config";


const ItemDetailView = (props) => {
  const [startingProgress, setStartingProgress] = useState(0.5);
  const [newProgress, setNewProgress] = useState(0.66);

  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(0);


  const navigate = useNavigate();
  const { cart } = React.useContext(CartContext);
  const { state } = useLocation();

  const getProgress = async () => {

    fetch(BACKEND_HOST + "/getprogress")
      .then((response) => response.json())
      .then((data) => {
        // Update the progress state based on the API response
        console.log(data.cur)
        setCur(data.cur / data.threshold)
        setPrev((data.cur - 1) / data.threshold)
      })
      .catch((error) => {
        console.error("Error fetching progress:", error);
      });
  }

  const addToCart = (item) => {
    cart.add(item);
  };

  const backButtonHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    getProgress();
    setStartingProgress(cart.has(state.itemName) ? newProgress : 0.5);
  }, [state, cart]);

  return (
    <div className="flex flex-col items-center text-center gap-4 p-5">
      <img
        className="w-[250px] h-[250px] rounded-[20px]"
        src={state.itemImage}
      ></img>
      <h1 className="font-display text-[32px] font-bold ">{state.itemName}</h1>
      <p className="font-body">{state.itemDescription}</p>
      <div className="p-5 items-center min-w-[80vw] max-w-[90vw] flex flex-row gap-5 border-black border-2 rounded-xl">
        <img src={state.farmImage} className="w-20 h-20 rounded-full"></img>
        <div className="flex flex-col items-start text-start">
          <p className="font-display font-bold">{state.farmName}</p>
          <p className="font-body">{state.farmDescription}</p>
        </div>
      </div>
      <p>
        Adding to your basket gets the community once step closer to unlocking
        the deal!
      </p>
      <ProgressBar width={250} cur={prev} new={cur} />
      <p>The deal gets even better as more people buy!</p>
      <button
        onClick={() => addToCart(state.itemName)}
        className="inline-block border text-lg flex-1 bg-warning border-warning font-body text-white active:bg-secondary/10 px-4 py-2 ml-1 rounded-[10px]"
      >
        Add to Basket
      </button>
      <button
        className="inline-block text-lg opacity-80 active:opacity-80"
        onClick={backButtonHandler}
      >
        &#8592; Back
      </button>
    </div>
  );
};

export default ItemDetailView;
