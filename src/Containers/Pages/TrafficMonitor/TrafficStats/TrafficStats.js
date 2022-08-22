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
import { Chart  ,Title , Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from "chart.js"
import { Line } from 'react-chartjs-2'

Chart.register(Title, Tooltip, LineElement, Legend , CategoryScale, LinearScale, PointElement )

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


    const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY','JUNE','JULY','AUG', 'SEP','OCT','NOV','DEC']
    const data = {
        labels: labels,
        datasets: [{
          label: 'Traffic Stats',
          data: [0, 3, 0, 5, 2, 15, 24,15,16,17,14,18],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

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
                                    width: '600px',
                                    height: '300px'
                                }}
                                >
                                    <Line data={data}></Line>
                                </div>

                                <div className="row my-4">
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card  shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Total Sites
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            23
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-calendar fa-2x text-success">
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">

                            Activations
                          </div>
                          <div className="row no-gutters align-items-center">
                            <div className="col-auto">
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">

                                3
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-clipboard-list fa-2x text-info">

                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card  shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Payments
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">

                            Nill
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-warning">

                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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