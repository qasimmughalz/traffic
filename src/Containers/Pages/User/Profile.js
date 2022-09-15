
import axios from "axios"
import './Profile.css'
import { useEffect, useState } from "react"
import { Sidebar } from "../../Layout/Sidebar/Sidebar"
import { TopNav } from "../../../Components/TopNav/TopNav"
import { useSelector } from "react-redux"
import { Spinner } from "../../../Components/Spinner/Loader"
import { useParams } from "react-router-dom"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { backend } from "../../../Components/backendURL"


export const Profile = () => {

    const currEmail = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const navbarShow = useSelector(state => state.navbarToggle.show)
    const [userProfile, setUserProfile] = useState({})
    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPhoneNo, setInputPhoneNo] = useState('')
    const [anySuccessT, setanySuccessT] = useState(false)
    const [anySuccessP, setanySuccessP] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await axios({
                method: 'GET',
                url: `${backend}/api/getUser/${currEmail}`,
                data: {},
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }).then((res) => {
                setIsLoading(false)
                setUserProfile(res.data)

            }).catch(error => {
                console.log("catch", error)
                setIsLoading(false)
            })
        }
        fetchData()
    }, [])
    let namenewlocal, emailnewlocal, phoneNonewlocal;
    const handleSubmit = (e) => {
        e.preventDefault()
        inputName === '' ? namenewlocal = userProfile.Name : namenewlocal = inputName;
        inputEmail === '' ? emailnewlocal = userProfile.Email : emailnewlocal = inputEmail;
        inputPhoneNo === '' ? phoneNonewlocal = userProfile.PhoneNo : phoneNonewlocal = inputPhoneNo;

        axios({
            method: 'POST',
            url: `http://localhost:5000/api/changeUserDetails/${currEmail}`,
            data: { namenew: namenewlocal, emailnew: emailnewlocal, phoneNonew: phoneNonewlocal },
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then((res) => {
            console.log("res", res);
            if (res.status === 200) {
                console.log("res", res);
                localStorage.setItem('email', emailnewlocal)
                setanySuccessT(true)
            }
        }).catch((e) => {
            setanySuccessT(false)
            console.log("err!!", e);
        })

    }
    const formik = useFormik({
        initialValues: {
            PasswordNew: '',
            ConfirmPass: ''
        },
        validationSchema: Yup.object({
            PasswordNew: Yup.string().min(8, 'Minimum 8 Characters long').required('Required'),
            ConfirmPass: Yup.string().min(8, 'Minimum 8 Characters long').oneOf([Yup.ref('PasswordNew')], 'Password did not match').required('Required'),
        }),
        onSubmit: values => {
            axios({
                method: 'POST',
                url: 'http://localhost:5000/api/changePassword',
                data: {passwordOld: values.PasswordOld, passwordNew: values.PasswordNew ,email: localStorage.getItem('email')},
                headers: {
                    "authorization": `Bearer ${token}`
                }
            }).then((res) => {
                if (res.status === 200) {
                    setanySuccessP(true)
                    setErrorMessage('New password have been successfully updated')
                }                
            }).catch((e) => {
                console.log("catch from pass",e)
                e.response.data.error == undefined ? setErrorMessage(e.message) : setErrorMessage(e.response.data.error)
                setanySuccessP(true)
            })
        }
    })

    return (
        <div className="wrapper">
            <div className="dashboard-wrapper">
                <div className={navbarShow ? 'sidebar px-md-3' : 'sidebar show px-md-3'} >
                    <Sidebar> </Sidebar>
                </div>
                <div className="right-content">
                    <div className="content">

                        <TopNav />
                        {/* =============== Inner Section Start ============= */}

                        <div className="container-fluid mt-5">


                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                
                            </div>
                            <div className="row ml-4 ">

                                {isLoading ? <Spinner color='#1f38fa'></Spinner> :
                                    (<div className="col-md-8  ml-4 ">
                                        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: anySuccessT ? 'block' : 'none' }}>
                                            <strong> Your details have been successfully updated</strong>
                                            <button type="button" className="close" onClick={() => setanySuccessT(!anySuccessT)} aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ display: anySuccessP ? 'block' : 'none' }}>
                                            <strong>{errorMessage}</strong>
                                            <button type="button" className="close" onClick={() => setanySuccessP(!anySuccessP)} aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="row text-muted">
                                            

                                            <div className="container m-auto">

                                                <h1>edit prifile</h1>
                                                {/* <img alt='user' src={user} className="avatar "></img> */}
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row mt-5">
                                                        <div className="col-5">
                                                            <label for="name">name</label><br></br>
                                                            <input type="text" id="name" name="namenew" onChange={(e) => setInputName(e.target.value)} defaultValue={userProfile.Name} className="fromsize"></input>
                                                        </div>
                                                        <div className="col-5">
                                                            <label for="phone">phone</label><br></br>
                                                            <input type="text" id="phone" name="phoneNonew" minLength={9} onChange={(e) => setInputPhoneNo(e.target.value)} defaultValue={userProfile.PhoneNo} className="fromsize"></input>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-5">
                                                        <div className="col-10">
                                                            <label for="email">email</label><br></br>
                                                            <input type="email" id="email" name="emailnew" onChange={(e) => setInputEmail(e.target.value)} defaultValue={userProfile.Email} className="fromsize"></input>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-2">
                                                        <div className='col-10 form-group my-3 text-center'>
                                                            <button className='btn btn-form btn-primary' value='submit' type='submit' style={{ width: '100%' }}> {isLoading ? <Spinner /> : `change`}  </button>
                                                        </div>
                                                    </div>
                                                </form>
                                                <form onSubmit={formik.handleSubmit}>
                                                    <div className="row mt-5">
                                                        <div className='col-10 '>
                                                            <label >old Password</label>
                                                            <input type='password'
                                                                name='PasswordOld'
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.PasswordOld} className='fromsize' placeholder='Enter password'></input>
                                                            {/* {formik.touched.Password && formik.errors.Password ? <p className='text-danger mt-1'>{formik.errors.Password}</p> : null} */}
                                                        </div>
                                                        </div>
                                                        <div className="row mt-5">
                                                        <div className='col-5 '>
                                                            <label >new Password</label>
                                                            <input type='password'
                                                                name='PasswordNew'
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.PasswordNew} className='fromsize' placeholder='Enter password'></input>
                                                            {formik.touched.PasswordNew && formik.errors.PasswordNew ? <p className='text-danger mt-1'>{formik.errors.PasswordNew}</p> : null}
                                                        </div>

                                                        <div className='col-5 '>
                                                            <label >Confirm Password</label>
                                                            <input type='password'
                                                                name='ConfirmPass'
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.ConfirmPass} className='fromsize' placeholder='Confirm Password'></input>
                                                            {formik.touched.ConfirmPass && formik.errors.ConfirmPass ? <p className='text-danger mt-1'>{formik.errors.ConfirmPass}</p> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row mt-2">
                                                    <div className='col-10 form-group my-3 text-center'>
                                                        <button className='btn btn-form btn-primary ' type='submit' style={{ width: '100%' }}> {isLoading ? <Spinner /> : `change`}  </button>
                                                    </div>
                                                    </div>
                                                </form>
                                               
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                        {/* =============== Inner Section End ============= */}
                    </div>
                </div>
            </div>
        </div>


    )
}