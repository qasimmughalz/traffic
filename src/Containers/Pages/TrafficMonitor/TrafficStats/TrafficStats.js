import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Sidebar } from '../../../Layout/Sidebar/Sidebar';
import { TopNav } from '../../../../Components/TopNav/TopNav';
import classes from './trafficStats.module.css';
import { Sites } from '../../../Redux/AllSites';
import LineChart from './LineChart';
import TrafficTable from './TrafficTable';
import { VideoModal } from '../../../../Components/Modal/VideoModal';
import { backend } from '../../../../Components/backendURL';
import PaginatedItems from '../../../../Components/Pagination/Pagination';
import { Spinner } from '../../../../Components/Spinner/Loader';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { TheModal } from '../../../../Components/Modal/Modal';
import { NotifyModal } from '../../../../Components/Modal/NotifyModel';

const TrafficStats = React.memo(() => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const navbarShow = useSelector((state) => state.navbarToggle.show);
  const allSites = JSON.parse(localStorage.getItem('allSiteData'));
  const user = localStorage.getItem('email');
  const selectedDomain = useRef();

  const [record, setRecord] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [originalDates, setOriginalDates] = useState([]);
  const [originalValues, setOriginalValues] = useState([]);
  const [datesArray, setDatesArray] = useState([]);
  const [valuesArray, setValuesArray] = useState([]);
  const [ShowModal, setShowModal] = useState(false);
  const [VideoEvents, setVideoEvents] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [videoError, setVideoError] = useState(null);
  const token = localStorage.getItem('token');

  const FilterTrafficSties = allSites?.filter(
    (res) => res.feature === 'ALL_FEATURES'
  );

  useEffect(() => {}, [selectedDomain]);
  // Function to Bring Records
  const handleSelectedDomain = (e) => {
    
    setisLoading(true);
    const bringRecord = async () => {
      const resp = await axios({
        method: 'POST',
        url: `${backend}/api/getEvents`,
        data: { email: user, domainName: e },
      })
        .then((res) => {
          // console.log('Response getting EVENTS =====', res);
          setisLoading(false);
          setRecord(res.data.events);

          // console.log(res.data.events);
          let labels = [];
          let values = [];
          res.data.events.map((item) => {
            /* code to set original dates state */
            const date = new Date(item.currDate);
            const year = date.getFullYear(); //2022

            const month = String(date.getMonth() + 1).padStart(2, '0'); //09

            const day = String(date.getDate()).padStart(2, '0'); //06

            const joined = [year, month, day].join('-'); //2022-09-06
            if (labels.indexOf(joined) === -1) {
              labels.push(joined);
              values.push(1);
            } else {
              let index = labels.indexOf(joined);
              values[index] += 1;
            }
            /* code to set original dates state */
          });

          /* set states of dates and values for graph */
          setDatesArray(labels);
          setValuesArray(values);
          setOriginalDates(labels);
          setOriginalValues(values);
          /* set states of dates and values for graph */
        })
        .catch((e) => {
        
          setRecord([]);
          setisLoading(false);
        });
    };
    bringRecord();
  };

  /* filter original arrays data on date change */
  const dateChangeHandler = (dates, dateStrings) => {
    const originalD = [...originalDates];
    const originalV = [...originalValues];
    if (dates) {
      let start = dates[0].clone().startOf('day');
      let end = dates[1].clone().endOf('day');
      let localD = [];
      let localV = [];

      while (start <= end) {
        const dateIndex = originalD.indexOf(moment(start).format('YYYY-MM-DD'));

        if (dateIndex !== -1) {
          localD.push(originalD[dateIndex]);
          localV.push(originalV[dateIndex]);
        }
        start.add(1, 'days');
      }

      setDatesArray(localD);
      setValuesArray(localV);
    } else {
      setDatesArray(originalD);
      setValuesArray(originalV);
    }
  };

  // Visitors Data
  const visitors = valuesArray.map((data) => data);
  const filteredVisitors = visitors.reduce(
    (totalVal, currentVal) => (totalVal += currentVal),
    0
  );
  
  // Filtered Record Data Between Dates
  const startDate = moment(datesArray[0]).format('YYYY-MM-DD');
  const endDate = moment(datesArray[datesArray.length - 1]).format(
    'YYYY-MM-DD'
  );
  const filterRecord = useMemo(
    () =>
      record.filter(
        (data) =>
          moment(data.currDate).format('YYYY-MM-DD') >= startDate &&
          moment(data.currDate).format('YYYY-MM-DD') <= endDate
      ),
    [startDate, endDate, record]
  );
  filterRecord.reverse();
 

  const showVideo = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setVideoError(null);
  };

  const showEventsVideo = (data) => {
    setVideoEvents(data);
    setShowModal(true);
  };

  const showVideoEvents = async (data) => {
    try {
      setisLoading(true);
      const res = await axios({
        method: 'GET',
        url: `${backend}/api/getBlobData/${data}`,

        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setVideoEvents(res.data.sessionEvents);
     
      setShowModal(true);
      setisLoading(false);
    } catch (error) {
    
      setisLoading(false);
      setVideoError(error.response.data?.error);
    }
  };


  return (
    <div className='wrapper'>
      <div className='dashboard-wrapper'>
        <div
          className={navbarShow ? 'sidebar px-md-3' : 'sidebar show px-md-3'}
        >
          <Sidebar> </Sidebar>
        </div>
        <div className='right-content'>
          <div className='content'>
            <TopNav />
            {/* =============== Inner Section Start ============= */}
            {isLoading ? <Spinner color='#2285b6' /> : null}
            {ShowModal && (
              <VideoModal
                title='map'
                events={VideoEvents}
                cancel={handleConfirm}
              ></VideoModal>
            )}
            {videoError !== null && (
              <NotifyModal
                title='Video Events'
                onConfirm={handleConfirm}
                message={videoError}
              />
            )}

            <div className='container-fluid mb-5 '>
              <div className='d-flex align-items-center justify-content-between mb-4'>
                <h1 className='h3 mb-0 text-gray-800'>Traffic Stats</h1>
                <div>
                  <label className='mr-2'>Domain: </label>
                  <select
                    className='custom-select w-auto'
                    placeholder='please select domain name'
                    onChange={(e) => handleSelectedDomain(e.target.value)}
                  >
                    <option value=''>Please Select domain</option>
                    {FilterTrafficSties &&
                      FilterTrafficSties.map((res) => {
                        return (
                          <option value={res.domain} key={res.domain}>
                            {res.domain}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              {record.length === 0 ? (
                <div className='text-center my-4'>
                  <p> No Results </p>
                </div>
              ) : (
                <div className={classes.graph} style={{ marginBottom: '20px' }}>
                  <div className='d-flex align-center justify-content-center'>
                    <RangePicker
                      ranges={{
                        Today: [moment().startOf('day'), moment().endOf('day')],
                        Yesterday: [
                          moment().subtract(1, 'days').startOf('day'),
                          moment().subtract(1, 'days').endOf('day'),
                        ],
                        'This Week': [
                          moment().startOf('week'),
                          moment().endOf('week'),
                        ],
                        'This Month': [
                          moment().startOf('month'),
                          moment().endOf('month'),
                        ],
                        'Last Week': [
                          moment().subtract(1, 'weeks').startOf('week'),
                          moment().subtract(1, 'weeks').endOf('week'),
                        ],
                        'Last Month': [
                          moment().subtract(1, 'months').startOf('month'),
                          moment().subtract(1, 'months').endOf('month'),
                        ],
                      }}
                      onChange={dateChangeHandler}
                    />
                  </div>
                  {filteredVisitors !== 0 ? (
                    <LineChart
                      datesArray={datesArray}
                      valuesArray={valuesArray}
                    />
                  ) : (
                    <h5 className='text-center my-5'>No Visitors Found</h5>
                  )}
                </div>
              )}

              {isLoading ? (
                <div className='text-center my-4'>
                  <Spinner color='#2285b6'></Spinner>
                </div>
              ) : (
                ''
              )}
              {record.length === 0 ? (
                <div className='text-center my-4'>
                  <p> No Results </p>
                </div>
              ) : (
                <div className='row'>
                  <div className='col-xl-3 col-md-6 my-4'>
                    <div className='card  h-100 py-2'>
                      <div className='card-body'>
                        <div className='row no-gutters align-items-center'>
                          <div className='col mr-2'>
                            <div className='text-xs font-weight-bold text-success text-uppercase mb-1'>
                              Total Visitors
                            </div>
                            <div className='h5 mb-0 font-weight-bold text-gray-800'>
                              {filteredVisitors}
                            </div>
                          </div>
                          <div className='col-auto'>
                            <i className='fas fa-calendar fa-2x text-success'></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {isLoading ? (
                <div className='text-center my-4'>
                  <Spinner color='#2285b6'></Spinner>
                </div>
              ) : (
                ''
              )}

              <TrafficTable
                currentItems={currentItems}
                showVideoEvents={showVideoEvents}
              />
              {filterRecord && (
                <PaginatedItems
                  setCurrentItems={setCurrentItems}
                  itemsPerPage={5}
                  items={filterRecord}
                />
              )}

              {filterRecord.length === 0 ? (
                <div className='text-center my-4'>
                  <p> No Results </p>
                </div>
              ) : (
                ''
              )}

              {isLoading ? (
                <div className='text-center my-4'>
                  <Spinner color='#2285b6'></Spinner>
                </div>
              ) : (
                ''
              )}
              <div className='my-5 '></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TrafficStats;
