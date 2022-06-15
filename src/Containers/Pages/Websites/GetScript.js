import { useDispatch, useSelector } from "react-redux"
import { TopNav } from "../../../Components/TopNav/TopNav"
import { Sidebar } from "../../Layout/Sidebar/Sidebar"
import { useFormik } from "formik"
import { Spinner } from "../../../Components/Spinner/Loader"
import { useState } from "react"
import axios from "axios"
import sample from '../../../assets/images/example.PNG'
import * as Yup from 'yup'
import { useNavigate, useParams } from "react-router-dom"
export const GetScript = ()=>{

    const navbarShow = useSelector(state => state.navbarToggle.show)
    const userEmail = localStorage.getItem('email')
    console.log("current user email", userEmail)

    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)
    const [anyError, setanyErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const domainName = useParams()
    console.log("domainName", domainName)

    const obj = `<!-- Accessibility Code for "ahmad.com" --> <script> window.interdeal = { "sitekey": "a02ed6d4784f2af01462cea69461238d", "Position": "Right", "Menulang": "EN", "domains": { "js": "https://cdn.equalweb.com/", "acc": "https://access.equalweb.com/" }, "btnStyle": { "vPosition": [ "80%", null ], "scale": [ "0.8", "0.8" ], "icon": { "type": 7, "shape": "semicircle", "outline": false } } }; (function(doc, head, body){ var coreCall = doc.createElement('script'); coreCall.src = 'https://cdn.equalweb.com/core/4.3.2/accessibility.js'; coreCall.defer = true; coreCall.integrity = 'sha512-73oZhkzO+7F1r8AXT5BtChHyVvx8GMuB3Pokx6jdnP5Lw7xyBUO4L5KKi7BwqovhoqOWjNmkah1iCiMniyt6Kw=='; coreCall.crossOrigin = 'anonymous'; coreCall.setAttribute('data-cfasync', true ); body? body.appendChild(coreCall) : head.appendChild(coreCall); })(document, document.head, document.body); </script>`

    return(<div className="wrapper">
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
                            <div className="col-md-8 m-auto">

                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Your Code for is here.</h1>

                                   <p>Please add this code in the <code>`<head></head>`</code> section f your application.</p>


                                </div>

                                {/* //========= Error Message ======== */}

                                <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{ display: anyError ? 'block' : 'none' }}>
                                    <strong>{errorMessage}</strong>
                                    <button type="button" className="close" onClick={() => setanyErrorMessage(!anyError)} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>


                                <div className="rounded bg-white p-3  text-dark"  >
                                    <pre className="py-5">
                                        <code className="text-dark">{obj}</code>
                                    </pre>

                                </div>
                                    <div className='col-md-4 m-auto my-3 text-center '>
                                        <form action={newDomainPayment}>
                                            <button className='btn btn-form btn-primary my-4' value='submit' type='submit' style={{ width: '100%' }}> {isLoading ? <Spinner /> : `Pay Now`}  </button>
                                        </form>

                                        OR <br></br>
                                        <a href="/allsites">Proceed with 7 Day FREE Trial</a>
                                    </div>
                            </div>


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
    </div>)
}