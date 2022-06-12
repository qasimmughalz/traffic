import { useSelector } from "react-redux"
import { TopNav } from "../../Components/TopNav/TopNav"
import { Sidebar } from "../Layout/Sidebar/Sidebar"




export const Dashboard = ()=>{

    const navbarShow = useSelector(state => state.navbarToggle.show)
    const check = useSelector(state => state.UserAuth.isLoggedIn)

    return( <div className="wrapper">

    <div className="d-flex">
        <div className="sidebar px-md-3" style={{ display: navbarShow ? 'block' : 'none' }} >
            <Sidebar></Sidebar> 
        </div>
        <div className="d-flex " style={{ width: '100%' }}>
            <div className="content" style={{ width: '100%' }}>
                <TopNav />  
                {/* =============== Inner Section Start ============= */}

                <div className="container-fluid">

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Dashboard value : {check}</h1>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card  shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Total Sites</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">2</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
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
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Activations
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">3</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
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
                                                Payments</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">Nill</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
</div>

    
    )
}