/* eslint-disable react/sort-comp */
import React from 'react';
import moment from 'moment';

import WeekDays from './WeekDays.jsx';
import DaysInMonth from './DaysInMonth.jsx';
import Button from './Button.jsx';
import Message from './Message.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      dateObject: moment(),
      nextMonth: moment().add(1, 'months'),
      clicked: false,
      checkIn: null,
      checkOut: null,
      lastDay: null,
      secondCheckIn: false,
      lastHoverDate: null,
      highLight: false,
      isCheckIn: true,
    };


    this.backwardMonth = this.backwardMonth.bind(this);
    this.forwardMonth = this.forwardMonth.bind(this);

    this.month = this.month.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.clearDate = this.clearDate.bind(this);

    this.setCheckIn = this.setCheckIn.bind(this);
    this.setCheckOut = this.setCheckOut.bind(this);

    this.lookForLastDay = this.lookForLastDay.bind(this);

    this.showMinNights = this.showMinNights.bind(this);
    this.noMinNights = this.noMinNights.bind(this);
    this.showNightsBeforeLast = this.showNightsBeforeLast.bind(this);

    this.meetMinNights = this.meetMinNights.bind(this);

    this.minDayAwayCheckOut = this.minDayAwayCheckOut.bind(this);
    this.minDayAwayCheckIn = this.minDayAwayCheckIn.bind(this);
  }

  componentDidMount() {

  }

  minDayAwayCheckOut(date) {
    const { minNights } = this.props.listing;
    const { checkOut } = this.state;

    const checkOutDate = new Date(checkOut);

    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };

    // const date1 = lastCheckInDate.toLocaleString('en-US', options);


    // calculate different between new date and checkout
    const newDate = new Date(date);
    const dayDiff = checkOutDate.getDate() - newDate.getDate();

    if (dayDiff < minNights) {
      const newLastDay = this.lookForLastDay(date);
      console.log('This is an invalid checkin date!');
      this.setState({
        checkIn: date,
        checkOut: null,
        lastDay: newLastDay,
        renderAll: false,
        clicked: true,
        secondCheckIn: false,
        isCheckIn: false,
      });
    } else {
      this.setState({
        checkIn: date,
        secondCheckIn: true,
        isCheckIn: false,
      });
    }

    console.log(`New Date is ${dayDiff} from checkout:${checkOut}`);
  }

  minDayAwayCheckIn(date) {
    const { minNights } = this.props.listing;
    const { checkIn } = this.state;

    const checkInDate = new Date(checkIn);

    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };

    // const date1 = lastCheckInDate.toLocaleString('en-US', options);


    // calculate different between new date and checkout
    const newDate = new Date(date);
    const dayDiff = Math.abs(checkInDate.getDate() - newDate.getDate());

    console.log(`New Date is ${dayDiff} from checkin:${checkIn} `);
    if (dayDiff < minNights) {
      const newLastDay = this.lookForLastDay(date);
      console.log('This is an invalid checkout date!');
      this.setState({
        checkIn: date,
        checkOut: null,
        lastDay: newLastDay,
        renderAll: false,
        clicked: true,
        secondCheckIn: false,
        isCheckIn: false,
      });
    } else {
      this.setState({
        checkOut: date,
        lastDay: null,
        renderAll: true,
        secondCheckIn: false,
        isCheckIn: true,
      });
    }
  }


  setCheckIn(date) {
    const newLastDay = this.lookForLastDay(date);

    const { checkIn } = this.state;
    const { checkOut } = this.state;


    const { secondCheckIn } = this.state;
    const { lastDay } = this.state;


    console.log('Check in?', this.state.isCheckIn);

    /*
    // if it is checkin and checkout is not null then check
    // if meet min requirement date < lastMinDate
    if (this.state.isCheckIn && this.state.checkOut !== null) {
      console.log('Make sure new check in 3 days before,', checkOut);
      // check in new date is min days aways from checkout
      this.minDayAwayCheckOut(date);
    } else if (!this.state.isCheckIn) {
      // we are looking at checkout then we must check and see if
      // new checkout is min days away from checkin
      console.log('Make sure new checkout is 3 days away from ', checkIn);
      this.minDayAwayCheckIn(date);
    } */

    if (!secondCheckIn) {
      if (checkIn !== null && checkOut !== null) {
        if (newLastDay < checkOut) {
        // reset checkin date
          // console.log('hey new last day is less than checkout so checkin:', date);
          this.setState({
            checkIn: date,
            checkOut: null,
            lastDay: newLastDay,
            renderAll: false,
            clicked: true,
            isCheckIn: false,
          });
        } else if (date < checkOut) {
          // console.log('date less than checkot so new checkin date', date);
          this.minDayAwayCheckOut(date);

          /*
          this.setState({
            checkIn: date,
            secondCheckIn: true,
            isCheckIn: false,
          }); */
        } else {
          const lastCheckOutDay = this.lookForLastDay(date);
          //  console.log('last checkout date greater! new checkin date:', date);
          // console.log('lasrtcheckout: ', lastCheckOutDay);
          this.setState({
            checkIn: date,
            checkOut: null,
            lastDay: lastCheckOutDay,
            renderAll: false,
            clicked: true,
            isCheckIn: false,
          });
        }
      } else if (checkIn === null) {
        // console.log('setting first checkin date: ', date);
        // console.log('setting checkin');
        const lastCheckOutDay = this.lookForLastDay(date);
        this.setState({
          checkIn: date,
          lastDay: lastCheckOutDay,
          renderAll: false,
          clicked: true,
          isCheckIn: false,

        });
      } else if (checkIn !== null) {
        // console.log('check in not  null for checkout', date);
        // console.log('setting checkout');
        this.setCheckOut(date);
      }
    } else {
      // console.log('Already second checkin go change checkout', date);
      // console.log('setting checkout');
      this.setCheckOut(date);
    }
  }

  setCheckOut(date) {
    const { checkIn } = this.state;
    const { checkOut } = this.state;

    const lastCheckOutDay = this.lookForLastDay(checkIn);
    // console.log(lastCheckOutDay);
    // if (!this.meetMinNights(date) && checkOut !== null) {
    //   this.setState({
    //     checkIn: date,
    //     checkOut: null,
    //     lastDay: newLastDay,
    //     renderAll: false,
    //     clicked: true,
    //     secondCheckIn: false,
    //     isCheckIn: false,

    //   });
    // }
    if (date > lastCheckOutDay) {
      // console.log('checkout date greater than last day so resetting checkin date: ', date);
      const newLastDay = this.lookForLastDay(date);
      this.setState({
        checkIn: date,
        checkOut: null,
        lastDay: newLastDay,
        renderAll: false,
        clicked: true,
        secondCheckIn: false,
        isCheckIn: true,
      });
    } else {
      this.minDayAwayCheckIn(date);
      /*
      this.setState({
        checkOut: date,
        lastDay: null,
        renderAll: true,
        secondCheckIn: false,
        isCheckIn: true,
      }); */
    }
  }

  meetMinNights(date) {
    const { minNights } = this.props.listing;
    const { checkIn } = this.state;
    const { checkOut } = this.state;

    const lastCheckInDate = new Date(checkOut);

    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };

    const date1 = lastCheckInDate.toLocaleString('en-US', options);


    // calculate different between new date and checkout
    const newDate = new Date(date);
    const dayDiff = lastCheckInDate.getDate() - newDate.getDate();


    if (this.state.secondCheckIn) {
      // console.log('Hey make sure checkout is 3 days from checkIn', checkIn);
    }

    if (!this.state.secondCheckIn) {
      // console.log('Make sure checkout in is 3 days aways from checkin', date);
    }
    const checkInDate = new Date(checkIn);
    // calculate day diff with checkin
    const dayDiffCheckIn = Math.abs(checkInDate.getDate() - newDate.getDate());


    const dayDiffCheckOut = Math.abs(lastCheckInDate.getDate() - newDate.getDate());

    if (dayDiffCheckOut >= 0 && dayDiffCheckOut < minNights) {
      return false;
    }
    return true;
  }

  showMinNights() {
    this.setState({ highLight: true });
  }

  noMinNights() {
    this.setState({
      highLight: false,
      lastHoverDate: null,
    });
  }

  showNightsBeforeLast(date) {
    if (this.state.lastDay !== null) {
      const { checkIn } = this.state;
      const { lastDay } = this.state;

      if (date > checkIn && date < lastDay) {
        this.setState({ lastHoverDate: date });
        return true;
      }
    }
    return false;
  }

  backwardMonth() {
    this.setState({ dateObject: this.state.dateObject.subtract(1, 'months') });
    this.setState({ nextMonth: this.state.nextMonth.subtract(1, 'months') });
  }


  // change current month to next
  forwardMonth() {
    this.setState({ dateObject: this.state.dateObject.add(1, 'months') });
    this.setState({ nextMonth: this.state.nextMonth.add(1, 'months') });
  }


  month() {
    return (

      this.state.dateObject.format('MMMM YYYY')
    );
  }

  nextMonth() {
    return this.state.nextMonth.format('MMMM YYYY');
  }


  clearDate() {
    this.setState({
      checkIn: null,
      checkOut: null,
      clicked: false,
      lastDay: null,
      highLight: false,
      secondCheckIn: false,
    });
  }

  lookForLastDay(date) {
    const { bookings } = this.props.listing;
    for (let i = 0; i < bookings.length; i += 1) {
      const bookingDate = bookings[i];
      if (bookingDate > date) {
        return (bookingDate);
      }
    }
  }


  render() {
    const style1 = {
      width: '100%',
      verticalAlign: 'bottom',

    };
    const style2 = {
      marginBottom: '0px',
    };

    const style3 = {
      marginBottom: '16px',
    };

    const styleBot = {
      marginTop: '24px',
      marginBottom: '24px',
    };

    const styleCalendar = {
      width: '800px',
    };


    const calendars = {
      transform: 'translateX(0px)',
      width: '307px',
      display: 'inline-block',
      padding: '0px 13px',

    };

    const monthStyle = {
      color: 'rgb(72, 72, 72)',
      fontSize: '18px',
      textSlign: 'center',
      paddingTop: '22px',
      paddingBottom: '37px',
      captionSide: 'initial',
      fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
      textAlign: 'center',
    };

    return (
      <div style={style1}>
        <div style={style2}>
          <section>
            <div style={style3}>
              <h3>
                <div>Availability</div>
              </h3>
            </div>
            <Message
              clicked={this.state.clicked}
              minNights={this.props.listing.minNights}
              clearDate={this.clearDate}
            />
            <div style={styleCalendar}>

              <div id="calendarContainer">
                <Button
                  backwardMonth={this.backwardMonth}
                  forwardMonth={this.forwardMonth}
                />
                <div id="calendars">
                  <div id="calendar1" style={calendars}>
                    <div style={monthStyle} className="current-month-calendar">
                      <strong>{this.month()}</strong>
                    </div>
                    <table className="calendar-day">
                      <WeekDays />
                      <DaysInMonth
                        month={this.state.dateObject}
                        listing={this.props.listing}
                        setCheckIn={this.setCheckIn}
                        checkInDate={this.state.checkIn}
                        checkOutDate={this.state.checkOut}
                        lastDay={this.state.lastDay}
                        renderAll={this.state.renderAll}
                        minNights={this.props.listing.minNights}
                        secondCheckIn={this.state.secondCheckIn}
                        noMinNights={this.noMinNights}
                        showMinNights={this.showMinNights}
                        showNightsBeforeLast={this.showNightsBeforeLast}
                        highLight={this.state.highLight}
                        lastHoverDate={this.state.lastHoverDate}
                      />
                    </table>
                  </div>
                  <div id="calendar2" style={calendars}>
                    <div style={monthStyle} className="next-month-calendar">
                      <strong>{this.nextMonth()}</strong>
                    </div>
                    <table className="next-calendar-day">
                      <WeekDays />
                      <DaysInMonth
                        month={this.state.nextMonth}
                        listing={this.props.listing}
                        setCheckIn={this.setCheckIn}
                        checkInDate={this.state.checkIn}
                        checkOutDate={this.state.checkOut}
                        lastDay={this.state.lastDay}
                        renderAll={this.state.renderAll}
                        minNights={this.props.listing.minNights}
                        secondCheckIn={this.state.secondCheckIn}
                        noMinNights={this.noMinNights}
                        showMinNights={this.showMinNights}
                        showNightsBeforeLast={this.showNightsBeforeLast}
                        highLight={this.state.highLight}
                        lastHoverDate={this.state.lastHoverDate}
                      />
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div style={styleBot}>{' '}</div>
          </section>
        </div>
      </div>
    );
  }
}

export default Calendar;
