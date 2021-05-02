import {userConstants} from "./constants";
import axios from "../helpers/axios";

export const signup=function(user){
  console.log(user);
  return async function(dispatch){
    dispatch({type:userConstants.USER_REGISTER_REQUEST});
    const res=await axios.post("admin/signup",{
         ...user
    });
    if(res.status==201){
      const {message}=res.data;
      //saving token in local storage so that if user reloads page he isn't logged out

      dispatch({
        type:userConstants.USER_REGISTER_SUCCESS,
        payload:{message}
      });
    }
    else {
      if(res.status=400){
        dispatch({
          type:userConstants.USER_REGISTER_FAILURE,
          payload:{error:res.data.error}
        });
      }
    }
  }
}
