import React from 'react';
import classes from './trafficStats.module.css';

const TrafficTable = ({ currentItems, showEventsVideo }) => {
  return (
    <div className='table-responsive sites-table bg-white mt-1'>
      <table className={`${classes.table} table text-center`}>
        <thead>
          <tr>
            <th scope='col'>IP Address</th>
            <th scope='col'>TimeZone</th>
            <th scope='col'>Clicks</th>
            <th scope='col'>First Click</th>
            <th scope='col'>Last Click</th>
            <th scope='col'>Keypress</th>
            <th scope='col'>Mouse </th>
            <th scope='col'>Scroll</th>
            <th scope='col'>Area</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((data) => {
              return (
                <tr scope='row' style={{ height: '70px' }} key={data.key}>
                  <td>{data.ipAddress}</td>
                  <td>{data.timezone}</td>
                  <td>{data.totalClicks}</td>
                  <td>
                    <p className='m-0 text-muted' style={{ width: '100px' }}>
                      {data.firstClick && data.firstClick.split('T')[0]}
                    </p>
                    <p className='m-0' style={{ width: '100px' }}>
                      {data.firstClick &&
                        data.firstClick?.split('T')[1].split('.')[0]}
                    </p>
                  </td>
                  <td style={{ wordWrap: 'normal' }}>
                    <p className='m-0 text-muted' style={{ width: '100px' }}>
                      {data.lastClick && data.lastClick.split('T')[0]}
                    </p>
                    <p className='m-0' style={{ width: '100px' }}>
                      {data.lastClick &&
                        data.lastClick.split('T')[1].split('.')[0]}
                    </p>
                  </td>
                  <td>{data.totalkeyPress}</td>
                  <td>{data.totalMouseMove}</td>
                  <td>{data.totalScroll}</td>
                  <td>
                    <i className='fas fa-map-marker-alt text-primary pointer'></i>
                  </td>
                  {data.sessionEvents.length > 2 ? (
                    <td>
                      <i
                        className='fas fa-video text-primary pointer'
                        onClick={() => showEventsVideo(data.sessionEvents)}
                      ></i>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TrafficTable;
