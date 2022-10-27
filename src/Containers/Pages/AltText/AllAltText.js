import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../../Components/Spinner/Loader';
import { TopNav } from '../../../Components/TopNav/TopNav';
import { Sidebar } from '../../Layout/Sidebar/Sidebar';
import { Sites } from '../../Redux/AllSites';
import axios from 'axios';
import { Modal } from '../../../Components/Modal/Modal';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderDetailsModal } from '../../../Components/Modal/OrderDetails';
import { backend } from '../../../Components/backendURL';

const AllAltText = () => {
  let tempCounter = 1;
  const [isLoading, setisLoading] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [script, setScript] = useState();
  const [subscriptionID, setSubscriptionId] = useState();

  const navbarShow = useSelector((state) => state.navbarToggle.show);
  const allSites = useSelector((state) => state.getAllsites.sites);
  const sitesLoading = useSelector((state) => state.getAllsites.sitesLoading);
  const FilterTrafficSties = allSites.filter(
    (res) => res.feature === 'ALT_TEXT'
  );
  const [ShowModal, setShowModal] = useState(false);
  const getToken = localStorage.getItem('token');
  const user = localStorage.getItem('email');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(Sites(user, getToken));
  }, []);

  const ShowScript = (domainName, feature) => {
    setisLoading(true);
    const RunTheTask = async () => {
      const resp = await axios({
        method: 'POST',
        url: `${backend}/api/getScript`,
        data: {
          email: user,
          domainName: domainName,
          feature: feature,
        },
        headers: {
          authorization: `Bearer ${getToken}`,
        },
      })
        .then((res) => {
          setScript({ domain: domainName, script: res.data.script });
          setShowModal(true);
          setisLoading(false);
        })
        .catch((e) => {
          setisLoading(false);
          if (!e.response.data.isActive) {
            setScript({
              message: 'You need to clear payment before activation.Pay Now !',
            });
            setShowModal(true);
            setisLoading(false);
          }
        });
    };
    RunTheTask();
  };

  const handleConfirm = () => {
    setShowModal(false);
    setShowOrderDetails(false);
  };

  const ShowMoreDetails = (id) => {
    setSubscriptionId(id);

    if (subscriptionID === '' || subscriptionID === null) {
      alert('No Package Installed');
    } else {
      setShowOrderDetails(true);
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

            {ShowModal && (
              <Modal
                title='Script'
                message={script}
                onConfirm={handleConfirm}
              />
            )}

            {showOrderDetails ? (
              <OrderDetailsModal
                title='Order Details'
                id={subscriptionID}
                onConfirm={handleConfirm}
              />
            ) : (
              ''
            )}

            <div className='container-fluid '>
              <div className='d-flex align-items-center justify-content-between mb-4'>
                <h1 className='h3 mb-0 text-gray-800'>All Site</h1>
                <div>
                  {sitesLoading || isLoading ? (
                    <Spinner color='#2285b6'></Spinner>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className='table-responsive sites-table bg-white'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Domain Name</th>
                      <th scope='col'>Message</th>
                      <th scope='col'>Feature</th>
                      <th scope='col'>Installation</th>
                      <th scope='col'>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FilterTrafficSties.length > 0
                      ? FilterTrafficSties.map((data) => {
                          return (
                            <tr scope='row' key={data.domain}>
                              <th scope='row'>{tempCounter++}</th>
                              <td>{data.domain}</td>
                              <td>{data.message}</td>
                              <td>
                                {data.message === 'No subscription activated'
                                  ? ''
                                  : data.feature}
                              </td>
                              <td className=''>
                                <button
                                  className='btn-secondary btn'
                                  onClick={() =>
                                    ShowScript(data.domain, data?.feature)
                                  }
                                >
                                  Get Script
                                </button>
                              </td>
                              <td className=''>
                                <button
                                  className='btn-primary btn'
                                  onClick={() =>
                                    ShowMoreDetails(data.subscriptionId)
                                  }
                                  disabled={
                                    data.message === 'No subscription activated'
                                      ? true
                                      : false
                                  }
                                >
                                  {' '}
                                  Details
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : ''}
                  </tbody>
                </table>
              </div>

              {FilterTrafficSties.length == 0 ? (
                <div className='text-center my-4'>
                  <p>You have not Subscribes for any website </p>
                  <a href='/addNewTraffic' className='btn btn-primary'>
                    Add a New Site Now
                  </a>
                </div>
              ) : (
                ''
              )}
            </div>

            {/* =============== Inner Section End ============= */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAltText;
