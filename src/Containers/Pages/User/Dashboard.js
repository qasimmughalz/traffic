import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../../Components/Spinner/Loader';
import { TopNav } from '../../../Components/TopNav/TopNav';
import { getProfile } from '../../../helpers/ApiActions';
import { Sidebar } from '../../Layout/Sidebar/Sidebar';
import { Sites } from '../../Redux/AllSites';

export const Dashboard = () => {
  const navbarShow = useSelector((state) => state.navbarToggle.show);
  const sitesFromRedux = useSelector((state) => state.getAllsites.sites);
  const sitesLoading = useSelector((state) => state.getAllsites.sitesLoading);
  const error = useSelector((state) => state.getAllsites.error);
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Sites(email, token));
    getProfile(email, token);
  }, [token, email]);

  return (
    <>
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

            <div className='container-fluid'>
              <div className='d-flex align-items-center justify-content-between mb-4'>
                <h1 className='h3 mb-0 text-gray-800'> Dashboard </h1>
                <div>
                  {sitesLoading && !error ? (
                    <Spinner color='#2285b6'></Spinner>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-xl-3 col-md-6 mb-4'>
                  <div className='card  shadow h-100 py-2'>
                    <div className='card-body'>
                      <div className='row no-gutters align-items-center'>
                        <div className='col mr-2'>
                          <div className='text-xs font-weight-bold text-success text-uppercase mb-1'>
                            Total Sites
                          </div>
                          <div className='h5 mb-0 font-weight-bold text-gray-800'>
                            {sitesFromRedux.length > 0
                              ? sitesFromRedux.length
                              : 0}
                          </div>
                        </div>
                        <div className='col-auto'>
                          <i className='fas fa-calendar fa-2x text-success'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-3 col-md-6 mb-4'>
                  <div className='card shadow h-100 py-2'>
                    <div className='card-body'>
                      <div className='row no-gutters align-items-center'>
                        <div className='col mr-2'>
                          <div className='text-xs font-weight-bold text-info text-uppercase mb-1'>
                            Activations
                          </div>
                          <div className='row no-gutters align-items-center'>
                            <div className='col-auto'>
                              <div className='h5 mb-0 mr-3 font-weight-bold text-gray-800'>
                                {sitesFromRedux.length > 0
                                  ? sitesFromRedux.filter(
                                      (sites) =>
                                        sites.message ===
                                        'User have subscribed to a plan'
                                    ).length
                                  : 0}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-auto'>
                          <i className='fas fa-clipboard-list fa-2x text-info'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-3 col-md-6 mb-4'>
                  <div className='card  shadow h-100 py-2'>
                    <div className='card-body'>
                      <div className='row no-gutters align-items-center'>
                        <div className='col mr-2'>
                          <div className='text-xs font-weight-bold text-warning text-uppercase mb-1'>
                            Payments
                          </div>
                          <div className='h5 mb-0 font-weight-bold text-gray-800'>
                            {sitesFromRedux.length > 0
                              ? sitesFromRedux.filter(
                                  (sites) =>
                                    sites.message ===
                                    'User have subscribed to a plan'
                                ).length
                              : 0}
                          </div>
                        </div>
                        <div className='col-auto'>
                          <i className='fas fa-dollar-sign fa-2x text-warning'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =============== Inner Section End ============= */}
          </div>
        </div>
      </div>
    </>
  );
};
