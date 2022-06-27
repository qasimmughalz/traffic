import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Spinner } from "../../../Components/Spinner/Loader"
import { TopNav } from "../../../Components/TopNav/TopNav"
import { Sidebar } from "../../Layout/Sidebar/Sidebar"
import { Sites } from "../../Redux/AllSites"
import axios from "axios"
import { Modal } from "../../../Components/Modal/Modal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const AllSites = () => {

    let tempCounter = 1;
    const [isLoading, setisLoading]= useState(false)
    const navbarShow = useSelector(state => state.navbarToggle.show)
    const allSites = useSelector(state => state.getAllsites.sites)
    const [script, setScript] = useState()
    const [ShowModal, setShowModal] = useState(false)
    const getToken = localStorage.getItem('token')
    const user = localStorage.getItem('email')
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(()=> {
        dispatch(Sites());
    },[])

    const ShowScript = (domainName)=>{
        setisLoading(true)
        const RunTheTask = async () => {
            const resp = await axios({
                method: 'POST',
                url: `https://plugin-nodejs-server.herokuapp.com/api/getScript`,
                data: {email: user, domainName: domainName},
                headers: {
                    "authorization": `Bearer ${getToken}`
                  },
            }).then((res) => {
                
                console.log("res", res);
                console.log('script:', res.script)
                setScript({domain: domainName , script: res.data.script})
                setShowModal(true)
                setisLoading(false)
               
            }).catch((e) => {
                setisLoading(false)
                console.log("error", e)
            })
        }
        RunTheTask()
    }   

    const handleConfirm = ()=>{
            setShowModal(false)
    }

    const UpgradeScript = (domainName)=>{
        localStorage.setItem('domain',  domainName)
        navigate('/paymentplans')
    }

    return (<div className="wrapper">
        <div className="dashboard-wrapper">
            <div className={navbarShow ? 'sidebar px-md-3' : 'sidebar show px-md-3'} >
                <Sidebar> </Sidebar>
            </div>
            <div className="right-content">
                <div className="content">

                    <TopNav />
                    {/* =============== Inner Section Start ============= */}


                    {ShowModal && <Modal title="Script" message={script} onConfirm={handleConfirm}/> }
                    <div className="container-fluid ">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">All Site</h1>
                        </div>


                        <div className="table-responsive sites-table bg-white">



                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Domain Name</th>
                                        <th scope="col">Message</th>
                                        <th scope="col">Plan</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Expiring</th>
                                        <th scope="col">Installation</th>
                                        <th scope="col">Upgrade</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {allSites.length && (allSites.map((data)=>{
                                    return (<tr scope='row'>
                                    <th scope="row">{tempCounter++}</th>
                                    <td>{data.domain}</td>
                                    <td>{data.message}</td>
                                    <td>Free</td>
                                    <td>-None-</td>
                                    <td>{data.trialEndDate}</td>
                                    <td className="text-center"><button className="btn-primary btn" onClick={()=> ShowScript(data.domain)}>Get</button></td>
                                    <td><button className="btn btn-success" onClick={()=> UpgradeScript(data.domain)}>UPGRADE</button></td>
                                </tr>)
                                })) }
                                    
                                </tbody>
                            </table>
                        </div>

                        {allSites.length == 0 ? (<div className="text-center my-4">
                        <p>You have not Subscribes for any website </p>
                        <a href="/addnew" className="btn btn-primary">Add a New Site Now</a></div>
                        ):''}

                    </div>

                    {/* =============== Inner Section End ============= */}
                </div>
            </div>
        </div>
    </div>


    )
}