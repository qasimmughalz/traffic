import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import '../registration.css';
import logo from '../../../../assets/images/logo-small.jpg';
import { backend } from '../../../../Components/backendURL';
import { Spinner } from '../../../../Components/Spinner/Loader';

const ForgotPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [anyError, setanyErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      Email: '',
    },
    validationSchema: Yup.object({
      Email: Yup.string().email().required('Required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios({
        method: 'POST',
        url: `${backend}/api/forgot-password`,
        data: {
          email: values.Email,
        },
      })
        .then((res) => {
          setLoading(false);
          setanyErrorMessage(true);
          setErrorMessage(res.data.message);
        })
        .catch((e) => {
          setLoading(false);
          setanyErrorMessage(true);
          e.response.data == undefined
            ? setErrorMessage(e.response.data.error)
            : setErrorMessage(e.response.data.error);
        });
    },
  });
  return (
    <div className='container-fluid p-0 '>
      <div className='row align-items-center text-center justify-content-between p-0 m-0 SignUp-form'>
        <div className='col-lg-8 text-left mx-auto my-4 '>
          <div className='col-md-8 m-auto bg-white px-md-3 rounded'>
            <div className='text-center pt-5'>
              <img
                style={{ height: '80px' }}
                src={logo}
                alt='logo'
                className='img-fluid '
              ></img>
              {/* <h3 className='heading-two'>Login to Your Account</h3> */}
            </div>
            {/* //========= Error Message ======== */}
            <div
              className='alert alert-warning alert-dismissible fade show'
              role='alert'
              style={{ display: anyError ? 'block' : 'none' }}
            >
              <strong>{errorMessage}</strong>
              <button
                type='button'
                className='close'
                onClick={() => setanyErrorMessage(!anyError)}
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className='form-group my-3 '>
                <label>Email</label>
                <input
                  type='email'
                  name='Email'
                  value={formik.values.Email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className='form-control'
                  placeholder='Enter email'
                ></input>
                {formik.touched.Email && formik.errors.Email ? (
                  <p className='text-danger mt-1'>{formik.errors.Email}</p>
                ) : null}
              </div>

              <div className='form-group my-3 text-center'>
                <button
                  className='btn btn-form btn-primary '
                  type='submit'
                  style={{ width: '100%', marginBottom: '2rem' }}
                >
                  {' '}
                  {isLoading ? <Spinner /> : `Submit`}{' '}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
