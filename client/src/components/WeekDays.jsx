import React from 'react';
import moment from 'moment';

const weekDay = {
  boxSizing: 'border-box',
  color: 'rgb(117, 117, 117)',
  fontFamily: 'Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif',
  fontSize: '14px',
  height: '20px',
  lineHeight: '20.02px',
  textAlign: 'center',
  width: '40px',
  fontSize: 'smaller',
};
const WeekDays = () => {
  const weekdayshort = moment.weekdaysShort();

  const weekdaysshortname = weekdayshort.map(day => (

    <td style={weekDay} key={day} className="week-day">
      {day.substring(0, 2)}
    </td>
  ));
  return (
    <thead>
      <tr>
        { weekdaysshortname }
      </tr>
    </thead>
  );
};
export default WeekDays;
