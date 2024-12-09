import axios from "axios";
import { loginRequest
  ,loginSuccess,
  loginFailure
  ,logoutFailure ,
  logoutRequest,
  logoutSuccess,
  
} from "../reducer/authSlices";
export const LoginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/v1/login",
      { email, password },
     {
        withCredentials: true,
     }
    );
    // console.log(data)
    
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

    const  data  = await axios.get("http://localhost:8000/api/v1/signout", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });

    console.log("Logout response:", data);
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Logout error:", error);
    dispatch({
      type: "LogoutFailure",
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};
