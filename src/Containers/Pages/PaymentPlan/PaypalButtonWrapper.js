import { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { backend } from '../../../Components/backendURL';
// import { NotifyModal } from '../../../Components/Modal/NotifyModel';

// This values are the props in the UI
const currency = 'USD';
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and handle currency changes
const PaypalButtonWrapper = ({
  setChoose,
  setModalShow,
  setMessage,
  currency,
  domain,
  feature,
}) => {
  const email = localStorage.getItem('email');

  let domainName = domain.split(' ')[0];
  let planId =
    feature === 'PLUGIN_ANALYTICS_COMBO'
      ? 'P-8NU54831CL135490WMMQYJCY'
      : 'P-6LC865411J823461FMNL42YA';

  const sendIdToDb = async (id) => {
    const getToken = localStorage.getItem('token');

    await axios({
      method: 'POST',
      url: `${backend}/api/createSession`,
      data: {
        email: email,
        domainName: domainName,
        feature: feature,
        subscriptionId: id,
        paymentMethod: 'PAYPAL',
      },
      headers: {
        authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => console.log('Response', res))
      .catch((e) => console.log('error', e));
  };

  // const handleConfirm = ()=>{
  //     setModalShow(false)
  // }
  return (
    <>
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[currency, style]}
        fundingSource={undefined}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            /* Creates the subscription */
            //   waqas id
            //   P-07G706621S2160458MMQHVQA
            plan_id: planId,
            custom_id: email,
          });
        }}
        onApprove={function (data, actions) {
          console.log('data from subscription', data);
          setMessage('Transaction Performed Successfully');
          setModalShow(true);
          sendIdToDb(data.subscriptionID);
          setChoose(false);
          // 1- domaiName , email , feature , paymentMethod="PAYPAL",subscription_ID,
        }}
      />
    </>
  );
};

export default PaypalButtonWrapper;
