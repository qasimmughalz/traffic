import { useSelector } from "react-redux"
import { TopNav } from "../../../Components/TopNav/TopNav"
import { Sidebar } from "../../Layout/Sidebar/Sidebar"

export const AllSites = () => {

    const navbarShow = useSelector(state => state.navbarToggle.show)

    return (<div className="wrapper">
        <div className="d-flex">
            <div className="sidebar px-md-3" style={{ display: navbarShow ? 'block' : 'none' }} >
                <Sidebar></Sidebar>
            </div>
            <div className="d-flex " style={{ width: '100%' }}>
                <div className="content" style={{ width: '100%' }}>
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
                                        <th scope="col">Platform</th>
                                        <th scope="col">Plan</th>
                                        <th scope="col">Installation</th>
                                        <th scope="col">Activated</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Expiring</th>
                                        <th scope="col">Upgrade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr scope='row'>
                                        <th scope="row">1</th>
                                        <td>www.hamza.com</td>
                                        <td>Other Plateform</td>
                                        <td>Free</td>
                                        <td><button className="btn-primary btn">Get</button></td>
                                        <td>
                                            <label className="switch">
                                                <input type="checkbox" className="slider-input"/>
                                                    <span className="slider round"></span>
                                            </label>
                                        </td>
                                        <td>-None-</td>
                                        <td>N/A</td>
                                        <td><button className="get-btn">UPGRADE</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>www.hamza.com</td>
                                        <td>Other Plateform</td>
                                        <td>Free</td>
                                        <td><button className="btn-primary btn">Get</button></td>
                                        <td>
                                            <label className="switch">
                                                <input type="checkbox" className="slider-input"/>
                                                    <span className="slider round"></span>
                                            </label>
                                        </td>
                                        <td>-None-</td>
                                        <td>N/A</td>
                                        <td><button className="get-btn">UPGRADE</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>www.hamza.com</td>
                                        <td>Other Plateform</td>
                                        <td>Free</td>
                                        <td><button className="btn-primary btn">Get</button></td>
                                        <td>
                                            <label className="switch">
                                                <input type="checkbox" className="slider-input"/>
                                                    <span className="slider round"></span>
                                            </label>
                                        </td>
                                        <td>-None-</td>
                                        <td>N/A</td>
                                        <td><button className="get-btn">UPGRADE</button></td>
                                    </tr>
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