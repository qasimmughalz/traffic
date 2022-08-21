import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { logoutHandler, settingInitialValues } from "./Containers/Redux/UserAuth";
import { AuthenticatedRoutes } from "./Containers/Routes/Authenticated";
import { UnAuthenticatedRoutes } from "./Containers/Routes/UnAuthenticated";
import { Buffer } from "buffer";

function App() {
  const [check, setcheck] = useState(false);

  const dispatch = useDispatch();
  let userFound = useSelector((state) => state.UserAuth.isLoggedIn);
  const token = localStorage.getItem("token");

  function isTokenExpired(token) {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = Buffer.from(payloadBase64, "base64").toString();
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    const expired = Date.now() >= exp * 1000;
    return expired;
  }

  const ValidateToken = (token) => {
    const resp = axios({
      method: "POST",
      url: "https://plugin-nodejs-server.herokuapp.com/api/login",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setcheck(true);
      })
      .catch((er) => {
        setcheck(false);
      });
  };

  if (!token) {
    dispatch(logoutHandler);
  } else {
    dispatch(settingInitialValues({ userToken:token , userLoggedIn :true}))
    ValidateToken(token);
    if (check) {
      if (isTokenExpired(token)) {
        dispatch(logoutHandler);
      }
    } else {    
      dispatch(logoutHandler);
    }
  }

  return (
    <div className="App">
      {userFound ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
    </div>
  );
}

export default App;
