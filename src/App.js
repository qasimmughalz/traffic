import "./App.css";
import AppRoutes from "./Containers/Routes/AppRoutes";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { Suspense } from "react";
import { Spinner } from "./Components/Spinner/Loader";


function App() {

//  function isTokenExpired(token) {
//     const payloadBase64 = token.split(".")[1];
//     const decodedJson = Buffer.from(payloadBase64, "base64").toString();
//     const decoded = JSON.parse(decodedJson);
//     const exp = decoded.exp;
//     const expired = Date.now() >= exp * 1000;
//     return expired;
//   }

  return (
    <Suspense fallback={<Spinner color='#2285b6'/>}>
    <div className="App">
     <AppRoutes />
    </div>
    </Suspense>
  );
}

export default App;
