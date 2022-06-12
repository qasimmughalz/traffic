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
import { loginHandler } from "../../Redux/UserAuth"




export const AddNewSite = () => {

    const navbarShow = useSelector(state => state.navbarToggle.show)
    const userEmail = useSelector((state)=> state.UserAuth.Useremail)
    console.log("Email in Redux", userEmail)

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                data: { email: userEmail, domain: values.domain , language : 'English', platform: 'WordPress'}
            }).then((res) => {
                setLoading(false);
                console.log("check Domain Response=========", res)
                
            }).catch((e) => {
                setLoading(false)
                setanyErrorMessage(true)
                setErrorMessage(e.response.data.error)
            })
        }
    })


    const obj = ` <!-- Accessibility Code for "${formik.values.domain}" -->    <script>
    (function(doc, head, body){
        var coreCall             = doc.createElement('script');
        coreCall.src             = 'https://iqasimmughal.com/test.js';
        coreCall.defer           = true;
        coreCall.integrity       = 'sha512-73oZhkzO+7F1r8AXT5BtChHyVvx8GMuB3Pokx6jdnP5Lw7xyBUO4L5KKi7BwqovhoqOWjNmkah1iCiMniyt6Kw==';
        coreCall.crossOrigin     = 'anonymous';
        coreCall.setAttribute('data-cfasync', true );
        body? body.appendChild(coreCall) : head.appendChild(coreCall);
    })(document, document.head, document.body);
    </script>`;


    return (<div className="wrapper">
        <div className="d-flex">
            <div className="sidebar px-md-3" style={{ display: navbarShow ? 'block' : 'none' }} >
                <Sidebar></Sidebar>
            </div>
            <div className="d-flex align-items-start" style={{ width: '100%' }}>
                <div className="content" style={{ width: '100%' }}>
                    <TopNav />
                    {/* =============== Inner Section Start ============= */}

                    <div className="container-fluid">

                        <div className="row align-items-start">
                            <div className="col-md-8 m-auto">

                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Add New Site</h1>
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
                                                {formik.touched.Name && formik.errors.Name ? <p className='text-danger mt-1'>{formik.errors.Name}</p> : null}
                                            </div>



                                            <div className='form-group my-3 text-center'>
                                                <button className='btn btn-form btn-primary' value='submit' type='submit' style={{ width: '100%' }}> {isLoading ? <Spinner /> : `Add`}  </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>


                                {/* <div className="rounded  text-dark"  >
                                        <pre>
                                            <code className="text-dark">{obj}</code>
                                        </pre>
                                </div> */}


                            </div>
                            <div className="col-md-4 text-center">
                                <p>Widget Page Display Example </p>

                                <h3 className="my-3" style={{overflowX:'scroll', overflowY:'none'}}>{formik.values.domain === '' ? 'example' : formik.values.domain}</h3>
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