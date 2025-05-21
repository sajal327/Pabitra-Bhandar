import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    ?.join(" ");

  const categoryId = params.category?.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory?.split("-").slice(-1)[0];

  const fetchProductdata = async () => {
    // ✅ Validate ObjectIds before making API call
    if (!isValidObjectId(categoryId) || !isValidObjectId(subCategoryId)) {
      console.warn("Invalid categoryId or subCategoryId — skipping API call.");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [...prev, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductdata();
  }, [params]);

  useEffect(() => {
    if (!isValidObjectId(categoryId)) return;

    const sub = AllSubCategory.filter((s) => {
      return s.category.some((el) => el._id === categoryId);
    });
    setDisplaySubCategory(sub);
  }, [params, AllSubCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* Subcategories Sidebar */}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {DisplaySubCatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }/${valideURLConvert(s.name)}-${s._id}`;
            return (
              //             <Link
              //               to={link}
              //               key={s._id + index}
              //               className={`w-full flex-col items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              //   border border-gray-200 shadow-sm hover:shadow-md hover:bg-green-50
              //   ${subCategoryId === s._id ? "bg-green-100 border-green-400" : "bg-white"}
              // `}
              //             >
              //               {/* Image */}
              //               <div className="min-w-[48px] h-12 flex items-center justify-center bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              //                 <img
              //                   src={s.image}
              //                   alt={s.name}
              //                   className="w-10 h-10 object-contain"
              //                 />
              //               </div>

              //               {/* Name */}
              //               <p className="text-sm lg:text-base font-medium text-gray-700">
              //                 {s.name}
              //               </p>
              //             </Link>

              <Link
                to={link}
                key={s._id + index}
                className={`w-full md:h-16 flex flex-col md:flex-row items-center justify-normal gap-3 md:gap-4 px-3 py-1 md:py-4
    border-b hover:bg-green-50 transition-all duration-300 
    ${subCategoryId === s._id ? "bg-green-100" : "bg-white"}`}
              >
                {/* Image */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className="w-14 h-12 object-contain"
                  />
                </div>

                {/* Name */}
                <p className="text-sm text-center md:text-left text-gray-700 font-medium">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Products List */}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                {data.map((p, index) => (
                  <CardProduct
                    data={p}
                    key={p._id + "productSubCategory" + index}
                  />
                ))}
              </div>
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;

// import React, { useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import { Link, useParams } from "react-router-dom";
// import AxiosToastError from "../utils/AxiosToastError";
// import Loading from "../components/Loading";
// import CardProduct from "../components/CardProduct";
// import { useSelector } from "react-redux";
// import { valideURLConvert } from "../utils/valideURLConvert";

// const ProductListPage = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [totalPage, setTotalPage] = useState(1);
//   const params = useParams();
//   const AllSubCategory = useSelector((state) => state.product.allSubCategory);
//   const [DisplaySubCatory, setDisplaySubCategory] = useState([]);

//   console.log(AllSubCategory);

//   const subCategory = params?.subCategory?.split("-");
//   const subCategoryName = subCategory
//     ?.slice(0, subCategory?.length - 1)
//     ?.join(" ");

//   const categoryId = params.category.split("-").slice(-1)[0];
//   const subCategoryId = params.subCategory.split("-").slice(-1)[0];

//   const fetchProductdata = async () => {
//     try {
//       setLoading(true);
//       const response = await Axios({
//         ...SummaryApi.getProductByCategoryAndSubCategory,
//         data: {
//           categoryId: categoryId,
//           subCategoryId: subCategoryId,
//           page: page,
//           limit: 8,
//         },
//       });

//       const { data: responseData } = response;

//       if (responseData.success) {
//         if (responseData.page == 1) {
//           setData(responseData.data);
//         } else {
//           setData([...data, ...responseData.data]);
//         }
//         setTotalPage(responseData.totalCount);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductdata();
//   }, [params]);

//   useEffect(() => {
//     const sub = AllSubCategory.filter((s) => {
//       const filterData = s.category.some((el) => {
//         return el._id == categoryId;
//       });

//       return filterData ? filterData : null;
//     });
//     setDisplaySubCategory(sub);
//   }, [params, AllSubCategory]);

//   return (
//     <section className="sticky top-24 lg:top-20">
//       <div className="container sticky top-24  mx-auto grid grid-cols-[90px,1fr]  md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
//         {/**sub category **/}
//         <div className=" min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2">
//           {DisplaySubCatory.map((s, index) => {
//             const link = `/${valideURLConvert(s?.category[0]?.name)}-${
//               s?.category[0]?._id
//             }/${valideURLConvert(s.name)}-${s._id}`;
//             return (
//               <Link
//                 to={link}
//                 className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b
//                   hover:bg-green-100 cursor-pointer
//                   ${subCategoryId === s._id ? "bg-green-100" : ""}
//                 `}
//               >
//                 <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
//                   <img
//                     src={s.image}
//                     alt="subCategory"
//                     className=" w-14 lg:h-14 lg:w-12 h-full object-scale-down"
//                   />
//                 </div>
//                 <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
//                   {s.name}
//                 </p>
//               </Link>
//             );
//           })}
//         </div>

//         {/**Product **/}
//         <div className="sticky top-20">
//           <div className="bg-white shadow-md p-4 z-10">
//             <h3 className="font-semibold">{subCategoryName}</h3>
//           </div>
//           <div>
//             <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
//               <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 ">
//                 {data.map((p, index) => {
//                   return (
//                     <CardProduct
//                       data={p}
//                       key={p._id + "productSubCategory" + index}
//                     />
//                   );
//                 })}
//               </div>
//             </div>

//             {loading && <Loading />}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductListPage;
