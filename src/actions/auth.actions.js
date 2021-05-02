import {authConstants} from "./constants";
import axios from "../helpers/axios";
export const login=function(user){
  console.log(user);
  return async function(dispatch){
    dispatch({type:authConstants.LOGIN_REQUEST});
    const res=await axios.post("admin/signin",{
         ...user
    });
    if(res.status==200){
      const {token,user}=res.data;
      //saving token in local storage so that if user reloads page he isn't logged out
      localStorage.setItem("token",token);
      localStorage.setItem("user",JSON.stringify(user));
      dispatch({
        type:authConstants.LOGIN_SUCCESS,
        payload:{token,user}
      });
    }
    else {
      if(res.status=400){
        dispatch({
          type:authConstants.LOGIN_FAILURE,
          payload:{error:res.data.error}
        });
      }
    }
  }
}


  export const isUserLoggedIn=function(){
      return async function(dispatch){
        const token=localStorage.getItem('token');
        if(token){
          const user=JSON.parse(localStorage.getItem("user"));
          dispatch({
            type:authConstants.LOGIN_SUCCESS,
            payload:{token,user}
          });
        }
        else{
          dispatch({
            type:authConstants.LOGIN_FAILURE,
            payload:{error:"Login Failed"}
          });
        }

      }
    }

export const signout=function(){
  return async function(dispatch){
    dispatch({type:authConstants.LOGOUT_REQUEST});
    const res=await axios.post("/admin/signout");
    if(res.status===200){
      localStorage.clear();
      dispatch({
        type:authConstants.LOGOUT_SUCCESS

      });
    }
    else{
      dispatch({
        type:authConstants.LOGOUT_FAILURE,
        payload:{error:res.data.error}
      });
    }

  }
}
