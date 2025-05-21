import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({ name: "", image: [] });
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId },
      });
      const { data: responseData } = response;
      if (responseData.success) setData(responseData.data);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScroll = (dir) => {
    imageContainer.current.scrollLeft += dir === "right" ? 120 : -120;
  };

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 gap-8 font-[Poppins]">
      {/* LEFT IMAGE BLOCK */}
      <div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={data.image[imageIndex]}
            alt={data.name}
            className="w-full h-[300px] lg:h-[450px] object-contain p-4"
          />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {data.image.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setImageIndex(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                idx === imageIndex ? "bg-gray-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Thumbnails with navigation */}
        <div className="relative mt-4">
          <div
            ref={imageContainer}
            className="flex gap-3 overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setImageIndex(idx)}
                className="min-w-[70px] h-[70px] rounded-lg overflow-hidden shadow-sm cursor-pointer border border-gray-200"
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="hidden lg:flex justify-between items-center absolute top-1/2 w-full px-1 -translate-y-1/2">
            <button
              onClick={() => handleScroll("left")}
              className="bg-white p-2 rounded-full shadow-lg"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="bg-white p-2 rounded-full shadow-lg"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT DETAILS BLOCK */}
      <div className="space-y-4">
        <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
          {data.name}
        </h2>
        <Divider />

        {/* Price Section */}
        <div>
          <p className="font-semibold text-gray-700">Price</p>
          <div className="flex items-center gap-4 flex-wrap mt-1">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold text-base md:text-lg ">
              {DisplayPriceInRupees(
                pricewithDiscount(data.price, data.discount)
              )}
            </span>
            {data.discount > 0 && (
              <>
                <span className="line-through text-gray-400">
                  {DisplayPriceInRupees(data.price)}
                </span>
                <span className="text-red-600 font-semibold">
                  {data.discount}% Off
                </span>
              </>
            )}
          </div>
        </div>

        {/* Add to cart or Out of stock */}
        <div className="mt-4">
          {data.stock === 0 ? (
            <p className="text-red-500 text-lg font-medium">Out of Stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>

        {/* Description & More Details */}
        <div className="grid gap-3 mt-6">
          {data.description && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Description</h4>
              <p className="text-base md:text-lg text-gray-600">
                {data.description}
              </p>
            </div>
          )}

          {data.unit && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Unit</h4>
              <p className="text-base md:text-lg text-gray-600">{data.unit}</p>
            </div>
          )}

          {data?.more_details &&
            Object.entries(data.more_details).map(([key, val], idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-gray-700 mb-1">{key}</h4>
                <p className="text-sm text-gray-600">{val}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;

// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";
// import Axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
// import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
// import Divider from "../components/Divider";
// import image1 from "../assets/minute_delivery.png";
// import image2 from "../assets/Best_Prices_Offers.png";
// import image3 from "../assets/Wide_Assortment.png";
// import { pricewithDiscount } from "../utils/PriceWithDiscount";
// import AddToCartButton from "../components/AddToCartButton";

// const ProductDisplayPage = () => {
//   const params = useParams();
//   let productId = params?.product?.split("-")?.slice(-1)[0];
//   const [data, setData] = useState({
//     name: "",
//     image: [],
//   });
//   const [image, setImage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const imageContainer = useRef();

//   const fetchProductDetails = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.getProductDetails,
//         data: {
//           productId: productId,
//         },
//       });

//       const { data: responseData } = response;

//       if (responseData.success) {
//         setData(responseData.data);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [params]);

//   const handleScrollRight = () => {
//     imageContainer.current.scrollLeft += 100;
//   };
//   const handleScrollLeft = () => {
//     imageContainer.current.scrollLeft -= 100;
//   };
//   console.log("product data", data);
//   return (
//     <section className="container mx-auto p-4 grid lg:grid-cols-2 ">
//       <div className="">
//         <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
//           <img
//             src={data.image[image]}
//             className="w-full h-full object-scale-down"
//           />
//         </div>
//         <div className="flex items-center justify-center gap-3 my-2">
//           {data.image.map((img, index) => {
//             return (
//               <div
//                 key={img + index + "point"}
//                 className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
//                   index === image && "bg-slate-300"
//                 }`}
//               ></div>
//             );
//           })}
//         </div>
//         <div className="grid relative">
//           <div
//             ref={imageContainer}
//             className="flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none"
//           >
//             {data.image.map((img, index) => {
//               return (
//                 <div
//                   className="w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md"
//                   key={img + index}
//                 >
//                   <img
//                     src={img}
//                     alt="min-product"
//                     onClick={() => setImage(index)}
//                     className="w-full h-full object-scale-down"
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           <div className="w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center">
//             <button
//               onClick={handleScrollLeft}
//               className="z-10 bg-white relative p-1 rounded-full shadow-lg"
//             >
//               <FaAngleLeft />
//             </button>
//             <button
//               onClick={handleScrollRight}
//               className="z-10 bg-white relative p-1 rounded-full shadow-lg"
//             >
//               <FaAngleRight />
//             </button>
//           </div>
//         </div>
//         <div></div>

//         <div className="my-4  hidden lg:grid gap-3 ">
//           <div>
//             <p className="font-semibold">Description</p>
//             <p className="text-base font-light  text-gray-500">
//               {data.description}
//             </p>
//           </div>
//           <div>
//             {/* <p className="font-semibold">Unit</p>
//             <p className="text-base">{data.unit}</p> */}
//           </div>
//           {data?.more_details &&
//             Object.keys(data?.more_details).map((element, index) => {
//               return (
//                 <div>
//                   <p className="font-semibold">{element}</p>
//                   <p className="text-base">{data?.more_details[element]}</p>
//                 </div>
//               );
//             })}
//         </div>
//       </div>

//       <div className="p-4 lg:pl-7 text-base lg:text-lg">
//         {/* <p className="bg-green-300 w-fit px-2 rounded-full">10 Min</p> */}
//         <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
//         {/* <p className="">{data.unit}</p> */}
//         <Divider />
//         <div>
//           <p className="text-base font-semibold">Price</p>
//           <div className="flex items-center gap-2 lg:gap-4">
//             <div className="border border-red-600 px-4 py-2 rounded-full bg-yellow-50 w-fit">
//               <p className="font-semibold text-lg lg:text-xl">
//                 {DisplayPriceInRupees(
//                   pricewithDiscount(data.price, data.discount)
//                 )}
//               </p>
//             </div>
//             {data.discount && (
//               <p className="line-through font-normal text-gray-500">
//                 {DisplayPriceInRupees(data.price)}
//               </p>
//             )}
//             {data.discount && (
//               <p className="font-medium text-lg text-red-600 lg:text-2xl">
//                 {data.discount}%{" "}
//                 <span className="text-base text-neutral-500">Discount</span>
//               </p>
//             )}
//           </div>
//         </div>

//         {data.stock === 0 ? (
//           <p className="text-lg text-red-500 my-2">Out of Stock</p>
//         ) : (
//           // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
//           <div className="my-4">
//             <AddToCartButton data={data} />
//           </div>
//         )}

//         {/* <h2 className="font-semibold">Why shop from binkeyit? </h2>
//         <div>
//           <div className="flex  items-center gap-4 my-4">
//             <img src={image1} alt="superfast delivery" className="w-20 h-20" />
//             <div className="text-sm">
//               <div className="font-semibold">Superfast Delivery</div>
//               <p>
//                 Get your orer delivered to your doorstep at the earliest from
//                 dark stores near you.
//               </p>
//             </div>
//           </div>
//           <div className="flex  items-center gap-4 my-4">
//             <img src={image2} alt="Best prices offers" className="w-20 h-20" />
//             <div className="text-sm">
//               <div className="font-semibold">Best Prices & Offers</div>
//               <p>
//                 Best price destination with offers directly from the
//                 nanufacturers.
//               </p>
//             </div>
//           </div>
//           <div className="flex  items-center gap-4 my-4">
//             <img src={image3} alt="Wide Assortment" className="w-20 h-20" />
//             <div className="text-sm">
//               <div className="font-semibold">Wide Assortment</div>
//               <p>
//                 Choose from 5000+ products across food personal care, household
//                 & other categories.
//               </p>
//             </div>
//           </div>
//         </div> */}

//         {/****only mobile */}
//         <div className="my-4 grid gap-3 ">
//           <div>
//             <p className="font-semibold">Description</p>
//             <p className="text-base font-light text-gray-500">
//               {data.description}
//             </p>
//           </div>
//           <div>
//             <p className="font-semibold">Unit</p>
//             <p className="text-base font-normal text-gray-500">{data.unit}</p>
//           </div>
//           {data?.more_details &&
//             Object.keys(data?.more_details).map((element, index) => {
//               return (
//                 <div>
//                   <p className="font-semibold">{element}</p>
//                   <p className="text-base">{data?.more_details[element]}</p>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductDisplayPage;
