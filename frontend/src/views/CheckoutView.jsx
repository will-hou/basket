import CheckOutCard from "../components/CheckOutCard";
import { useNavigate } from "react-router-dom";
import Honeycomb from "../assets/honeycomb.jpeg";
import Tomato from "../assets/tomato.jpeg";

export default function CheckoutView() {
  const navigate = useNavigate();
  return (
    <div className="font-body">
      <h1 className="text-center text-6xl font-display text-primary m-8">
        Checkout
      </h1>
      <CheckOutCard
        itemName="Honeycomb"
        quantity={1}
        farmName="Tanaka Farm"
        itemImage={Honeycomb}
        price={2.0}
        numBuyers={2}
        buyersThreshold={5}
      />
      <CheckOutCard
        itemName="Tomato"
        quantity={4}
        farmName="Daisy Farm"
        itemImage={Tomato}
        price={2.0}
        numBuyers={7}
        buyersThreshold={5}
      ></CheckOutCard>
      <button
        onClick={() => navigate("/confirmation")}
        className="fixed bottom-24 left-[25%] w-[50%] rounded-2xl text-xl font-body bg-primary active:bg-primary/80 text-white py-4"
      >
        Checkout
      </button>
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-8 left-[25%] w-[50%] rounded-2xl text-xl font-body text-tertiary active:text-secondary py-4"
      >
        &#x2190; Back
      </button>
    </div>
  );
}
