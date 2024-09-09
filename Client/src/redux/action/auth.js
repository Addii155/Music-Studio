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
    
    dispatch(loginSuccess(data));

  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};
export const LogoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      
    };

    const { data } = await axios.get(
      "http://localhost:8000/api/v1/signout",
      {
        withCredentials: true,
      }
      
    );
    console.log(data);
    
    dispatch(logoutSuccess());

  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response?.data?.message || "Login failed",
    });
  }
};
