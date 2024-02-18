import CheckOutCard from "../components/CheckOutCard";

export default function CheckoutView() {
  return (
    <div className="font-body">
      <h1 className="text-center text-6xl font-display text-primary m-8">
        Checkout
      </h1>
      <CheckOutCard
        itemName="Carrot"
        quantity={1}
        farmName="Tanaka Farm"
        itemImage="https://via.placeholder.com/150"
        price={2.0}
        numBuyers={2}
        buyersThreshold={5}
      />
      <CheckOutCard
        itemName="Tomato"
        quantity={4}
        farmName="Daisy Farm"
        itemImage="https://via.placeholder.com/150"
        price={2.0}
        numBuyers={7}
        buyersThreshold={5}
      ></CheckOutCard>
      <button className="fixed bottom-8 left-[25%] w-[50%] rounded-2xl text-xl font-body bg-primary active:bg-primary/80 text-white py-4">
        Checkout
      </button>
    </div>
  );
}
