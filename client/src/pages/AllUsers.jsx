import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await Axios(SummaryApi.getAllUsers);
        console.log("API Response for Users:", response); // Log the full response for debugging

        // Now, the users are inside response.data.data
        if (response && response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data); // Access the users array from response.data.data
        } else {
          setError("Users data is missing or in an unexpected format.");
        }
      } catch (error) {
        setError(error.message || "Failed to load users.");
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">Loading users...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">Failed to load users: {error}</div>
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="grid gap-2">
          {users.map((user) => (
            <div
              key={user._id}
              className="border p-2 rounded shadow-sm font-extralight bg-white flex flex-col md:flex-row md:justify-between"
            >
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Role:</strong> {user.role || "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;

// import React, { useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await Axios(SummaryApi.getAllUsers);
//         console.log("API Response for Users:", response); // Log full response for inspection

//         // Check if response.data exists and print it to console
//         if (response && response.data) {
//           console.log("Response Data:", response.data); // Log the data to check structure

//           // Check if 'users' is a property of response.data and is an array
//           if (Array.isArray(response.data.users)) {
//             setUsers(response.data.users);
//           } else {
//             setError("Users data is missing or in an unexpected format.");
//           }
//         } else {
//           setError("No data received from the API.");
//         }
//       } catch (error) {
//         setError(error.message || "Failed to load users.");
//         AxiosToastError(error);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) return <div className="p-4">Loading users...</div>;
//   if (error)
//     return (
//       <div className="p-4 text-red-500">Failed to load users: {error}</div>
//     );

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">All Users</h2>
//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div className="grid gap-2">
//           {users.map((user) => (
//             <div
//               key={user._id}
//               className="border p-2 rounded shadow-sm bg-white flex flex-col md:flex-row md:justify-between"
//             >
//               <div>
//                 <strong>Name:</strong> {user.name}
//               </div>
//               <div>
//                 <strong>Email:</strong> {user.email}
//               </div>
//               <div>
//                 <strong>Role:</strong> {user.role}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllUsers;

// import React, { useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true); // NEW
//   const [error, setError] = useState(null); // NEW

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await Axios(SummaryApi.getAllUsers);
//         setUsers(response.data.users);
//       } catch (error) {
//         setError(error);
//         AxiosToastError(error);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) return <div className="p-4">Loading users...</div>;
//   if (error)
//     return <div className="p-4 text-red-500">Failed to load users.</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">All Users</h2>
//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div className="grid gap-2">
//           {users.map((user) => (
//             <div
//               key={user._id}
//               className="border p-2 rounded shadow-sm bg-white flex flex-col md:flex-row md:justify-between"
//             >
//               <div>
//                 <strong>Name:</strong> {user.name}
//               </div>
//               <div>
//                 <strong>Email:</strong> {user.email}
//               </div>
//               <div>
//                 <strong>Role:</strong> {user.role}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllUsers;

// import React, { useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await Axios(SummaryApi.getAllUsers);
//         setUsers(response.data.users);
//       } catch (error) {
//         AxiosToastError(error);
//       }
//     })();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">All Users</h2>
//       <div className="grid gap-2">
//         {users.map((user) => (
//           <div
//             key={user._id}
//             className="border p-2 rounded shadow-sm bg-white flex flex-col md:flex-row md:justify-between"
//           >
//             <div>Name: {user.name}</div>
//             <div>Email: {user.email}</div>
//             <div>Role: {user.role}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllUsers;
