import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error?.response?.data || error.message);
    
    // ❗️Throw the error so caller can handle it properly
    throw error;
  }
};

export default fetchUserDetails;


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
