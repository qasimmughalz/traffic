import { Link } from 'react-router-dom'
import './Sidebar.css'
import logo from '../../../assets/images/logo-small.jpg'

export const Sidebar = () => {


    return (
        <div className="" >
        <div className="align-self-start text-center mt-md-4 mt-3">
            <img style={{ height: '80px' , width:'90%' }} alt='logo-img'  src={logo} className="mt-3 rounded"></img>
            <h5 className='mt-2 text-white'>Welcome, <br></br> Ram</h5>
        </div>
        <hr></hr>
        <div className="mt-3">
            <ul className=' rounded pl-4'>

                <li className="nav-items font-weight-bold text-white">
                  
                    <div className='d-flex justify-content-between text-left' style={{width:'60%'}}>
                        <div> <i className="far fa-credit-card "></i></div>
                        <div>  <Link to='/dashboard'> <span className='text-white'>   Dashboard </span></Link> </div>   
                    </div>
                 
                </li>


                <li className="nav-items text-white font-weight-bold" data-toggle="collapse" data-target="#website">
                    <div className='d-flex justify-content-between w-50 text-left'>
                        <div>  <i className="fas fa-globe pr-1"></i></div>
                        <div> <span>Website</span> </div>   
                    </div>
                  
                    <div className="collapse collapse-data text-white bg-white rounded" id='website'>
                        <div className="font-weight-normal">
                        <Link to='/allsites'> <span className='nav-links text-dark'>All Websites</span></Link>  </div>
                        <div className="font-weight-normal">
                            <Link to='/addnew'>
                                <span className='nav-links text-dark'>Add New Site</span>
                            </Link>
                        </div>
                    </div>
                </li>

                    
                
                <li className="nav-items font-weight-bold text-white">
                  
                  <div className='d-flex justify-content-between text-left' style={{width:'44%'}}>
                      <div> <i className="fas fa-user  "></i></div>
                      <div>  <Link to='/dashboard'> <span className='text-white'>Profile </span></Link> </div>   
                  </div>
                </li>
               


                <li className="nav-items font-weight-bold text-white">
                  
                  <div className='d-flex justify-content-between text-left' style={{width:'52%'}}>
                      <div> <i className="far fa-credit-card "></i></div>
                      <div>  <Link to='/paymentplans'> <span className='text-white'>Payment </span></Link> </div>   
                  </div>
                </li>

                <li className="nav-items font-weight-bold text-white">
                  
                  <div className='d-flex justify-content-between text-left' style={{width:'52%'}}>
                      <div> <i className="fas fa-phone-alt"></i></div>
                      <div>  <Link to='/dashboard'> <span className='text-white'>Support </span></Link> </div>   
                  </div>
                </li>
               
            </ul>

        </div>

    </div>
    )
}                     