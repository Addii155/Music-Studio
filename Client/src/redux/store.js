import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./reducer/authSlices.js"
import musicReducer from "./reducer/musicSlice.js"
const store = configureStore({
  reducer: {
    auth: authReducer,
    music: musicReducer
  },
});

export default store;
