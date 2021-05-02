import React from "react";
import {Route,Redirect} from "react-router-dom";

const PrivateRoute=function({component:Component,...rest}){
  //for visting pages once user is logged in
  return <Route {...rest} component={function(props){
    const token=window.localStorage.getItem('token');
    if(token){
      return <Component {...props} />
    }
    else{
      return <Redirect to={'/signin'}/>
    }
  }}/>
}

export default PrivateRoute;
