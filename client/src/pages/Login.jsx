// import React, { useState } from "react";
// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
// import toast from "react-hot-toast";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";
// import { Link, useNavigate } from "react-router-dom";
// import fetchUserDetails from "../utils/fetchUserDetails";
// import { useDispatch } from "react-redux";
// import { setUserDetails } from "../store/userSlice";
// import { setAuth } from "../store/authSlice";

// const Login = () => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const valideValue = Object.values(data).every((el) => el);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await Axios({
//         ...SummaryApi.login,
//         data: data,
//       });

//       if (response.data.error) {
//         toast.error(response.data.message);
//         return;
//       }

//       if (response.data.success) {
//         toast.success(response.data.message);

//         const { accesstoken, refreshToken } = response.data.data;

       
//         dispatch(
//           setAuth({
//             accessToken: accesstoken,
//             refreshToken: refreshToken,
//           })
//         );

//         localStorage.setItem("accessToken", accesstoken);
//         localStorage.setItem("refreshToken", refreshToken);

//         setData({ email: "", password: "" });

        
//         setTimeout(async () => {
//           try {
//             const userDetails = await fetchUserDetails();
//             dispatch(setUserDetails(userDetails.data));
//             navigate("/"); 
//           } catch (err) {
//             console.error("Error fetching user after login", err);
//           }
//         }, 400);
//       }

//       // if (response.data.success) {
//       //   toast.success(response.data.message);

//       //   const { accesstoken, refreshToken } = response.data.data;

//       //   // ✅ Save auth to Redux
//       //   dispatch(
//       //     setAuth({
//       //       accessToken: accesstoken,
//       //       refreshToken: refreshToken,
//       //     })
//       //   );

//       //   // ✅ Optionally store in localStorage for persistence
//       //   localStorage.setItem("accessToken", accesstoken);
//       //   localStorage.setItem("refreshToken", refreshToken);

//       //   // ✅ Get user details and save to Redux
//       //   const userDetails = await fetchUserDetails();
//       //   dispatch(setUserDetails(userDetails.data));

//       //   // ✅ Navigate and reset
//       //   setData({
//       //     email: "",
//       //     password: "",
//       //   });

//       //   setTimeout(() => {
//       //     navigate("/");
//       //   }, 10);
//       // }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   return (
//     <section className="w-full container mx-auto px-2">
//       <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
//         <form className="grid gap-4 py-4 font-normal" onSubmit={handleSubmit}>
//           <div className="grid gap-1">
//             <label htmlFor="email">Email :</label>
//             <input
//               type="email"
//               id="email"
//               className="bg-gray-100 p-2 border rounded-full outline-none focus:border-red-600"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="grid gap-1">
//             <label htmlFor="password">Password :</label>
//             <div className="bg-gray-100 p-2 border rounded-full flex items-center focus-within:border-red-600">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 className="w-full outline-none bg-gray-100"
//                 name="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//               />
//               <div
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="cursor-pointer"
//               >
//                 {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//               </div>
//             </div>
//             <Link
//               to={"/forgot-password"}
//               className="block ml-auto font-light hover:text-red-700"
//             >
//               Forgot password ?
//             </Link>
//           </div>

//           <button
//             disabled={!valideValue}
//             className={` ${
//               valideValue ? "bg-red-800 hover:bg-red-700" : "bg-gray-400"
//             } text-white py-2 rounded-full font-semibold my-3 tracking-wide`}
//           >
//             Login
//           </button>
//         </form>

//         <p className="font-normal">
//           Don't have account?{" "}
//           <Link
//             to={"/register"}
//             className="font-semibold text-red-700 hover:text-red-800"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Login;



// src/pages/Login.jsx

import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice"; 

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validInput = Object.values(data).every((el) => el.trim() !== "");

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }
       if (response.data.success) {
       toast.success(response.data.message);
       console.log("Login response:", response.data);

     try {
       const userDetails = await fetchUserDetails();

       if (userDetails?.data) {
      dispatch(setUser(userDetails.data));
      console.log("UserDetails:", userDetails);
      navigate("/");
     } else {
       console.warn("User details missing from response");
     }

     setData({ email: "", password: "" });
     } catch (err) {
     console.error("Error fetching user after login", err);
     }
    }
           
      //       if (response.data.success) {
      //         toast.success(response.data.message);
      //         console.log("Login response:", response.data);
      //         console.log("Access Token: ", accessToken);

      //         setTimeout(async () => {
      //           try {
      //             const userDetails = await fetchUserDetails();

      //       if (userDetails?.data) {
      //         dispatch(setUser(userDetails.data));
      //         console.log("UserDetails:", userDetails);
      //         navigate("/");
      //       } else {
      //         console.warn("User details missing from response");
      //       }

      //       setData({ email: "", password: "" });
      //     } catch (err) {
      //       console.error("Error fetching user after login", err);
      //     }
      //   }, 500);
      // }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-4 py-4 font-normal" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              className="bg-gray-100 p-2 border rounded-full outline-none focus:border-red-600"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-gray-100 p-2 border rounded-full flex items-center focus-within:border-red-600">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none bg-gray-100"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto font-light hover:text-red-700"
            >
              Forgot password ?
            </Link>
          </div>

          <button
            disabled={!validInput}
            className={` ${
              validInput ? "bg-red-800 hover:bg-red-700" : "bg-gray-400"
            } text-white py-2 rounded-full font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>

        <p className="font-normal">
          Don't have account?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-red-700 hover:text-red-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;




//last
// import React, { useState } from "react";
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
// import toast from "react-hot-toast";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import AxiosToastError from "../utils/AxiosToastError";
// import { Link, useNavigate } from "react-router-dom";
// import fetchUserDetails from "../utils/fetchUserDetails";
// import { useDispatch } from "react-redux";
// import { setUserDetails } from "../store/userSlice";

// const Login = () => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };

//   const valideValue = Object.values(data).every((el) => el);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const response = await Axios({
//   //       ...SummaryApi.login,
//   //       data: data,
//   //     });

//   //     if (response.data.error) {
//   //       toast.error(response.data.message);
//   //     }

//   //     if (response.data.success) {
//   //       toast.success(response.data.message);
//   //       // const accessToken = response.data.data.accesstoken;
//   //       // if (accessToken) {
//   //       //   localStorage.setItem("accessToken", accessToken); // ✅ proper key
//   //       //   localStorage.setItem("refreshToken", response.data.data.refreshToken);
//   //       // } else {
//   //       //   console.warn("No access token received in login response");
//   //       // }
//   //       console.log("Login response:", response.data); // check structure
//   //       localStorage.setItem("accessToken", response.data.data.accesstoken);
//   //       localStorage.setItem("refreshToken", response.data.data.refreshToken);
//   //       console.log("Using token:", localStorage.getItem("accessToken"));

//   //       const userDetails = await fetchUserDetails();
//   //       dispatch(setUserDetails(userDetails.data));
//   //       console.log("UserDetails:", userDetails);

//   //       setTimeout(() => {
//   //         navigate("/");
//   //       }, 600);

//   //       setData({
//   //         email: "",
//   //         password: "",
//   //       });
//   //       navigate("/");
//   //     }
//   //   } catch (error) {
//   //     AxiosToastError(error);
//   //   }
//   // };

// //        const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   try {
// //     const response = await Axios({
// //       ...SummaryApi.login,
// //       data: data,
// //     });

// //     if (response.data.error) {
// //       toast.error(response.data.message);
// //       return;
// //     }

// //     if (response.data.success) {
// //       toast.success(response.data.message);
// //       console.log("Login response:", response.data);

// //       setTimeout(async () => {
// //         try {
// //           const userDetails = await fetchUserDetails();

// //           if (userDetails?.data) {
// //             dispatch(setUserDetails(userDetails.data));
// //             console.log("UserDetails:", userDetails);
// //             navigate("/");
// //           } else {
// //             console.warn("User details missing from response");
// //           }

// //           setData({
// //             email: "",
// //             password: "",
// //           });
// //         } catch (err) {
// //           console.error("Error fetching user after login", err);
// //         }
// //       }, 500);
// //     }
// //   } catch (error) {
// //     AxiosToastError(error);
// //   }
// // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await Axios({
//       ...SummaryApi.login,
//       data: data,
//     });

//     if (response.data.error) {
//       toast.error(response.data.message);
//       return;
//     }

//     if (response.data.success) {
//       toast.success(response.data.message);

//       setTimeout(async () => {
//         try {
//           const userDetails = await fetchUserDetails();
//           if (userDetails?.data) {
//             dispatch(setUserDetails(userDetails.data));
//             navigate("/");
//           } else {
//             console.warn("User details missing");
//           }
//         } catch (err) {
//           console.error("Error fetching user after login:", err);
//         }

//         setData({ email: "", password: "" });
//       }, 500);
//     }
//   } catch (error) {
//     AxiosToastError(error);
//   }
// };

       
//   return (
//     <section className="w-full container mx-auto px-2">
//       <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
//         <form className="grid gap-4 py-4 font-normal" onSubmit={handleSubmit}>
//           <div className="grid gap-1">
//             <label htmlFor="email">Email :</label>
//             <input
//               type="email"
//               id="email"
//               className="bg-gray-100 p-2 border rounded-full outline-none focus:border-red-600"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="grid gap-1">
//             <label htmlFor="password">Password :</label>
//             <div className="bg-gray-100 p-2 border rounded-full flex items-center focus-within:border-red-600">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 className="w-full outline-none bg-gray-100"
//                 name="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//               />
//               <div
//                 onClick={() => setShowPassword((preve) => !preve)}
//                 className="cursor-pointer"
//               >
//                 {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//               </div>
//             </div>
//             <Link
//               to={"/forgot-password"}
//               className="block ml-auto font-light hover:text-red-700"
//             >
//               Forgot password ?
//             </Link>
//           </div>

//           <button
//             disabled={!valideValue}
//             className={` ${
//               valideValue ? "bg-red-800 hover:bg-red-700" : "bg-gray-400"
//             }    text-white py-2 rounded-full font-semibold my-3 tracking-wide`}
//           >
//             Login
//           </button>
//         </form>

//         <p className="font-normal">
//           Don't have account?{"  "}
//           <Link
//             to={"/register"}
//             className="font-semibold text-red-700 hover:text-red-800"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Login;
