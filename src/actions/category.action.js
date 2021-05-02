import axios from "../helpers/axios";
import {categoryConstants} from "./constants";


const getAllCategory=function(){
  return async function(dispatch){
    dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST});
    const res=await axios.get("category/getCategories");
    console.log(res);
    if(res.status===200){
      const {categoryList}=res.data;
      dispatch({
        type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload:{categories:categoryList}
      });
    }
    else{
      dispatch({
        type:categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload:{error:res.data.error}
      });
    }
  }
}

export const addCategory=function(form){
  return async function(dispatch){
    dispatch({
      type:categoryConstants.ADD_NEW_CATEGORY_REQUEST
    });
    try{
      const res=await axios.post("/category/create",form);
      if(res.status===201){
        dispatch({
          type:categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload:{category:res.data.category}
        });
      }
      else{
        dispatch({
          type:categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload:res.data.error
        });
      }
      console.log(res);

    }
    catch(err){

      console.log(err.response);
    }

  }
}

export const updateCategories=function(form){
  return async function(dispatch){
    dispatch({type:categoryConstants.UPDATE_CATEGORIES_REQUEST});
    const res=await axios.post("/category/update",form);
    if(res.status===201){
      dispatch({type:categoryConstants.UPDATE_CATEGORIES_SUCCESS});
      dispatch(getAllCategory());


    }
    else{
      const {error}=res.data;
      dispatch({
        type:categoryConstants.UPDATE_CATEGORIES_FAILURE,
        payload:{error}
      });

    }

  }
}

export const deleteCategories=function(ids){
  return async function(dispatch){
    dispatch({type:categoryConstants.DELETE_CATEGORIES_REQUEST});
    const res=await axios.post('/category/delete',{
      payload:{
        ids
      }
    });

    if(res.status==201){
      dispatch({type:categoryConstants.DELETE_CATEGORIES_SUCCESS});
      dispatch(getAllCategory());
    }
   else{
     const {error}=res.data;
     dispatch({
       type:categoryConstants.DELETE_CATEGORIES_FAILURE,
       payload:{error}
     });
   }
      console.log(res);



  }
}

export {
  getAllCategory
}
