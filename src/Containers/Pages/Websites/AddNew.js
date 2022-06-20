import { useDispatch, useSelector } from "react-redux"
import { TopNav } from "../../../Components/TopNav/TopNav"
import { Sidebar } from "../../Layout/Sidebar/Sidebar"
import { useFormik } from "formik"
import { Spinner } from "../../../Components/Spinner/Loader"
import { useState } from "react"
import axios from "axios"
import sample from '../../../assets/images/example.PNG'
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"



export const AddNewSite = () => {

    const [newScript, setNewScript] = useState('')
    const [showScript, setShowScript] = useState(false)
    const navbarShow = useSelector(state => state.navbarToggle.show)
    const userEmail = localStorage.getItem('email')
    const getToken = localStorage.getItem('token')
    console.log("current user email", userEmail)

    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)
    const [anyError, setanyErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const formik = useFormik({
        initialValues: {
            domain: '',
        },
        validationSchema: Yup.object({
            domain: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            console.log("Values from the Form ", values)
            setLoading(true)
            axios({
                method: 'POST',
                url: 'https://plugin-nodejs-server.herokuapp.com/api/addNewSite',
                data: { email: userEmail, domain: values.domain, language: 'English', platform: 'WordPress' },
                headers: {
                    "authorization": `Bearer ${getToken}`
                }
            }).then((res) => {
                setLoading(false);
                console.log("check Domain Add New Response=========", res.data)
                setNewScript(res.data)
                console.log("Response Status", res.status)
                if (res.status === 200) {
                    localStorage.setItem('newDomain', values.domain)
                    setShowScript(true)
                }
            }).catch((e) => {
                setLoading(false)
                setanyErrorMessage(true)
                setErrorMessage(e.response)
            })
        }
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

                    <div className="container-fluid">

                        <div className="row align-items-start">


                        {!showScript ?
                            (<div className="col-md-8 m-auto">

                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Add New Site</h1>
                                </div>

                                {/* //========= Error Message ======== */}

                                <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{ display: anyError ? 'block' : 'none' }}>
                                    <strong>{errorMessage}</strong>
                                    <button type="button" className="close" onClick={() => setanyErrorMessage(!anyError)} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>


                                <div className="col-md-8 m-auto">
                                    <div className="row ">
                                        <form onSubmit={formik.handleSubmit} className='w-100'>

                                            <div className='form-group my-3 ' >
                                                <label > Insert Your Domain</label>
                                                <input type='text'
                                                    name='domain'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.domain} className='form-control' placeholder='www.example.com'></input>
                                                {formik.touched.domain && formik.errors.domain ? <p className='text-danger mt-1'>{formik.errors.domain}</p> : null}
                                            </div>

                                            <div className='form-group my-3 text-center'>
                                                <button className='btn btn-form btn-primary' value='submit' type='submit' style={{ width: '100%' }}> {isLoading ? <Spinner /> : `Add`}  </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>) :  (<div className="col-md-8 m-auto">

                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <div>
                                        <h1 className="h3 mb-0 text-gray-800">Your Code for is here.</h1>
                                        <br></br>
                                        <p>Please add this code in the <span className="font-weight-bold">&lt;head&gt;</span> or <span className="font-weight-bold">&lt;script&gt;</span>  section of your Website.</p>
                                    </div>

                                </div>



                                <div className="rounded bg-white p-3  text-dark"  >
                                    <pre className="py-5">
                                        <code className="text-dark">{newScript}</code>
                                    </pre>
                                </div>
                                <div className='col-md-4 m-auto my-3 text-center '>
                                    <Link to='/paymentplans'>
                                        <button className='btn btn-form btn-primary my-4' value='submit' type='submit' style={{ width: '100%' }}> Pay Now  </button>
                                    </Link>
                                    OR <br></br>
                                    <Link to='/allsites'>
                                        <p >Proceed with 7 Day FREE Trial</p>
                                    </Link>
                                </div>
                            </div> )}


                            <div className="col-md-4 text-center mt-5">
                                <p>Widget Page Display Example </p>

                                <p className="my-3" >{formik.values.domain === '' ? 'example' : formik.values.domain}</p>
                                <img src={sample} alt="Sample Image" />
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