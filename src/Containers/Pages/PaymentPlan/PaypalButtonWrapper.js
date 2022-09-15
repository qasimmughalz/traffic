import { useEffect } from "react";
import {
    PayPalButtons
} from "@paypal/react-paypal-js";
import axios from "axios";
import { backend } from "../../../Components/backendURL";
// This values are the props in the UI
const currency = "USD";
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and handle currency changes
const PaypalButtonWrapper = ({ currency ,domain}) => {

    const sendIdToDb = async (id)=>{
        const email = localStorage.getItem('email')
        const getToken = localStorage.getItem('token')

        await axios({
            method:'POST', 
            url:`${backend}/api/createSession`,
            data:{email: email, domainName: domain, feature:'PLUGIN_ANALYTICS_COMBO', subscriptionId:id, paymentMethod:'PAYPAL'},
            headers: {
                        "authorization": `Bearer ${getToken}`
                    }
        })
        .then(res => console.log("Response", res))
        .catch(e=> console.log('error',e))
    }


    return (<>
            
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[currency, style]}
                fundingSource={undefined}
                createSubscription={ (data, actions) => {
                    return actions.subscription.create({
                      /* Creates the subscription */
                    //   waqas id 
                    //   P-07G706621S2160458MMQHVQA
                      plan_id: 'P-8NU54831CL135490WMMQYJCY'
                    });
                  }
                }
                onApprove={function (data, actions) {
                    console.log("data from subscription", data);
                    alert('Transaction Performed Successfully');
                    sendIdToDb(data.subscriptionID)
                    // 1- domaiName , email , feature , paymentMethod="PAYPAL",subscription_ID, 
                }}
            />
        </>
    );
}

export default PaypalButtonWrapper;