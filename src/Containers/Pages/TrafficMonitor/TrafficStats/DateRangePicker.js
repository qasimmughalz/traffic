import React, { useState } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const DateRangePicker = ({ setDatesArray }) => {
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState(null);
  const [hackValue, setHackValue] = useState(null);
  const [value, setValue] = useState(null);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }

    const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([null, null]);
      setDates([null, null]);
    } else {
      setHackValue(null);
    }
  };

  /* filter original arrays data on date change */
  //   const dateChangeHandler = (dates, dateStrings) => {
  //     const originalD = [...originalDates];
  //     const originalV = [...originalValues];
  //     if (dates) {
  //       let start = dates[0].clone().startOf('day');
  //       let end = dates[1].clone().endOf('day');
  //       let localD = [];
  //       let localV = [];

  //       while (start <= end) {
  //         const dateIndex = originalD.indexOf(moment(start).format('YYYY-MM-DD'));
  //         if (dateIndex !== -1) {
  //           localD.push(originalD[dateIndex]);
  //           localV.push(originalV[dateIndex]);
  //         }
  //         start.add(1, 'days');
  //       }
  //       setDatesArray(localD);
  //       setValuesArray(localV);
  //     } else {
  //       setDatesArray(originalD);
  //       setValuesArray(originalV);

  //     }
  //   };
  return (
    <div>
      <RangePicker
        ranges={{
          Today: [moment().startOf('day'), moment().endOf('day')],
          Yesterday: [
            moment().subtract(1, 'days').startOf('day'),
            moment().subtract(1, 'days').endOf('day'),
          ],
          'This Week': [moment().startOf('week'), moment().endOf('week')],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Week': [
            moment().subtract(1, 'weeks').startOf('week'),
            moment().subtract(1, 'weeks').endOf('week'),
          ],
          'Last Month': [
            moment().subtract(1, 'months').startOf('month'),
            moment().subtract(1, 'months').endOf('month'),
          ],
        }}
        value={hackValue || value}
        disabledDate={disabledDate}
        onCalendarChange={(val) => setDates(val)}
        onChange={(val) => setDatesArray(val)}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default DateRangePicker;
