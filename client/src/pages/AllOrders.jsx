import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await Axios(SummaryApi.getAllOrders);
        console.log("API Response for Orders:", response); // Log the full response for debugging

        // Ensure response has the orders in the correct format
        if (response && response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data); // Access the orders array from response.data.data
        } else {
          setError("Orders data is missing or in an unexpected format.");
        }
      } catch (error) {
        setError(error.message || "Failed to load orders.");
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">Loading orders...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">Failed to load orders: {error}</div>
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-2">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-2 rounded shadow-sm bg-white font-extralight"
            >
              <div>Order ID: {order._id}</div>
              <div>User: {order?.userId?.name || "N/A"}</div>
              <div>Product: {order?.product_details?.name || "N/A"}</div>
              <div>Total: ₹{order.totalAmt}</div>
              <div>PaymentID: {order.paymentId}</div>
              <div>Status: {order.payment_status}</div>
              <div>Date: {new Date(order.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;

// import React, { useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";

// const AllOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await Axios(SummaryApi.getAllOrders);
//         console.log("API Response for Orders:", response); // Log the response to debug
//         if (response.data && response.data.orders) {
//           setOrders(response.data.orders);
//         } else {
//           console.error("Orders data is missing or in an unexpected format.");
//         }
//       } catch (error) {
//         setError(error);
//         AxiosToastError(error);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) return <div className="p-4">Loading orders...</div>;
//   if (error)
//     return <div className="p-4 text-red-500">Failed to load orders.</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">All Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="grid gap-2">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border p-2 rounded shadow-sm bg-white"
//             >
//               <div>Order ID: {order._id}</div>
//               <div>User: {order?.user?.name || "N/A"}</div>
//               <div>Total: ₹{order.totalAmount}</div>
//               <div>Status: {order.status}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllOrders;

// import React, { useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";

// const AllOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await Axios(SummaryApi.getAllOrders);
//         setOrders(response.data.orders);
//       } catch (error) {
//         AxiosToastError(error);
//       }
//     })();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">All Orders</h2>
//       <div className="grid gap-2">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="border p-2 rounded shadow-sm bg-white"
//           >
//             <div>Order ID: {order._id}</div>
//             <div>User: {order?.user?.name || "N/A"}</div>
//             <div>Total: ₹{order.totalAmount}</div>
//             <div>Status: {order.status}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllOrders;
