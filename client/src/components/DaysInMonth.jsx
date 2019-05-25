import React from 'react';
import moment from 'moment';
import Day from './Day.jsx';


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
    this.blackOutMinNights = this.blackOutMinNights.bind(this);
  }


  firstDayOfMonth() {
    const { dateObject } = this.state;
    const firstDay = moment(dateObject).startOf('month').format('d');

    return firstDay;
  }

  bookedDay(date) {
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
  }

  blackOutMinNights(date) {
    const checkInDate = new Date(this.props.checkInDate);
    const { minNights } = this.props;


    const minBookDate = new Date(checkInDate);
    minBookDate.setDate(checkInDate.getDate() + minNights);

    if (date > checkInDate && date < minBookDate) {
      // console.log('This day falls between checkin and minbookdate', date);
      return true;
    }
    return false;
  }

  inMinNights(date) {
    const checkInDate = new Date(this.props.checkInDate);
    const { minNights } = this.props;

    const minBookDate = new Date(checkInDate);
    minBookDate.setDate(checkInDate.getDate() + minNights);

    if (date > checkInDate && date <= minBookDate) {
      return true;
    }
    return false;
  }


  daysInMonth() {
    const { dateObject } = this.state;
    const totalDaysInMonth = moment(dateObject).daysInMonth();


    const month = moment(dateObject).format('MM');
    const year = moment(dateObject).format('YYYY');


    const daysInMonth = [];
    for (let d = 1; d <= totalDaysInMonth; d += 1) {
      const day = d > 9 ? d : `0${d}`;
      const date = `${year}-${month}-${day}`;

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      const beforeCurrent = new Date(date) < currentDate;

      const afterLastDay = false;
      if (this.props.lastDay !== null) {
        const lastDay = new Date(date) > new Date(this.props.lastDay);
        if (lastDay) {
          afterLastDay = true;
        }
      }

      // if render all we dont care about checkin now
      const beforeCheckIn = false;
      if (!this.props.renderAll || this.props.secondCheckIn) {
        beforeCheckIn = new Date(date) < new Date(this.props.checkInDate);
      }

      const selected = false;

      if (this.props.checkInDate !== null && this.props.checkOutDate !== null) {
        const selectDate = new Date(date);
        if (selectDate >= new Date(this.props.checkInDate) && selectDate <= new Date(this.props.checkOutDate)) {
          selected = true;
        }
      }


      let blackOutMinNights = false;
      if (this.props.checkInDate !== null) {
        if (date === this.props.checkInDate) {
          selected = true;
        }
        if (selected === false) {
          if (this.blackOutMinNights(new Date(date))) {
            blackOutMinNights = true;
          }
        }
      }

      let minDate = false;
      if (this.inMinNights(new Date(date)) && this.props.highLight) {
        // console.log('min night dates: ', date);
        minDate = true;
      }

      if (this.props.lastHoverDate !== null) {
        if (date <= this.props.lastHoverDate && date > this.props.checkInDate) {
          // console.log('hey less than last day!');
          minDate = true;
        }
      }


      if (this.bookedDay(date) || beforeCurrent || beforeCheckIn || afterLastDay || blackOutMinNights) {
        daysInMonth.push(<Day
          d={d}
          booked="true"
          highLight={minDate}
          checkOutDate={this.props.checkOutDate}
        />);
      } else {
        daysInMonth.push(<Day
          d={d}
          booked="false"
          checkInDate={this.props.checkInDate}
          checkOutDate={this.props.checkOutDate}
          checkDate={date}
          setCheckIn={this.props.setCheckIn}
          selected={selected}
          minNights={this.props.minNights}
          highLight={minDate}
          noMinNights={this.props.noMinNights}
          showMinNights={this.props.showMinNights}
          lastDay={this.props.lastDay}
          showNightsBeforeLast={this.props.showNightsBeforeLast}

        />);
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
