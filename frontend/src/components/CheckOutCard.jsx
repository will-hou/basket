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
    <div className="rounded-2xl border p-4 m-4 bg-background drop-shadow-md">
      <p className="font-bold text-xl text-primary inline">{itemName}</p>
      <p className="text-xl text-secondary inline"> x{quantity}</p>
      <p className="text-xl text-secondary inline"> - {farmName} </p>
      <div
        className={
          "border border-red-400 text-right max-w-fit rounded-2xl flex items-center justify-end px-2 py-1 my-2 " +
          (numBuyers >= buyersThreshold
            ? "text-secondary border-secondary"
            : "text-warning border-warning")
        }
      >
        {numBuyers}/{buyersThreshold} Buyers
      </div>
      <div className="flex flex-row w-full align-bottom items-end justify-between">
        <img className="h-[44px] w-[44px] rounded-[20px]" src={itemImage}></img>
        <div className="text-3xl font-bold text-primary ">${price}</div>
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
