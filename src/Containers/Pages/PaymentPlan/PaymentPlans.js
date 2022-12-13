import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../Layout/Sidebar/Sidebar';
import { TopNav } from '../../../Components/TopNav/TopNav';
import { useDispatch, useSelector } from 'react-redux';
import './PaymentPlan.css';
import cardImage from '../../../assets/images/card.svg';
import { Spinner } from '../../../Components/Spinner/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { Sites } from '../../Redux/AllSites';
import PaypalButtonWrapper from './PaypalButtonWrapper';
import { NotifyModal } from '../../../Components/Modal/NotifyModel';
export const PaymentPlans = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [payDomain, setPayDomain] = useState('');
  const navbarShow = useSelector((state) => state.navbarToggle.show);
  const allSites = useSelector((state) => state.getAllsites.sites);
  const filteredSites = allSites.filter(
    (data) => data.feature === 'ALL_FEATURES'
  );

  const [anyError, setanyErrorMessage] = useState(false);
  const [choose, setChoose] = useState(false);
  const [feature, setFeature] = useState('Select Feature');
  const [featureValue, setFeatureValue] = useState(feature);

  const getToken = localStorage.getItem('token');
  const user = localStorage.getItem('email');

  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(Sites(user, getToken));
  }, []);
  useEffect(() => {
    setFeatureValue(feature);
  }, [feature]);

  const onclickHandler = (id) => {
    const email = localStorage.getItem('email');
    const getToken = localStorage.getItem('token');
    console.log('This is in paydomain', payDomain);

    if (payDomain === null || payDomain === '') {
      setanyErrorMessage(true);
      return;
    } else {
      const exist = allSites.find(
        (item) => `${item.domain} ${item.message}` === payDomain
      );
      console.log(exist);
      if (exist) {
        if (exist?.subscriptionId) {
          // alert('This Domain subscription already Active');
          setMessage('This Domain subscription already Active');
          setModalShow(true);
          return;
        }
        setChoose(true);
        setanyErrorMessage(false);
      } else {
        setMessage('Invalid Domain');
        setModalShow(true);
        return;
      }
    }
  };
  const handleSelectedDomain = (domain) => {
    setPayDomain(domain);
    setChoose(false);
  };
  const cancelHandler = () => {
    setChoose(false);
    setanyErrorMessage(false);
  };

  const handleConfirm = () => {
    setModalShow(false);
  };

  return (
    <div className='wrapper'>
      <div className='dashboard-wrapper'>
        <div
          className={navbarShow ? 'sidebar px-md-3' : 'sidebar show px-md-3'}
        >
          <Sidebar> </Sidebar>
        </div>
        <div className='right-content'>
          <div className='content'>
            <TopNav />
            {/* =============== Inner Section Start ============= */}

            <div className='container-fluid mt-5'>
              <div className='d-flex align-items-center justify-content-between mb-4'>
                <h1 className='h3 mb-0 text-gray-800'>Pricing Plans</h1>

                <div>
                  <label className='mr-2'>Domain: </label>
                  <select
                    className='custom-select w-auto'
                    placeholder={
                      payDomain != null ? payDomain : 'Please Select Domain'
                    }
                    onChange={(e) => handleSelectedDomain(e.target.value)}
                  >
                    <option value=''>Please Select domain</option>
                    <option value='temporary'>temporary.com</option>
                    {filteredSites &&
                      filteredSites.map((res) => {
                        return (
                          <option value={`${res.domain} ${res.message}`}>
                            {res.domain}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              {/* //========= Error Message ======== */}

              <div
                className='alert alert-warning alert-dismissible fade show'
                role='alert'
                style={{ display: anyError ? 'block' : 'none' }}
              >
                <strong>Please Select Existing Domain </strong>
                <button
                  type='button'
                  className='close'
                  onClick={() => setanyErrorMessage(!anyError)}
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>

              {modalShow && (
                <NotifyModal
                  title={'Response'}
                  message={message}
                  onConfirm={handleConfirm}
                ></NotifyModal>
              )}
              <div className='row justify-content-center'>
                {/* {!choose ? (
                  <div className='col-lg-6 col-md-6 col-9 mb-3 '>
                    <div className=' row '>
                      <div className='card py-3 col-lg-6 col-md-6 col-9 '>
                        <div className='card-body d-flex flex-column'>
                          <input
                            type='radio'
                            id='customRadioInline1'
                            name='customRadioInline1'
                            className='btn-check radio-btn'
                            value='ALT_TEXT'
                            onChange={(e) => setFeature(e.target.value)}
                          />
                          <div className='text-center'>
                            <img
                              src={cardImage}
                              className='img-fluid mb-3  '
                              alt='Websearch'
                              style={{ height: '70px' }}
                            />
                          </div>
                          <div className='card-title   text-center fs-2'>
                            Alt_Text
                          </div>
                        </div>
                      </div>
                      <div className='card py-3 col-lg-6 col-md-6 col-9'>
                        <div className='card-body d-flex flex-column'>
                          <input
                            type='radio'
                            id='customRadioInline1'
                            name='customRadioInline1'
                            className='btn-check radio-btn'
                            value='ALL_FEATURES'
                            onChange={(e) => setFeature(e.target.value)}
                          />
                          <div className='text-center'>
                            <img
                              src={cardImage}
                              className='img-fluid mb-3  '
                              alt='Websearch'
                              style={{ height: '70px' }}
                            />
                          </div>
                          <div className='card-title   text-center fs-2'>
                            ALL_FEATURES
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='card py-3 mt-2 col-lg-6 col-md-6 col-9 relative'>
                      <div className='card-body d-flex flex-column'>
                        <input
                          type='radio'
                          id='customRadioInline1'
                          name='customRadioInline1'
                          className='btn-check radio-btn'
                          value='PLUGIN_ANALYTICS_COMBO'
                          onChange={(e) => setFeature(e.target.value)}
                        />
                        <div className='text-center'>
                          <img
                            src={cardImage}
                            className='img-fluid mb-3  '
                            alt='Websearch'
                            style={{ height: '70px' }}
                          />
                        </div>
                        <div className='card-title   text-center fs-2'>
                          Plugin Analytic Combo
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null} */}
                {/* Card 1 */}
                <div className='col-lg-3 col-md-6 col-9 mb-3'>
                  <div className='card py-4'>
                    <div className='card-body d-flex flex-column'>
                      <div className='text-center'>
                        <img
                          src={cardImage}
                          className='img-fluid  mb-5'
                          alt='Websearch'
                          style={{ height: '100px' }}
                        />
                      </div>
                      <div className='card-title  mb-4 text-center fs-2'>
                        All Feature
                      </div>
                      {!choose ? (
                        <div>
                          <div className='text-center mt-auto mb-4'>
                            <span className='font-weight-bold fs-2 card-price'>
                              $10
                            </span>
                            /month
                          </div>
                          <div className='text-center'>
                            <button
                              type='submit'
                              onClick={onclickHandler}
                              value='submit'
                              className='btn       btn-primary'
                            >
                              Choose Plan
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <PaypalButtonWrapper
                            setChoose={setChoose}
                            setMessage={setMessage}
                            setModalShow={setModalShow}
                            domain={payDomain}
                            feature={'ALL_FEATURES'}
                          />
                          <div className='text-center'>
                            <button
                              onClick={cancelHandler}
                              className='btn btn-warning'
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
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
  );
};
