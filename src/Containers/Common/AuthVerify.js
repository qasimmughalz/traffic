import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = useLocation();
//   console.log(localStorage.getItem("token"));
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    // console.log('in');
    if (userToken) {
      const decodedJwt = parseJwt(userToken);
      // console.log(decodedJwt);
      // const date = new Date(decodedJwt.exp*1000);
      // const iatDate = new Date(decodedJwt.iat*1000);
      // console.log(iatDate.toLocaleTimeString(),'iat');
      // console.log(date.toLocaleTimeString(),'exp');
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return ;
};

export default AuthVerify;