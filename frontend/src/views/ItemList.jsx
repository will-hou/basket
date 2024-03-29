import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import honeycomb from "../assets/honeycomb.jpeg";
import tanaka from "../assets/tanaka.jpg";
import { useNavigate } from "react-router-dom";
import Basket from "../components/basket";
import { BACKEND_HOST } from "../.config";

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await fetch(BACKEND_HOST + "/listitems");
    const data = await response.json();

    const fetchedItems = [];

    data.map((item, index) => (
      fetchedItems.push(<ItemCard
        key={index} // Ideally, use a unique id instead of index when mapping over an array
        growerImage={item.farmImage}
        growerName={item.farmName}
        itemImage={item.itemImage}
        itemName={item.itemName}
        itemDescription=""
        pillText="placeholder"
        pillWarn={true}
        price={item.itemPrice}
        onClick={() => {
          itemCardClickHandler(item);
        }}
      />)
    ))

    setItems(fetchedItems);
    console.log("Items: ", data);
    console.log(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const itemCardClickHandler = (item) => {
    console.log("Item Clicked: ", item);
    navigate("/item_description", { state: { ...item } });
  };

  const basketClickHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex items-center flex-col gap-8 py-5">
      <div className="flex flex-col items-center">
        <div className="cursor-pointer " onClick={basketClickHandler}>
          <Basket size="40" />
        </div>

        {/* <img className="w-20" src={basket} alt="Basket Logo"></img> */}
        <div className="pt-2 relative mx-auto text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>
      {items}
    </div>
  );
};

export default ItemList;
