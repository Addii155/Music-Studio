import {proxy} from "valtio";
import { useState } from "react";
import axios from "axios";

const state= proxy({
    count:1,
    user:null,
    token:null,
    loading:false,
    error:null,
    auth:false,

});

export const authenticate = async (credentials) => {
    
    state.loading = true; 
    
    try {
      const response = await axios.post("http://localhost:8000/api/v1/login",credentials,{
        withCredentials : true,
      }
    );
    console.log(response.data)
      state.user = response.data.user;
      state.token = response.data.token;
      state.auth = true;
    } catch (error) {
      console.log(error);
      state.error = error;
    } finally {
      state.loading = false;
    }
  };
  export const reg = async (credentials) => {
    
    state.loading = true; 
    
    try {
      const response = await axios.post("http://localhost:8000/api/v1/login",credentials,{
        withCredentials : true,
      }
    );
    console.log(response.data)
      state.user = response.data.user;
      state.token = response.data.token;
      state.auth = true;
    } catch (error) {
      console.log(error);
      state.error = error;
    } finally {
      state.loading = false;
    }
  };
export default state;

export  function increment() {
  state.count += 1;
  console.log(state.count)
}