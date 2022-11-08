import './App.css';
import AppRoutes from './Containers/Routes/AppRoutes';
import { Buffer } from 'buffer';
import { useEffect, useCallback } from 'react';
import { Suspense } from 'react';
import { Spinner } from './Components/Spinner/Loader';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AuthVerify from './Containers/Common/AuthVerify';
import { useDispatch } from 'react-redux';
import { logoutHandler } from './Containers/Redux/UserAuth';
function App() {
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    console.log('logout call');
    dispatch(logoutHandler());
  }, [dispatch]);

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
    // Waqas
    // "client-id":"AeolzkC6pRpsHLxdR3HnbG0Ka0HBujlvh7r3P-TsvIwKt7GD1oDKQAgysZv-llre2Fo81R7Lbzxl1ZGQ",

    // qasim
    'client-id':
      'AV4wEWUa2lG_if-0Ci51L2XN4fyxxYz5AnHRf1YkwBRi1gTn3k9_ZHPGO1hmjv3K9Tr9h2AqA1Xo4BJn',

    currency: 'USD',
    intent: 'subscription',
    vault: true,
  };

  return (
    <Suspense fallback={<Spinner color='#2285b6' />}>
      <div className='App'>
        <PayPalScriptProvider options={initialOptions}>
          <AppRoutes />
        </PayPalScriptProvider>
        <AuthVerify logOut={logOut} />
      </div>
    </Suspense>
  );
}

export default App;
