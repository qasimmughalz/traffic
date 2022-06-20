import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Spinner } from "../../../Components/Spinner/Loader"
import { TopNav } from "../../../Components/TopNav/TopNav"
import { Sidebar } from "../../Layout/Sidebar/Sidebar"
import { Sites } from "../../Redux/AllSites"
export const AllSites = () => {

    let tempCounter = 1
    const navbarShow = useSelector(state => state.navbarToggle.show)
    const allSites = useSelector(state => state.getAllsites.sites)
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(Sites());
    })

    return (<div className="wrapper">
        <div className="dashboard-wrapper">
            <div className={navbarShow ? 'sidebar px-md-3' : 'sidebar show px-md-3'} >
                <Sidebar> </Sidebar>
            </div>
            <div className="right-content">
                <div className="content">

                    <TopNav />
                    {/* =============== Inner Section Start ============= */}

                    <div className="container-fluid ">

                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">All Site</h1>
                        </div>


                        <div className="table-responsive sites-table bg-white">
                            
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Domain Name</th>
                                        <th scope="col">Message</th>
                                        <th scope="col">Plan</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Expiring</th>
                                        <th scope="col">Installation</th>
                                        <th scope="col">Upgrade</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {allSites.length > 0 ? (allSites.map((data)=>{
                                    return (<tr scope='row'>
                                    <th scope="row">{tempCounter++}</th>
                                    <td>{data.domain}</td>
                                    <td>{data.message}</td>
                                    <td>Free</td>
                                    <td>-None-</td>
                                    <td>{data.trialEndDate}</td>
                                    <td className="text-center"><button className="btn-primary btn">Get</button></td>
                                    <td><button className="btn btn-success">UPGRADE</button></td>
                                </tr>)
                                })) :  <Spinner color='#1f38fa'/> }
                                    
                                    
                                </tbody>
                            </table>
                        </div>


                    </div>

                    {/* =============== Inner Section End ============= */}
                </div>
            </div>
        </div>
    </div>


    )
}