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
      // eslint-disable-next-line react/destructuring-assignment
      listing: {},
      dateObject: moment(),
      nextMonth: moment().add(1, 'months'),
      clicked: true,
      checkIn: null,
      checkOut: null,
      lastDay: null,
    };


    this.backwardMonth = this.backwardMonth.bind(this);
    this.forwardMonth = this.forwardMonth.bind(this);

    this.month = this.month.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.clearDate = this.clearDate.bind(this);

    this.setCheckIn = this.setCheckIn.bind(this);
    this.setCheckOut = this.setCheckOut.bind(this);

    this.lookForLastDay = this.lookForLastDay.bind(this);
  }

  componentDidMount() {

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
      clicked: true,
      lastDay: null,
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

  setCheckIn(date) {
    if (this.state.checkIn !== null && this.state.checkOut !== null) {
      // reset new checkIn date last day is less than checkout then reset checkout
      // set new checkin
      const newLastDay = this.lookForLastDay(date);

      if (newLastDay < this.state.checkOut) {
        // reset checkin date
        this.setState({
          checkIn: date,
          checkOut: null,
          lastDay: newLastDay,
          renderAll: false,
        });
      } else if (date < this.state.checkOut) {
        this.setState({ checkIn: date });
      } else {
        const lastCheckOutDay = this.lookForLastDay(date);
        this.setState({
          checkIn: date,
          checkOut: null,
          lastDay: lastCheckOutDay,
          renderAll: false,
        });
      }
    } else if (this.state.checkIn === null) {
      const lastCheckOutDay = this.lookForLastDay(date);
      this.setState({
        checkIn: date,
        lastDay: lastCheckOutDay,
        renderAll: false,
      });
    } else if (this.state.checkIn !== null) {
      this.setCheckOut(date);
    }
  }

  setCheckOut(date) {
    // console.log('inside calendar setcheckOUT', date);

    this.setState({
      checkOut: date,
      lastDay: null,
      renderAll: true,
    });
    // console.log('current checkout date', date);
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
              <h2>
                <div>Availability</div>
              </h2>
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
