import { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useState } from 'react';
import qs from 'qs';

import axios from 'axios';
import { Spinner } from '../Spinner/Loader';

export const ImagesModel = (props) => {
  console.log(props);

  return (
    <div className={classes.backdrop}>
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2> {props.title} </h2>
        </header>
        <div className={classes.ImageModelContent}>
          {props.error === null ? (
            <div
              className={`table-responsive sites-table bg-white ${classes.ImageTable}`}
            >
              <table className='table table-striped text-nowrap'>
                <thead>
                  <tr>
                    <th scope='col'>Image</th>
                    <th scope='col'>Alt Text</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <img src={data.src} className={classes.ModelImage} />
                      </td>
                      <td className={classes.ImageAlt}>{data.alt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h5 className='text-center text-danger'>{props.error}</h5>
          )}
        </div>
        <footer className={`${classes.actions} justify-content-end`}>
          <button className='btn btn-primary mt-2' onClick={props.onConfirm}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export const TheImagesModel = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ImagesModel
          title={props.title}
          data={props.data}
          onConfirm={props.onConfirm}
          error={props.error}
        />,
        document.getElementById('modal')
      )}
    </Fragment>
  );
};
