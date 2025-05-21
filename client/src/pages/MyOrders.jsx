import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../components/NoData";
import { setOrder } from "../store/orderSlice";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.order);
  const token = useSelector((state) => state.auth?.accessToken); // safer optional chaining
  const [loadingId, setLoadingId] = useState(null);

  const handleCancelOrder = async (orderId) => {
    if (!token) {
      alert("You must be logged in to cancel an order.");
      return;
    }

    try {
      setLoadingId(orderId);

      const response = await fetch(
        `${baseURL}${SummaryApi.cancelOrder(orderId).url}`,
        {
          method: SummaryApi.cancelOrder(orderId).method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        );
        dispatch(setOrder(updatedOrders));
      } else {
        alert(data.message || "Failed to cancel order.");
      }
    } catch (error) {
      console.error("Cancel order error:", error);
      alert("Something went wrong while canceling the order.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>My Orders</h1>
      </div>

      {!orders?.length ? (
        <NoData />
      ) : (
        orders.map((order, index) => (
          <div
            key={order._id + index}
            className="order rounded p-4 text-sm border mb-3"
          >
            <p className="mb-1">Order No: {order?.orderId}</p>
            <div className="flex gap-3 items-center mb-2">
              <img
                src={order.product_details.image[0]}
                className="w-14 h-14 object-cover rounded"
                alt={order.product_details.name}
              />
              <div>
                <p className="font-medium">{order.product_details.name}</p>
                <p className="text-xs text-gray-500">
                  Status: {order.status || "pending"}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCancelOrder(order._id)}
              disabled={order.status === "cancelled" || loadingId === order._id}
              className={`px-3 py-1 rounded text-white text-xs ${
                order.status === "cancelled"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {loadingId === order._id
                ? "Cancelling..."
                : order.status === "cancelled"
                ? "Cancelled"
                : "Cancel Order"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import NoData from "../components/NoData";
// import { setOrder } from "../store/orderSlice";
// import SummaryApi, { baseURL } from "../common/SummaryApi";

// const MyOrders = () => {
//   const dispatch = useDispatch();
//   const orders = useSelector((state) => state.orders.order);
//   const [loadingId, setLoadingId] = useState(null);

//   const token = localStorage.getItem("accessToken");

//   console.log("Using token:", token);

//   const handleCancelOrder = async (orderId) => {
//     try {
//       setLoadingId(orderId);

//       const token = localStorage.getItem("accessToken");

//       const res = await fetch(
//         `${baseURL}${SummaryApi.cancelOrder(orderId).url}`,
//         {
//           method: SummaryApi.cancelOrder(orderId).method,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         const updatedOrders = orders.map((order) =>
//           order._id === orderId ? { ...order, status: "cancelled" } : order
//         );
//         dispatch(setOrder(updatedOrders));
//       } else {
//         alert(data.message || "Failed to cancel order");
//       }
//     } catch (err) {
//       console.error("Cancel order error:", err);
//       alert("Something went wrong");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   // const handleCancelOrder = async (orderId) => {
//   //   try {
//   //     setLoadingId(orderId);

//   //     const api = SummaryApi.cancelOrder(orderId);

//   //     const res = await axios.put(
//   //       baseURL + api.url,
//   //       {},
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //         },
//   //       }
//   //     );

//   //     const data = res.data;

//   //     if (data.success) {
//   //       // Update local state
//   //       const updatedOrders = orders.map((order) =>
//   //         order._id === orderId ? { ...order, status: "cancelled" } : order
//   //       );
//   //       dispatch(setOrder(updatedOrders));
//   //     } else {
//   //       alert(data.message || "Failed to cancel order");
//   //     }
//   //   } catch (err) {
//   //     console.error("Cancel order error:", err);
//   //     alert(err?.response?.data?.message || "Something went wrong");
//   //     // alert("Something went wrong");
//   //   } finally {
//   //     setLoadingId(null);
//   //   }
//   // };

//   // const handleCancelOrder = async (orderId) => {
//   //   try {
//   //     setLoadingId(orderId);
//   //     const res = await fetch(`/api/orders/cancel/${orderId}`, {
//   //       method: "PUT",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${localStorage.getItem("token")}`, // if you're using token-based auth
//   //       },
//   //     });

//   //     const data = await res.json();
//   //     if (data.success) {
//   //       // Update local state
//   //       const updatedOrders = orders.map((order) =>
//   //         order._id === orderId ? { ...order, status: "cancelled" } : order
//   //       );
//   //       dispatch(setOrder(updatedOrders));
//   //     } else {
//   //       alert(data.message || "Failed to cancel order");
//   //     }
//   //   } catch (err) {
//   //     console.error("Cancel order error:", err);
//   //     alert("Something went wrong");
//   //   } finally {
//   //     setLoadingId(null);
//   //   }
//   // };

//   return (
//     <div>
//       <div className="bg-white shadow-md p-3 font-semibold">
//         <h1>Order</h1>
//       </div>
//       {!orders[0] && <NoData />}
//       {orders.map((order, index) => (
//         <div
//           key={order._id + index + "order"}
//           className="order rounded p-4 text-sm border mb-3"
//         >
//           <p className="mb-1">Order No: {order?.orderId}</p>
//           <div className="flex gap-3 items-center mb-2">
//             <img
//               src={order.product_details.image[0]}
//               className="w-14 h-14 object-cover rounded"
//               alt={order.product_details.name}
//             />
//             <div>
//               <p className="font-medium">{order.product_details.name}</p>
//               <p className="text-xs text-gray-500">
//                 Status: {order.status || "pending"}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => handleCancelOrder(order._id)}
//             disabled={order.status === "cancelled" || loadingId === order._id}
//             className={`px-3 py-1 rounded text-white text-xs ${
//               order.status === "cancelled"
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-500 hover:bg-red-600"
//             }`}
//           >
//             {loadingId === order._id
//               ? "Cancelling..."
//               : order.status === "cancelled"
//               ? "Cancelled"
//               : "Cancel Order"}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyOrders;

// import React from "react";
// import { useSelector } from "react-redux";
// import NoData from "../components/NoData";

// const MyOrders = () => {
//   const orders = useSelector((state) => state.orders.order);

//   console.log("order Items", orders);
//   return (
//     <div>
//       <div className="bg-white shadow-md p-3 font-semibold">
//         <h1>Order</h1>
//       </div>
//       {!orders[0] && <NoData />}
//       {orders.map((order, index) => {
//         return (
//           <div
//             key={order._id + index + "order"}
//             className="order rounded p-4 text-sm"
//           >
//             <p>Order No : {order?.orderId}</p>
//             <div className="flex gap-3">
//               <img src={order.product_details.image[0]} className="w-14 h-14" />
//               <p className="font-medium">{order.product_details.name}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MyOrders;
