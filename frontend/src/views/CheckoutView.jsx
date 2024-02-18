import CheckOutCard from "../components/CheckOutCard";

export default function CheckoutView() {
  return (
    <div>
      <h1>Checkout</h1>
      <CheckOutCard
        itemName="Carrot"
        quantity={1}
        farmName="Farm"
        itemImage="https://via.placeholder.com/150"
        price={2.0}
        numBuyers={2}
        buyersThreshold={5}
      />
      <CheckOutCard
        itemName="Carrot"
        quantity={1}
        farmName="Farm"
        itemImage="https://via.placeholder.com/150"
        price={2.0}
        numBuyers={2}
        buyersThreshold={5}
      ></CheckOutCard>
    </div>
  );
}
