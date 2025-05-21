import React from "react";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  console.log("location");
  return (
    // <div className="m-2 w-full max-w-md bg-yellow-200 p-4 py-5 rounded-xl mx-auto flex flex-col justify-center items-center gap-5">
    //   <p className="text-gray-700 font-bold text-lg text-center">
    //     {Boolean(location?.state?.text) ? location?.state?.text : "Payment"}{" "}
    //     Successfully
    //   </p>
    //   <Link
    //     to="/"
    //     className="border rounded-full border-green-900 text-green-500 hover:bg-green-900 hover:text-white transition-all px-4 py-1"
    //   >
    //     Go To Home
    //   </Link>
    // </div>
    <div className="m-4 w-full max-w-md bg-gradient-to-br from-yellow-400 to-red-600 text-white p-6 rounded-2xl mx-auto shadow-lg flex flex-col justify-center items-center gap-6">
      <p className="text-white font-semibold text-2xl text-center">
        {Boolean(location?.state?.text) ? location?.state?.text : "Payment"}{" "}
        Successfully
      </p>
      <Link
        to="/"
        className="bg-white text-red-600 font-medium rounded-full px-6 py-2 transition-all hover:bg-red-700 hover:text-white shadow-md"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default Success;
