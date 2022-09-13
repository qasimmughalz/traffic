import "./App.css";
import AppRoutes from "./Containers/Routes/AppRoutes";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { Suspense } from "react";
import { Spinner } from "./Components/Spinner/Loader";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {

//  function isTokenExpired(token) {
//     const payloadBase64 = token.split(".")[1];
//     const decodedJson = Buffer.from(payloadBase64, "base64").toString();
//     const decoded = JSON.parse(decodedJson);
//     const exp = decoded.exp;
//     const expired = Date.now() >= exp * 1000;
//     return expired;
//   }
// "client-id": "AV4wEWUa2lG_if-0Ci51L2XN4fyxxYz5AnHRf1YkwBRi1gTn3k9_ZHPGO1hmjv3K9Tr9h2AqA1Xo4BJn",
const initialOptions = {
  "client-id":"AeolzkC6pRpsHLxdR3HnbG0Ka0HBujlvh7r3P-TsvIwKt7GD1oDKQAgysZv-llre2Fo81R7Lbzxl1ZGQ",
  currency: "USD",
  intent: "subscription",
  // "data-client-token": "EP2DX6iF74UYN5WOhPw64J73_FTyqHILkAAJNha8BvqD-LUGc2T-b3-FFNIML3QbgdRMPWoBcvLOCx7v",
  vault:true,
};

  return (
    <Suspense fallback={<Spinner color='#2285b6'/>}>
    <div className="App">
    <PayPalScriptProvider  options={initialOptions}>
    <AppRoutes />
    </PayPalScriptProvider> 
    </div>
    </Suspense>
  );
}

export default App;
