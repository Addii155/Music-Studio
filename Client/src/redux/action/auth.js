import axios from "axios";
import { loginRequest
  ,loginSuccess,
  loginFailure
  ,logoutFailure ,
  logoutRequest,
  logoutSuccess,
  
} from "../reducer/authSlices";
export const LoginUser = (googleToken) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(
      "https://music-studio-rjkw.onrender.com/api/v1/google/signup",
      { googleToken },
     {
        withCredentials: true,
     }
    );
    dispatch(loginSuccess(data));

  } catch (error) {
    dispatch(logoutFailure(error.response?.data?.message || "Logout failed"));
  }
};
export const LogoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    const  data  = await axios.get("https://music-studio-rjkw.onrender.com/api/v1/signout", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });

    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Logout error:", error);
    dispatch({
      type: "LogoutFailure",
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};
