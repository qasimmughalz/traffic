import { useSelector } from "react-redux"
import { TopNav } from "../../../Components/TopNav/TopNav"
import { Sidebar } from "../../Layout/Sidebar/Sidebar"
import { useFormik } from "formik"
import { Spinner } from "../../../Components/Spinner/Loader"
import { useState } from "react"
import sample from '../../../assets/images/example.PNG'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';

// import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';





export const AddNewSite = () => {

    SyntaxHighlighter.registerLanguage('jsx', jsx);

    const [isLoading, setLoading] = useState(false)
    // const [nextStep, SetnextStep] = useState(false)


    const formik = useFormik({
        initialValues: {
            url: '',
            Phone: ''
        }
    })

    const navbarShow = useSelector(state => state.navbarToggle.show)

    return (<div className="wrapper">
        <div className="dashboard-wrapper">
            <div className={navbarShow ? 'sidebar px-md-3' : 'sidebar show px-md-3'} >
                <Sidebar> </Sidebar>
            </div>
            <div className="right-content">
                <div className="content">

                    {/* =============== Inner Section Start ============= */}

                    <div className="container-fluid">

                        <div className="row align-items-center">
                            <div className="col-md-8">

                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Add New Site</h1>
                                </div>


                                <div className="col-md-8 m-auto">
                                    <div className="row justify-content-start ">

                                        <form onSubmit={formik.handleSubmit} className='w-100'>


                                            <div className='form-group my-3 ' >
                                                <label > Insert Your Domain</label>
                                                <input type='text'
                                                    name='url'
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.url} className='form-control' placeholder='www.example.com'></input>
                                                {formik.touched.Name && formik.errors.Name ? <p className='text-danger mt-1'>{formik.errors.Name}</p> : null}
                                            </div>


                                            <div>

                                                {/* <SyntaxHighlighter language="javascript" >

                                            {window.interdeal = {
                                            sitekey: "c15d317d2c34e0380270a3ddec661159",
                                            Position: "Left",
                                            Menulang: "EN",
                                            domains: {
                                                "js": "https://cdn.equalweb.com/",
                                                "acc": "https://access.equalweb.com/"
                                            }
                                        }
                                        }

                                    </SyntaxHighlighter> */}


                                            </div>




                                            <div className='form-group my-3 text-center'>
                                                <button className='btn btn-form btn-primary ' type='submit' style={{ width: '100%' }}> {isLoading ? <Spinner /> : `Add`}  </button>
                                            </div>
                                        </form>


                                    </div>
                                </div>


                            </div>
                            <div className="col-md-4 text-center">
                                <p>Widget Page Display Example </p>

                                <h3 className="my-3">{formik.values.url === '' ? 'example' : formik.values.url}</h3>
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