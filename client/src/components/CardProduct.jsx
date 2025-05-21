import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/valideURLConvert";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);

  return (
    <Link
      to={url}
      className="w-full max-w-[160px] lg:max-w-[200px] bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col gap-2 p-3 border border-orange-400"
    >
      {/* Product Image */}
      <div className="w-full h-28 lg:h-36 rounded-xl overflow-hidden flex items-center justify-center">
        <img
          src={data.image[0]}
          alt={data.name}
          className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Name */}
      <div className="text-sm lg:text-base font-semibold text-gray-800 break-words line-clamp-2 h-10">
        {data.name}
      </div>

      {/* Description */}
      <div className="text-sm md:text-base text-gray-500 font-medium line-clamp-2 h-7">
        {data.description}
      </div>

      {/* Discount Badge */}
      {Boolean(data.discount) && (
        <div className="bg-yellow-300 text-black text-[10px] md:text-xs font-medium w-fit px-2 py-[2px] rounded-full">
          {data.discount}% OFF
        </div>
      )}

      {/* Price + Cart Section */}
      <div className="flex items-center justify-between mt-auto">
        <div className="font-bold text-green-600 text-sm lg:text-base">
          {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
        </div>
        <div>
          {data.stock === 0 ? (
            <p className="text-xs text-red-500 font-medium">Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;

// import React from "react";
// import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
// import { Link } from "react-router-dom";
// import { valideURLConvert } from "../utils/valideURLConvert";
// import { pricewithDiscount } from "../utils/PriceWithDiscount";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";
// import Axios from "../utils/Axios";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { useGlobalContext } from "../provider/GlobalProvider";
// import AddToCartButton from "./AddToCartButton";

// const CardProduct = ({ data }) => {
//   const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
//   const [loading, setLoading] = useState(false);

//   return (
//     <Link
//       to={url}
//       className="border border-orange-500 py-2 lg:p-4 grid gap-1 lg:gap-3 w-40 lg:min-w-52 rounded cursor-pointer bg-white"
//     >
//       <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
//         <img
//           src={data.image[0]}
//           className="w-full h-full object-scale-down lg:scale-125"
//         />
//       </div>
//       <div className="flex items-center gap-1">
//         {/* <div className="rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50">
//           10 min
//         </div> */}
//       </div>
//       <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
//         {data.name}
//       </div>
//       {/* <div className="px-2 lg:px-0 font-medium break-words text-sm lg:text-base line-clamp-2">
//         {data.name}
//       </div> */}

//       <div>
//         {Boolean(data.discount) && (
//           <p className="text-black font-normal bg-yellow-300 px-2 py-1 w-fit text-xs rounded-full">
//             {data.discount}% discount
//           </p>
//         )}
//       </div>
//       <div className="w-fit gap-1 px-2 lg:px-0 text-sm font-light text-gray-500 lg:text-base">
//         {data.description}
//       </div>

//       <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
//         <div className="flex items-center gap-1">
//           <div className="font-semibold">
//             {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
//           </div>
//         </div>
//         <div className="">
//           {data.stock == 0 ? (
//             <p className="text-red-500 text-sm text-center">Out of stock</p>
//           ) : (
//             <AddToCartButton data={data} />
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default CardProduct;
