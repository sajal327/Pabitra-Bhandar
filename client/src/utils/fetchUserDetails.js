// utils/fetchUserDetails.js

// import Axios from "./Axios";
// import SummaryApi from "../common/SummaryApi";

// const fetchUserDetails = async () => {
//   try {
//     const response = await Axios({
//       ...SummaryApi.userDetails,
//       withCredentials: true,
//     });

//     return response.data;
//   } catch (error) {
//     console.log("Error fetching user details:", error.response?.data || error);
//     throw error;
//   }
// };

// export default fetchUserDetails;
// last 
import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";
import { store } from "../store/store";

const fetchUserDetails = async (manualToken = null) => {
  try {
    const token = manualToken || store.getState().auth.accessToken;

    const response = await Axios({
      ...SummaryApi.userDetails,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

export default fetchUserDetails;

// import Axios from "./Axios";
// import SummaryApi from "../common/SummaryApi";

// const fetchUserDetails = async (token) => {
//   try {
//     const response = await Axios({
//       ...SummaryApi.userDetails,
//       headers: {
//         Authorization: `Bearer ${token}`, // Attach token here
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user details:", error?.response?.data || error.message);
//     throw error;
//   }
// };

// export default fetchUserDetails;


// import Axios from "./Axios";
// import SummaryApi from "../common/SummaryApi";

// const fetchUserDetails = async () => {
//   try {
//     const response = await Axios({
//       ...SummaryApi.userDetails,
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user details:", error?.response?.data || error.message);
    
//     // ❗️Throw the error so caller can handle it properly
//     throw error;
//   }
// };

// export default fetchUserDetails;


// import Axios from "./Axios"
// import SummaryApi from "../common/SummaryApi"

// const fetchUserDetails = async()=>{
//     try {
//         const response = await Axios({
//             ...SummaryApi.userDetails
//         })
//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default fetchUserDetails
