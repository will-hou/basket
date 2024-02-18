import React from 'react';

const ItemCard = (props) => {

  const pillClasses = `border-2 rounded-full px-3 py-1 text-[12px] ${
    props.pillWarn ? 'border-warning' : 'border-tertiary'
  }`;

  return (
    <div className='p-3 min-h-[200px] gap-3 border-black border-2 rounded-[20px] flex flex-row justify-center items-center max-w-[95vw] shadow-lg'>
      <img className='h-[144px] w-[144px] rounded-[20px] padding-0' src={props.itemImage}></img>
      <div className='flex flex-col gap-2'>
        <h2 className='font-display justify-start font-bold text-[24px]'>{props.itemName}</h2>
        <p className='font-body text-[12px] '>{props.itemDescription}</p>
        <div className='flex flex-row gap-2'>

          <img className='rounded-full w-6 h-6' src={props.growerImage}></img>
          <p className='inline-block text-[14px]'>{props.growerName}</p>

        </div>
        <p className={pillClasses}>{props.pillText}</p>


        <p className='font-body text-end font-bold'>{props.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;

// Usage

// import honeycomb from '../src/assets/honeycomb.jpeg'
// import tanaka from '../src/assets/tanaka.jpg'
// <div className='flex justify-center items-center h-screen flex-col gap-8'>
// <ItemCard growerImage={tanaka}
//   growerName='Tanaka Farms'
//   itemImage={honeycomb}
//   itemName='Honeycomb'
//   itemDescription='Fresh and delicious honeycomb from our very own honeybees!'
//   pillText='4 more people needed to unlock price'
//   pillWarn= {true}
//   price='$5.00'
// />
// <ItemCard growerImage={tanaka}
//   growerName='Tanaka Farms'
//   itemImage={honeycomb}
//   itemName='Honeycomb'
//   itemDescription='Fresh and delicious honeycomb from our very own honeybees!'
//   pillText='4 more people needed to unlock price'
//   pillWarn= {false}
//   price='$5.00'
// />
// </div>