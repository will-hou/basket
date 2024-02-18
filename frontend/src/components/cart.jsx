import { useContext } from "react";
import CartContext from "../contexts/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);
  return (
    <div className="fixed right-0 top-0 m-4">
      <h1>Cart</h1>
      <p>{cart.size} items</p>
    </div>
  );
}
