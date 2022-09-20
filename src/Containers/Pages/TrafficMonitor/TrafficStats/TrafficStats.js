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
import { Chart  ,Title , Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from "chart.js"
import { Line } from 'react-chartjs-2'
import { useRef } from "react"
import classes from './trafficStats.module.css'
import { VideoModal } from "../../../../Components/Modal/VideoModal"
import { MapModel } from "../../../../Components/Modal/MapModal"
import { backend } from "../../../../Components/backendURL"
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';


Chart.register(Title, Tooltip, LineElement, Legend , CategoryScale, LinearScale, PointElement )

export const TrafficStates = () => {

    const { RangePicker } = DatePicker;

    const selectedDomain = useRef()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const navbarShow = useSelector(state => state.navbarToggle.show)
    const allSites = useSelector(state => state.getAllsites.sites)


    const [record, setRecord] = useState([])
    const [VideoEvents, setVideoEvents] = useState([])
    const [isLoading, setisLoading]= useState(false)
    const [ShowModal, setShowModal] = useState(false)
    const [ShowMapModel, setShowMapModel] = useState(false)

    const getToken = localStorage.getItem('token')
    const user = localStorage.getItem('email')

    const FilterTrafficSties = allSites.filter((res)=> res.feature === 'PLUGIN_ANALYTICS_COMBO')

    

    useEffect(()=> {
        dispatch(Sites());
    },[])

    useEffect(()=> {
    },[selectedDomain])


    const [originalDates,setOriginalDates] = useState([]);
    const [originalValues,setOriginalValues] = useState([]);
    const [datesArray,setDatesArray] = useState([]);
    const [valuesArray,setValuesArray] = useState([]);
    const data = {
        labels: datesArray,
        datasets: [{
          label: 'Total Visitors',
          data: valuesArray,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      /* filter original arrays data on date change */
     const dateChangeHandler = (dates, dateStrings) => {
        const originalD = [...originalDates];
         const originalV = [...originalValues];
        if (dates) {
        //   console.log('From: ', dates[0], ', to: ', dates[1]);
        //   console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
         let start = dates[0].clone().startOf('day');
         let end = dates[1].clone().endOf('day');
         let localD = [];
         let localV = [];
         
          while(start<=end)
          {
            const dateIndex = originalD.indexOf(moment(start).format('YYYY-MM-DD'));
            if(dateIndex !== -1)
            {
                // console.log('found',originalDates[dateIndex],originalValues[dateIndex],start);
                localD.push(originalD[dateIndex]);
                localV.push(originalV[dateIndex]);
            }
            start.add(1,'days');
          }
          setDatesArray(localD);
          setValuesArray(localV);
        } else {
            setDatesArray(originalD);
            setValuesArray(originalV);
        //   console.log('Clear');
        }
      };


     const handleSelectedDomain = (e)=>{
        console.log("check selected", e)
        setisLoading(true)

        const bringRecord = async () => {
            const resp = await axios({
                method: 'POST',
                url:   `${backend}/api/getEvents`,
                data: {email: user, domainName: e},
            }).then((res) => {
                console.log("Response getting EVENTS =====",res)
                setisLoading(false)
                setRecord(res.data.events)
                // console.log(res.data.events);
                let labels = [];
                let values = [];
                res.data.events.map((item)=>{
                    
                    /* code to set original dates state */
                    const date = new Date(item.currDate);
                    const year = date.getFullYear();  //2022

                    const month = String(date.getMonth() + 1).padStart(2, '0'); //09

                    const day = String(date.getDate()).padStart(2, '0'); //06

                    const joined = [year,month,day].join('-'); //2022-09-06
                    if(labels.indexOf(joined) === -1)
                    {
                        labels.push(joined);
                        values.push(1);
                    }
                    else
                    {
                        let index = labels.indexOf(joined);
                        values[index]+=1;
                    }
                     /* code to set original dates state */
                })
                /* set states of dates and values for graph */
                setDatesArray(labels);
                setValuesArray(values);
                setOriginalDates(labels);
                setOriginalValues(values);
                /* set states of dates and values for graph */
            }).catch((e) => {
                console.log("Error", e)
                setRecord([])
                setisLoading(false)
            })
        }
        bringRecord()
      }



      const showVideo= ()=>{
        setShowModal(true)
      }
      const showMapModel= ()=>{
        setShowMapModel(true)
      } 

      const handleConfirm = ()=>{
        setShowModal(false)
        setShowMapModel(false)
    }

    const showEventsVideo = (data)=>{
        setVideoEvents(data)
        setShowModal(true)
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

                    {ShowModal && <VideoModal title='map' events={VideoEvents} cancel={handleConfirm}></VideoModal>}
                    {ShowMapModel && <MapModel title='map' cancel={handleConfirm}></MapModel>}

                    <div className="container-fluid mb-5 ">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Traffic Stats</h1>
                            <div>
                                <label className="mr-2">Domain: </label>
                                  <select className="custom-select w-auto" placeholder="please select domain name" onChange={(e)=> handleSelectedDomain(e.target.value)} >
                                    <option value="" >Please Select domain</option>
                                    {FilterTrafficSties && FilterTrafficSties.map((res)=>{
                                      return  <option value={res.domain} key={res.domain}>{res.domain}</option>
                                    })}
                                  </select>
                            </div>
                        </div>
                        {record.length == 0 ? (<div className="text-center my-4">
                        <p> No Results </p>
                        </div>
                        ):(
                            <div className={classes.graph} style={{marginBottom:'20px'}} >
                            {/*<input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} name="start-date" />
                        <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} name="end-date" />*/}
                                <RangePicker
                                ranges={{
                                  Today: [moment().startOf('day'), moment().endOf('day')],
                                  Yesterday: [moment().subtract(1,'days').startOf('day'),moment().subtract(1,'days').endOf('day')],
                                  'This Week' : [moment().startOf('week'), moment().endOf('week')],
                                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                                  'Last Week' : [moment().subtract(1, 'weeks').startOf('week'), moment().subtract(1, 'weeks').endOf('week')],
                                  'Last Month' : [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')]
                                  
                                }}
                                onChange={dateChangeHandler}
                              />
                                <Line data={data}></Line>
                            
                            </div>
                        ) }

                        { isLoading ? (<div className="text-center my-4">
                        <Spinner color='#2285b6'></Spinner>
                        </div>
                        ):''}
                        {record.length == 0 ? (<div className="text-center my-4">
                        <p> No Results </p>
                        </div>
                        ):(
                            <div className="row">
                            <div className="col-xl-3 col-md-6 my-4">
                            <div className="card  h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Total Visitors
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {record && record.length}
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
                        </div>
                        )}
                        {isLoading ? (<div className="text-center my-4">
                        <Spinner color='#2285b6'></Spinner>
                        </div>
                        ):''}
                                
                        <div className="table-responsive sites-table bg-white mt-1">
                            <table className={`${classes.table} table text-center`}>
                                <thead>
                                    <tr>
                                        <th scope="col">IP Address</th>
                                        <th scope="col">TimeZone</th>
                                        <th scope="col">Clicks</th>
                                        <th scope="col">First Click</th>
                                        <th scope="col">Last Click</th>
                                        <th scope="col">Keypress</th>
                                        <th scope="col">Mouse </th>
                                        <th scope="col">Scroll</th>
                                        <th scope="col">Area</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {record && (record.map((data)=>{
                                    return (<tr scope='row' key={data.key}>
                                    <td>{data.ipAddress}</td>
                                    <td>{data.timezone}</td>
                                    <td>{data.totalClicks}</td>
                                    <td> 
                                        <p className="m-0 text-muted">{data.firstClick && data.firstClick.split('T')[0]}</p> 
                                        <p className="m-0">{data.firstClick && data.firstClick?.split('T')[1].split('.')[0]}</p> 
                                    </td>
                                    <td>
                                        <p className="m-0 text-muted">{data.lastClick && data.lastClick.split('T')[0]}</p> 
                                        <p className="m-0">{data.lastClick && data.lastClick.split('T')[1].split('.')[0]}</p> 
                                    </td>
                                    <td>{data.totalkeyPress}</td>
                                    <td>{data.totalMouseMove}</td>
                                    <td>{data.totalScroll}</td>
                                    <td><i className="fas fa-map-marker-alt text-primary pointer" ></i></td>
                                    {data.totalClicks > 0 ?  <td ><i className="fas fa-video text-primary pointer" onClick={()=> showEventsVideo(data.sessionEvents)}></i></td> : <td></td> }
                                   
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

                        <div className="my-5 "></div>
                    </div>

                    {/* =============== Inner Section End ============= */}
                </div>
            </div>
        </div>
    </div>
    )
}