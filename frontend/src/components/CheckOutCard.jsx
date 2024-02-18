import PropTypes from "prop-types";
export default function CheckOutCard({
  itemName,
  quantity,
  farmName,
  itemImage,
  price,
  numBuyers,
  buyersThreshold,
}) {
  console.log(itemName);

  return (
    <div className="rounded-2xl border p-12 m-12 bg-background drop-shadow-md m-2">
      <p className="font-bold text-xl text-primary inline">{itemName}</p>
      <p className="text-xl text-secondary inline"> x{quantity}</p>
      <p className="text-xl text-secondary inline"> - {farmName} </p>
      <div className="flex flex-row justify-between">
        <img
          className="h-[144px] w-[144px] rounded-[20px] padding-0"
          src={itemImage}
        ></img>
        <p className="text-3xl font-bold text-primary inline">${price}</p>
        <div
          className={
            "border rounded-2xl " + numBuyers >= buyersThreshold
              ? "text-secondary border-secondary"
              : "text-warning border-warning"
          }
        >
          {numBuyers}/{buyersThreshold} Buyers
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
