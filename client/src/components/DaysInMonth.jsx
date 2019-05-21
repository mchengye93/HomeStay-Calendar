import React from 'react';
import moment from 'moment';

const bookedTd = {
  width: '40px',
  height: '39px',
  background: 'repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
  color: 'rgb(0, 0, 0)',
  border: '2px solid rgb(255, 255, 255)',
  borderRadius: '7px ',
  padding: '0px',
};

const div1 = {
  height: '38px',
  position: 'relative',
  width: '38px',
  margin: '0px',
};

const div2 = {
  paddingBottom: '13px',
  paddingTop: '13px',
  fontSize: '14px',

};

const bookedDiv = {
  fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
  fontWeight: '700',
  height: '12px',
  lineHeight: '12px',
  textAlign: 'center',
  width: '38px',
  color: 'rgb(216, 216, 216)',
};


const clickedDiv = {
  width: '40px',
  height: '39px',
  background: 'rgb(0, 132, 137)',
  color: 'rgb(0, 0, 0)',
  border: '2px solid rgb(255, 255, 255)',
  borderRadius: '7px',
  padding: '0px',

};

const clickedTd = {
  fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
  fontWeight: '700',
  height: '12px',
  lineHeight: '12px',
  textAlign: 'center',
  width: '38px',
  color: 'rgb(255, 255, 255)',
};

const availableTd = {
  width: '40px',
  height: '39px',
  background: 'rgb(237, 246, 246)',
  color: 'rgb(0, 132, 137)',
  border: '2px solid rgb(255, 255, 255)',
  borderRadius: '7px',
  padding: '0px',
};

const availableDiv = {
  fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
  fontWeight: '700',
  height: '12px',
  lineHeight: '12px',
  textAlign: 'center',
  width: '38px',
  color: 'rgb(0, 132, 137)',
};
class DaysInMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      dateObject: this.props.month,
    };

    this.daysInMonth = this.daysInMonth.bind(this);
    this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
    this.daysInMonth = this.daysInMonth.bind(this);
    this.blanksDays = this.blanksDays.bind(this);
    this.totalSlots = this.totalSlots.bind(this);

    this.bookedDay = this.bookedDay.bind(this);

    this.changeStyle = this.changeStyle.bind(this);
  }


  firstDayOfMonth() {
    const { dateObject } = this.state;
    const firstDay = moment(dateObject).startOf('month').format('d');

    return firstDay;
  }

  bookedDay(date) {
    // convert the day to moment;
    // console.log(date);

    const booked = this.props.listing.bookings;
    if (booked !== undefined) {
      // console.log(booked);
      for (let i = 0; i < booked.length; i += 1) {
        const trimDate = booked[i].split('T')[0];

        // console.log('any day ===', trimDate === date);
        if (trimDate === date) {
          return true;
        }
      }
    }
    return false;
    // console.log('booked contains', booked.includes(day));
  }

  changeStyle(e) {

  }


  daysInMonth() {
    const { dateObject } = this.state;
    const totalDaysInMonth = moment(dateObject).daysInMonth();
    const { bookings } = this.props.listing;

    console.log('bookings', bookings);
    const month = moment(dateObject).format('MM');
    const year = moment(dateObject).format('YYYY');

    // console.log('month', month);
    // console.log('year', year);
    const daysInMonth = [];
    for (let d = 1; d <= totalDaysInMonth; d += 1) {
      const day = d > 9 ? d : `0${d}`;
      const date = `${year}-${month}-${day}`;
      const booked = this.bookedDay(date) ? 'booked' : '';
      const beforeCurrent = new Date(date) < new Date();
      console.log('less than current day? ', new Date(date), new Date(), beforeCurrent);
      // console.log(beforeCurrent);
      if (this.bookedDay(date) || beforeCurrent) {
        daysInMonth.push(
          <td style={bookedTd} key={d} className={`calendar-day ${booked}`}>
            <div style={div1}>
              <div style={div2}>
                <div style={bookedDiv}>{d}</div>
              </div>
            </div>
          </td>,
        );
      } else {
        daysInMonth.push(
          <td onClick={this.changeStyle} style={availableTd} key={d} className={`calendar-day ${booked}`}>
            <div style={div1}>
              <div style={div2}>
                <div style={availableDiv}>{d}</div>
              </div>
            </div>
          </td>,
        );
      }
    }

    return daysInMonth;
  }

  blanksDays() {
    const blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i += 1) {
      blanks.push(
        <td className="calendar-day empty" />,
      );
    }
    return blanks;
  }

  totalSlots() {
    const blanks = this.blanksDays();
    const daysInMonth = this.daysInMonth();

    const totalSlots = [...blanks, ...daysInMonth];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    const daysinmonth = rows.map((d, i) => <tr>{d}</tr>);

    return daysinmonth;
  }


  render() {
    return (
      <tbody>
        {this.totalSlots()}
      </tbody>
    );
  }
}

export default DaysInMonth;
