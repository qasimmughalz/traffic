import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import '../registration.css';
import logo from '../../../../assets/images/logo-small.jpg';
import { backend } from '../../../../Components/backendURL';
import { Spinner } from '../../../../Components/Spinner/Loader';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [anyError, setanyErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required('Password  is required'),
      confirmNewPassword: Yup.string()
        .required('Confirm Password  is required')
        .when('newPassword', {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref('newPassword')],
            'Both password need to be the same'
          ),
        }),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios({
        method: 'POST',
        url: `${backend}/api/new-password`,
        data: {
          newPassword: values.newPassword,
          resettoken: id,
        },
      })
        .then((res) => {
          setLoading(false);

          setanyErrorMessage(true);
          setErrorMessage(res.data.message);
          navigate('/login');
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
                <label>New Password</label>
                <input
                  type='password'
                  name='newPassword'
                  value={formik.values.newPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className='form-control'
                  placeholder='Enter new password'
                ></input>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <p className='text-danger mt-1'>
                    {formik.errors.newPassword}
                  </p>
                ) : null}
              </div>
              <div className='form-group my-3 '>
                <label>Confirm New Password</label>
                <input
                  type='password'
                  name='confirmNewPassword'
                  value={formik.values.confirmNewPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className='form-control'
                  placeholder='Confirm new password'
                ></input>
                {formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword ? (
                  <p className='text-danger mt-1'>
                    {formik.errors.confirmNewPassword}
                  </p>
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

export default ResetPassword;
