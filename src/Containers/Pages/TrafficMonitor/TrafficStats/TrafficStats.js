import { useEffect , useMemo} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Spinner } from "../../../../Components/Spinner/Loader"
import { TopNav } from "../../../../Components/TopNav/TopNav"
import { Sidebar } from "../../../Layout/Sidebar/Sidebar"
import { Sites } from "../../../Redux/AllSites"
import axios from "axios"
import { Modal } from "../../../../Components/Modal/Modal"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { setEvents } from "../../../Redux/getAllSites"
import { Chart } from "react-chartjs-2"


export const TrafficStates = () => {

    const [isLoading, setisLoading]= useState(false)
    const navbarShow = useSelector(state => state.navbarToggle.show)
    const allSites = useSelector(state => state.getAllsites.sites)
   const FilterTrafficSties = allSites.filter((res)=> res.feature === 'ANALYTICS')
    const [script, setScript] = useState()
    const [ShowModal, setShowModal] = useState(false)
    const getToken = localStorage.getItem('token')
    const user = localStorage.getItem('email')
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(()=> {
        dispatch(Sites());
    },[])

    const ShowScript = (userId, sitekey)=>{
        setisLoading(true)
        const RunTheTask = async () => {
            const resp = await axios({
                method: 'POST',
                url: `https://plugin-nodejs-server.herokuapp.com/api/getEvents`,
                data: {userId: '62a210133dee6af1b5e167df', siteKey: '63022d199286e63e57dd0cdf'},
                headers: {
                    "authorization": `Bearer ${getToken}`
                  },
            }).then((res) => {
                console.log("response events", res)
                dispatch(setEvents(res.data.events.events))
                navigate('/replay')
            }).catch((e) => {
                console.log("Error", e)
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

    const data = useMemo(
        () => [
          {
            label: 'Series 1',
            data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
          },
          {
            label: 'Series 2',
            data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
          },
          {
            label: 'Series 3',
            data: [{ x: 1, y: 10 }, { x: 2, y: 10 }, { x: 3, y: 10 }]
          }
        ],
        []
      )
     
      const axes = useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )
     

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
                            <h1 className="h3 mb-0 text-gray-800">Traffic Stats</h1>
                        </div>

                                <div
                                style={{
                                    width: '400px',
                                    height: '300px'
                                }}
                                >
                                <Chart data={data} axes={axes} />
                                </div>
                          

                        <div className="table-responsive sites-table bg-white">

                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        
                                        <th scope="col">IP Address</th>
                                        <th scope="col">Source</th>
                                        <th scope="col">Clicks</th>
                                        <th scope="col">Area</th>
                                        <th scope="col">Video</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {FilterTrafficSties.length && (FilterTrafficSties.map((data)=>{
                                    return (<tr scope='row'>
                                    <td>{data.domain}</td>
                                    <td>{data.message}</td>
                                    <td>{data.trialEndDate}</td>
                                    <td className="text-center"><button className="btn-primary btn" onClick={()=> ShowScript(data.domain)}>Get</button></td>
                                    <td><button className="btn btn-success" onClick={()=> UpgradeScript(data.domain)}>UPGRADE</button></td>
                                </tr>)
                                })) }
                                    
                                </tbody>
                            </table>
                        </div>

                        {FilterTrafficSties.length == 0 ? (<div className="text-center my-4">
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