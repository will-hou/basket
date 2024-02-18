import React from "react";
import Basket from "../components/basket";
const ConfirmationView = () => {
  return (
    <>
      <div className="text-center text-primary font-display font-bold mt-[30%] mb-[10%] text-6xl">
        Order Confirmed!
      </div>
      <div className="text-center text-secondary font-display text-4xl">
        Your items are on the way.
      </div>
      <Basket size="20" />
    </>
  );
};

export default ConfirmationView;
