import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

// This values are the props in the UI
const amount = "2";
const currency = "USD";
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and handle currency changes
const PaypalButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
   console.log(currency);
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createSubscription={ (data, actions) => {
                    return actions.subscription.create({
                      /* Creates the subscription */
                      plan_id: 'P-07G706621S2160458MMQHVQA'
                    });
                  }
                }
                onApprove={function (data, actions) {
                    console.log(data);
                    alert('Transaction Performed Successfully');
                    // return actions.subscription.activate(data).then(res=>{
                    //  console.log(data);
                    // })
                    // .catch(err=>{
                    //     console.log('error');
                    //     console.log(err);
                    // })
                    // return actions.subscription.activate().then(function(res){
                    //     console.log(res);
                    // })
                    // .catch(err=>{
                    //     console.log(err);
                    // })
                    // return actions.order.capture().then(function () {
                    //     // Your code here after capture the order
                    // });
                }}
            />
        </>
    );
}

export default PaypalButtonWrapper;