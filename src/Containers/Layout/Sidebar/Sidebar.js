import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../../assets/images/logo-small.jpg';
import { useEffect } from 'react';

export const Sidebar = () => {
  const userProfile = JSON.parse(localStorage.getItem('user-profile'));

  return (
    <>
      <div className='align-self-start text-center mt-md-4 mt-5'>
        <img
          alt='logo'
          style={{ width: '90%' }}
          src={logo}
          className='sidebar-logo'
        ></img>
        <h5 className='mt-2 text-white'>
          Welcome, <br></br> {userProfile?.Name}
        </h5>
      </div>
      <hr></hr>
      <div className='mt-3'>
        <ul className='rounded sidebar-list-wrapper'>
          <li className='sidebar-item nav-items'>
            <div className='link-wrapper'>
              <div className='icon-wrapper'>
                <Link to='/dashboard'>
                  <i className='far fa-credit-card '></i>
                </Link>
              </div>
              <div className='text-wrapper'>
                <Link to='/dashboard'>
                  {' '}
                  <span className='text-white hide-text nav-text'>
                    Dashboard{' '}
                  </span>
                </Link>{' '}
              </div>
            </div>
          </li>

          {/* <li
            className='sidebar-item nav-items'
            data-toggle='collapse'
            data-target='#trafic'
          >
            <div className='link-wrapper'>
              <div className='icon-wrapper'>
                <i className='far fa-chart-bar'></i>
              </div>
              <div className='text-wrapper'>
                <span className='hide-text nav-text'>Access + Traffic </span>
              </div>
            </div>
            <div
              className='sidebar-drop-down collapse collapse-data text-white bg-white'
              id='trafic'
            >
              <p className='inner-links-wrapper '>
                <Link to='/allTrafficSites'>
                  <span className='nav-links text-dark'>All Sites</span>
                </Link>
              </p>
              <p className='inner-links-wrapper '>
                <Link to='/addNewTraffic'>
                  <span className='nav-links text-dark'>Add New </span>
                </Link>
              </p>
              <p className='inner-links-wrapper mb-0'>
                <Link to='/trafficStats'>
                  <span className='nav-links text-dark '>Traffic Stats</span>
                </Link>
              </p>
            </div>
          </li> */}
          {/*ALT Feature */}
          {/* <li
            className='sidebar-item nav-items'
            data-toggle='collapse'
            data-target='#alt_text'
          >
            <div className='link-wrapper'>
              <div className='icon-wrapper'>
                <i className='far fa-file-alt'></i>
              </div>
              <div className='text-wrapper'>
                <span className='hide-text nav-text'>Alt Text </span>
              </div>
            </div>
            <div
              className='sidebar-drop-down collapse collapse-data text-white bg-white'
              id='alt_text'
            >
              <p className='inner-links-wrapper '>
                <Link to='/allAltTextSites'>
                  <span className='nav-links text-dark'>All Sites</span>
                </Link>
              </p>
              <p className='inner-links-wrapper '>
                <Link to='/addNewAltText'>
                  <span className='nav-links text-dark'>Add New </span>
                </Link>
              </p>
            </div>
          </li> */}

          {/* All Features Combo */}
          <li
            className='sidebar-item nav-items'
            data-toggle='collapse'
            data-target='#all_feature'
            aria-controls='all_feature'
          >
            <div className='link-wrapper'>
              <div className='icon-wrapper'>
                <i class='fas fa-compress'></i>
              </div>
              <div className='text-wrapper'>
                <span className='hide-text nav-text'>All Services </span>
              </div>
            </div>
            <div
              className='sidebar-drop-down collapse collapse-data text-white bg-white'
              id='all_feature'
            >
              <p className='inner-links-wrapper '>
                <Link to='/allServicesSites'>
                  <span className='nav-links text-dark'>All Sites</span>
                </Link>
              </p>
              <p className='inner-links-wrapper '>
                <Link to='/addNewAllService'>
                  <span className='nav-links text-dark'>Add New </span>
                </Link>
              </p>
              <p className='inner-links-wrapper '>
                <Link to='/allAltTextSites'>
                  <span className='nav-links text-dark'> Alt Tag Sites </span>
                </Link>
              </p>
              <p className='inner-links-wrapper mb-0'>
                <Link to='/trafficStats'>
                  <span className='nav-links text-dark '>Traffic Stats</span>
                </Link>
              </p>
            </div>
          </li>

          {/*Alt Feature */}
          <li className='sidebar-item nav-items'>
            <div className='link-wrapper'>
              <div className='icon-wrapper'>
                <Link to='/paymentplans'>
                  <i className='far fa-credit-card '></i>
                </Link>
              </div>
              <div className='text-wrapper'>
                <Link to='/paymentplans'>
                  <span className='text-white hide-text nav-text'>
                    Pay Now{' '}
                  </span>
                </Link>{' '}
              </div>
            </div>
          </li>

          <li className='sidebar-item nav-items'>
            <div className='link-wrapper'>
              <div className='icon-wrapper'>
                <Link to='/profile'>
                  <i className='fas fa-user '></i>
                </Link>
              </div>
              <div className='text-wrapper'>
                <Link to='/profile'>
                  {' '}
                  <span className='text-white hide-text nav-text'>
                    Profile{' '}
                  </span>
                </Link>{' '}
              </div>
            </div>
          </li>
          <li className='sidebar-item nav-items'>
            <div className='link-wrapper'>
              <div className='icon-wrapper'>
                <Link to='/contactus'>
                  <i className='fas fa-phone-alt'></i>
                </Link>
              </div>
              <div className='text-wrapper'>
                <Link to='/contactus'>
                  <span className='text-white hide-text nav-text'>
                    Contact Us{' '}
                  </span>
                </Link>{' '}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
