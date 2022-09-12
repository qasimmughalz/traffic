import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler, settingInitialValues } from "../Redux/UserAuth";
import { AuthenticatedRoutes } from "./Authenticated"
import { UnAuthenticatedRoutes } from "./UnAuthenticated"
const AppRoutes = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const userFound = useSelector((state) => state.UserAuth.isLoggedIn);
  const reduxToken = useSelector((state) => state.UserAuth.token);
  const token = localStorage.getItem("token");

  const ValidateToken = async (currToken) => {
    const dispatch = useDispatch();
    
    const resp = await axios({
      method: "POST",
      url: "https://plugin-nodejs-server.herokuapp.com/api/login",
      headers: {
        authorization: `Bearer ${currToken}`,
      },
    })
      .then( async (res) => {
        setIsLoading(false)
        console.log("Logged In")
        
        const checkExpiry = true;
        if(checkExpiry){
          console.log("Time not expired")
         dispatch(settingInitialValues({ userToken:currToken , userLoggedIn :true}))
     
        }else{
          console.log("Time expired")
          dispatch(logoutHandler())
          
        }
        
      })
      .catch((er) => {
        console.log("Error in Validation", er)
        dispatch(logoutHandler());
       
      });

    
  };


    if (!token) {
      dispatch(logoutHandler);
    } 
    else {
      ValidateToken(token);
    }

    return(
      <>
    { token ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}  
    </>
    )
}

export default AppRoutes;
