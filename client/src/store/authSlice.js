// store/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});
export const { setUser, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;

//last 
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   accessToken: localStorage.getItem("accessToken") || null,
//   refreshToken: localStorage.getItem("refreshToken") || null,
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuth: (state, action) => {
//       const { accessToken, refreshToken, user } = action.payload;
//       state.accessToken = accessToken;
//       state.refreshToken = refreshToken;
//       state.user = user;
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//     },
//     logout: (state) => {
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.user = null;
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//     },
//   },
// });

// export const { setAuth, logout } = authSlice.actions;
// export default authSlice.reducer;
