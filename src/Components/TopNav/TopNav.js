import { useDispatch } from "react-redux"
import { TriggerToggle } from "../../Containers/Redux/NavbarToggle"
import { logoutHandler } from "../../Containers/Redux/UserAuth"


export const TopNav = ()=>{

    const dispatch = useDispatch()


    return(<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <button className="btn btn-link rounded-circle mr-3" onClick={()=>dispatch(TriggerToggle()) }>
        <i className="fa fa-bars"></i>
    </button>
    
    <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        <button className="btn nav-items font-weight-bold text-white" onClick={()=> dispatch(logoutHandler())}>
              <span className='text-danger'> Logout </span>
        </button>
    </ul>
</nav>)
}