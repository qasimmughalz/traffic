

import { Fragment, useEffect } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useState } from 'react'
import qs from 'qs'

import axios from 'axios'
import { Spinner } from '../Spinner/Loader'

export const TheOrderDetails = (props) => {

    const [data, setData] = useState()
    const [isloading, setIsLoading]= useState(false)

    useEffect(()=> {
        const PaypalSubscriptionDetail = async ()=>{
            setIsLoading(true)
               const token = await axios({
                    method:'POST', 
                    url:'https://api-m.sandbox.paypal.com/v1/oauth2/token',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify({grant_type: 'client_credentials' }),
                    auth: {
                        username: 'AV4wEWUa2lG_if-0Ci51L2XN4fyxxYz5AnHRf1YkwBRi1gTn3k9_ZHPGO1hmjv3K9Tr9h2AqA1Xo4BJn',
                        password: 'EKc03SCfR4ugQDyg0GCPIhng0-omwMXHYXuyGxJbyC8IjhVPIZTtis5XOk2UXwuLJBeQoaFpax_HPpp3'
                      }
                    }).then(res => res.data.access_token)
                    .catch(err => console.log("Error T0ken Paypal", err))
                    
                    
                    if(token){
                        await axios({
                            method:'GET', 
                            url:`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${props.id}`,
                            headers: {
                                "authorization": `Bearer ${token}`
                              }
                            })
                            .then(res => {
                                setIsLoading(false)
                                setData(res.data)
                            })
                            .catch(err => {
                                setIsLoading(false)
                            })
                    }
                    else{
                        alert("ERRRRROOOOORR")
                        setIsLoading(false)
                    }


            }

               PaypalSubscriptionDetail()

    },[])


    return (<div className={classes.backdrop} >

        <div className={`${classes.modal} ${classes.card}`}>
            <header className={classes.header}>
                <h2> {props.title} </h2>
            </header>
            <div className={classes.content}>


                {isloading ? (<>
                    <div className='text-center'>
                <p>Please wait, It takes around 40-60sec to respond.</p>
                <Spinner color="2285b6"/>
                </div>
                </>) :
            
            (<div className="table-responsive sites-table bg-white">
                            <table className="table table-striped text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Payer Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Start Time</th>
                                        <th scope="col">Amount Paid</th>
                                        <th scope="col">Expire</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>{ data && `${data?.subscriber?.name?.given_name}` }</td>
                                    <td className='font-weight-bold'>{ data && data.status}</td>
                                    <td>{ data && data?.start_time?.split('T')[0] }</td>
                                    <td>{ data && `$${data?.billing_info?.last_payment?.amount?.value}`} </td>
                                    <td>{ data && data?.billing_info?.next_billing_time?.split('T')[0]}</td>
                                    </tr>
                                </tbody>
                            </table>
              </div>)}
            </div>
            <footer className={`${classes.actions} justify-content-end`}>
                <button className='btn btn-primary' onClick={props.onConfirm}>Cancel</button>
            </footer>
        </div>
    </div>
    )
}

export const OrderDetailsModal = (props) => {
    return (<Fragment>
        {ReactDOM.createPortal(<TheOrderDetails title={props.title} id={props.id} onConfirm={props.onConfirm} />, document.getElementById('modal'))}
    </Fragment>

    )
}