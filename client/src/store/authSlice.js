// // store/authSlice.js

// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: null,
  isLoggedIn: !!localStorage.getItem("accessToken"), // ✅ explicitly set
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user || null;
      state.isLoggedIn = true; // ✅ mark as logged in
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isLoggedIn = false; // ✅ mark as logged out
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});


// const initialState = {
//   accessToken: localStorage.getItem("accessToken") || null,
//   refreshToken: localStorage.getItem("refreshToken") || null,
//   user: null,
//   isLoggedIn: !!localStorage.getItem("accessToken"), // ✅ Set initial login status
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuth: (state, action) => {
//       const { accessToken, refreshToken, user } = action.payload;
//       state.accessToken = accessToken;
//       state.refreshToken = refreshToken;
//       state.user = user || null;
//       state.isLoggedIn = true; // ✅ Set login flag
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//     },
//     logout: (state) => {
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.user = null;
//       state.isLoggedIn = false; // ✅ Reset login flag
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//     },
//   },
// });

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;


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
