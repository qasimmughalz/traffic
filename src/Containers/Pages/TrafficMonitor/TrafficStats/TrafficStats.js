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
import { useRef } from "react"

Chart.register(Title, Tooltip, LineElement, Legend , CategoryScale, LinearScale, PointElement )

export const TrafficStates = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [isLoading, setisLoading]= useState(false)
    const navbarShow = useSelector(state => state.navbarToggle.show)
    const allSites = useSelector(state => state.getAllsites.sites)
    const allEvents = useSelector(state => state.getAllsites.events)

    const FilterTrafficSties = allSites.filter((res)=> res.feature === 'ANALYTICS')

    const [record, setRecord] = useState([])

    const [script, setScript] = useState()
    const [ShowModal, setShowModal] = useState(false)
    const getToken = localStorage.getItem('token')
    const user = localStorage.getItem('email')

    const selectedDomain = useRef()
    




    useEffect(()=> {
        dispatch(Sites());
    },[])

    useEffect(()=> {
            console.log("Selected Domain is", selectedDomain.current)
    },[selectedDomain])

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
              setisLoading(false)
                dispatch(setEvents(res.data.events.events))
                navigate('/replay')
            }).catch((e) => {
              setisLoading(false)
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
          label: 'Expenses Stats',
          data: [0, 3, 0, 5, 2, 15, 24,15,16,17,14,18],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };






      const handleSelectedDomain = (e)=>{
        console.log("check selected", e)
        setisLoading(true)

        const bringRecord = async () => {
            const resp = await axios({
                method: 'POST',
                url: `https://plugin-nodejs-server.herokuapp.com/api/getEvents`,
                data: {email: user, domainName: e},
            }).then((res) => {
                console.log("Response getting EVENTS =====",res)
                setisLoading(false)
                setRecord(res.data.events)
            }).catch((e) => {
                console.log("Error", e)
                setRecord([])
                setisLoading(false)
            })
        }
        bringRecord()

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
                    <div className="container-fluid mb-5 ">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Traffic Stats</h1>
                            <div>

                             
                                <label className="mr-2">Domain: </label>
                                  <select className="custom-select w-auto" placeholder="please select domain name" onChange={(e)=> handleSelectedDomain(e.target.value)} >
                                    <option value="" >Please Select domain</option>
                                    {FilterTrafficSties && FilterTrafficSties.map((res)=>{
                                      return  <option value={res.domain}>{res.domain}</option>
                                    })}
                                  </select>
                            </div>
                        </div>

                        {record.length == 0 ? (<div className="text-center my-4">
                        <p> No Results </p>
                        </div>
                        ):(
                                <div className="m-auto"
                                style={{
                                    width: '600px',
                                    height: '300px'
                                }}
                                >
                                    <Line data={data}></Line>
                                </div>
                        )}
                        {isLoading ? (<div className="text-center my-4">
                        <Spinner color='#2285b6'></Spinner>
                        </div>
                        ):''}
                                
                        <div className="table-responsive sites-table bg-white mt-5">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">IP Address</th>
                                        <th scope="col">Date</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                {record && (record.map((data)=>{
                                    return (<tr scope='row'>
                                    <td>{data.date}</td>
                                    <td ><button className="btn-primary btn" onClick={()=> ShowScript(data.domain)}>Video</button></td>
                                </tr>)
                                })) }
                                    
                                </tbody>
                            </table>
                        </div>

                        {record.length == 0 ? (<div className="text-center my-4">
                        <p> No Results </p>
                        </div>
                        ):''}

                        {isLoading ? (<div className="text-center my-4">
                        <Spinner color='#2285b6'></Spinner>
                        </div>
                        ):''}

                    </div>

                    {/* =============== Inner Section End ============= */}
                </div>
            </div>
        </div>
    </div>
    )
}