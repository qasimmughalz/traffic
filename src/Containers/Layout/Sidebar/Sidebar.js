import { Link } from 'react-router-dom'
import './Sidebar.css'
import logo from '../../../assets/images/logo-small.jpg'
import { useEffect } from 'react'

export const Sidebar = () => {

    useEffect(()=>{
        
    })


    return (
        <>
            <div className="align-self-start text-center mt-md-4 mt-5">
                <img alt='logo-img' style={{width:'90%'}}  src={logo} className="sidebar-logo"></img>
                <h5 className='mt-2 text-white'>Welcome, <br></br> Ram</h5>
            </div>
            <hr></hr>
            <div className="mt-3">
                <ul className='rounded sidebar-list-wrapper'>
                    <li className="sidebar-item nav-items">
                        <div className='link-wrapper'>
                            <div className='icon-wrapper'><i className="far fa-credit-card "></i></div>
                            <div className='text-wrapper'><Link to='/dashboard'> <span className='text-white hide-text nav-text'>Dashboard </span></Link> </div>   
                        </div>                     
                    </li>
                    <li className="sidebar-item nav-items" data-toggle="collapse" data-target="#website">
                        <div className='link-wrapper'>
                            <div className='icon-wrapper'><i className="fas fa-globe pr-1"></i></div>
                            <div className='text-wrapper'><span className='hide-text nav-text'>Website</span></div>   
                        </div>
                        <div className="sidebar-drop-down collapse collapse-data text-white bg-white" id='website'>
                            <p className="inner-links-wrapper">
                              <Link to='/allsites'>
                                  <span className='nav-links text-dark'>All Websites</span>
                              </Link>
                            </p>
                            <p className="inner-links-wrapper mb-0">
                                <Link to='/addnew'>
                                    <span className='nav-links text-dark'>Add New Site</span>
                                </Link>
                            </p>
                        </div>
                    </li>
                    <li className="sidebar-item nav-items">
                      <div className='link-wrapper'>
                          <div className='icon-wrapper'><i className="far fa-credit-card "></i></div>
                          <div className='text-wrapper'><Link to='/paymentplans'><span className='text-white hide-text nav-text'>Payment </span></Link> </div>   
                      </div>
                    </li>
                    <li className="sidebar-item nav-items">
                      <div className='link-wrapper'>
                          <div className='icon-wrapper'><i className="fas fa-user "></i></div>
                          <div className='text-wrapper'><Link to='/profile'> <span className='text-white hide-text nav-text'>Profile </span></Link> </div>   
                      </div>
                    </li>
                    <li className="sidebar-item nav-items">          
                      <div className='link-wrapper'>
                          <div className='icon-wrapper'><i className="fas fa-phone-alt"></i></div>
                          <div className='text-wrapper'><Link to='/contactus'><span className='text-white hide-text nav-text'>Contact Us </span></Link> </div>   
                      </div>
                    </li>
                </ul>

            </div>

        </>
    )
}                     