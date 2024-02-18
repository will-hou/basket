import PropTypes from "prop-types";
export default function CheckOutCard(props) {
  return (
    <div className="rounded-2xl border bg-background drop-shadow-md m-2">
      <p className="font-bold text-xl text-primary inline">{props.itemName}</p>
      <p className="text-xl text-secondary inline"> x{props.quantity}</p>
      <p className="text-xl text-secondary inline"> - {props.farmName} </p>
      <div className="flex flex-row justify-between">
        <img
          className="h-[144px] w-[144px] rounded-[20px] padding-0"
          src={props.itemImage}
        ></img>
        <p className="text-3xl font-bold text-primary inline">${props.price}</p>
        <div
          className={
            "border rounded-2xl " + props.numBuyers >= props.buyersThreshold
              ? "text-secondary border-secondar"
              : "text-warning border-warning"
          }
        >
          {props.numBuyers}/{props.buyersThreshold} Buyers
        </div>
      </div>
    </div>
  );
}

CheckOutCard.propTypes = {
  itemName: PropTypes.string,
  quantity: PropTypes.number,
  farmName: PropTypes.string,
  itemImage: PropTypes.string,
  price: PropTypes.number,
  numBuyers: PropTypes.number,
  buyersThreshold: PropTypes.number,
};
