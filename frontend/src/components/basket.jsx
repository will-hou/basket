import basket_0 from "../assets/Basket0.svg";
import basket_1 from "../assets/Basket1.svg";
import basket_2 from "../assets/Basket2.svg";
import basket_3 from "../assets/Basket3.svg";
import basket_4 from "../assets/Basket4.svg";
import basket_5 from "../assets/Basket5.svg";
import basket_6 from "../assets/Basket6.svg";
import basket_7 from "../assets/Basket7.svg";
import basket_8 from "../assets/Basket8.svg";
import PropTypes from "prop-types";

import CartContext from "../contexts/CartContext";
import { useContext } from "react";

export default function Basket({ size }) {
  const { cart } = useContext(CartContext);
  let basket_logo = [
    basket_0,
    basket_1,
    basket_2,
    basket_3,
    basket_4,
    basket_5,
    basket_6,
    basket_7,
    basket_8,
  ][cart.size];
  return (
    <>
      <p className={"font-display text-center text-6xl text-secondary mt-4"}>
        {cart.size ? cart.size : ""}
      </p>
      <img
        className={"h-[" + size + "%] mx-auto"}
        src={basket_logo}
        alt="Basket Logo"
      />
    </>
  );
}

Basket.propTypes = {
  size: PropTypes.string,
};
