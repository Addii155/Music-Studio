import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/action/auth";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const { user, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (token) => {
    dispatch(LoginUser(token.credential));
  };
  useEffect(() => {
    if (user) {
      toast.success("Login successful!");
      navigate("/");
    } else if (error) {
      console.log("Something went wrong:", error);
      toast.error(error);
    }
  }, [user, error]);

  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Login to MuziK
        </h2>
        <form className="mt-8" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email or username
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email or Username"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <Link
            to="/register"
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            don't have an account?
          </Link>
        </div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            submitHandler(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default Login;
