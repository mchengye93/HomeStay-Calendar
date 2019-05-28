/* eslint-disable react/sort-comp */
import React from 'react';
import moment from 'moment';

import styled from 'styled-components';
import WeekDays from './WeekDays.jsx';
import DaysInMonth from './DaysInMonth.jsx';
import Button from './Button.jsx';
import Message from './Message.jsx';


const Style1 = styled.div`
width: '100%';
vertical-align: 'bottom';
`;

const Style2 = styled.div`
margin-bottom: 0px;
`;

const Style3 = styled.div`
margin-bottom: 16px;
`;

const StyleBot = styled.div`
margin-top:24px;
margin-bottom: 24px;
`;

const StyleCalendar = styled.div`
width: 800px;
`;

const Calendars = styled.div`
transform: translateX(0px);
width: 307px;
display: inline-block;
padding: 0px 13px;
`;

const Month = styled.div`
color: rgb(72, 72, 72);
font-size: 18px;
text-align: center;
padding-top: 22px;
padding-bottom: 37px;
caption-side: initial;
font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
text-align: center;
`;

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


    this.minDayAwayCheckOut = this.minDayAwayCheckOut.bind(this);
    this.minDayAwayCheckIn = this.minDayAwayCheckIn.bind(this);
  }

  componentDidMount() {

  }

  minDayAwayCheckOut(date) {
    const { minNights } = this.props.listing;
    const { checkOut } = this.state;

    const checkOutDate = new Date(checkOut);

    // calculate different between new date and checkout
    const newDate = new Date(date);

    const dayDiff = checkOutDate.getDate() - newDate.getDate();


    if (dayDiff < minNights) {
      const newLastDay = this.lookForLastDay(date);

      this.setState({
        checkIn: date,
        checkOut: null,
        lastDay: newLastDay,
        renderAll: false,
        clicked: true,
        secondCheckIn: false,
        isCheckIn: false,
      });

      return false;
    }

    this.setState({
      checkIn: date,
      secondCheckIn: true,
      isCheckIn: false,
    });
    return true;
  }

  minDayAwayCheckIn(date) {
    const { minNights } = this.props.listing;
    const { checkIn } = this.state;

    const checkInDate = new Date(checkIn);

    const newDate = new Date(date);
    const dayDiff = Math.abs(checkInDate.getDate() - newDate.getDate());


    if (dayDiff < minNights) {
      const newLastDay = this.lookForLastDay(date);

      this.setState({
        checkIn: date,
        checkOut: null,
        lastDay: newLastDay,
        renderAll: false,
        clicked: true,
        secondCheckIn: false,
        isCheckIn: false,
      });

      return false;
    }
    this.setState({
      checkOut: date,
      lastDay: null,
      renderAll: true,
      secondCheckIn: false,
      isCheckIn: true,
    });
    return true;
  }


  setCheckIn(date) {
    const newLastDay = this.lookForLastDay(date);

    const { checkIn } = this.state;
    const { checkOut } = this.state;

    const { secondCheckIn } = this.state;

    if (!secondCheckIn) {
      if (checkIn !== null && checkOut !== null) {
        if (newLastDay < checkOut) {
          this.setState({
            checkIn: date,
            checkOut: null,
            lastDay: newLastDay,
            renderAll: false,
            clicked: true,
            isCheckIn: false,
          });
        } else if (date < checkOut) {
          this.minDayAwayCheckOut(date);
        } else {
          const lastCheckOutDay = this.lookForLastDay(date);

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
        const lastCheckOutDay = this.lookForLastDay(date);
        this.setState({
          checkIn: date,
          lastDay: lastCheckOutDay,
          renderAll: false,
          clicked: true,
          isCheckIn: false,

        });
      } else if (checkIn !== null) {
        this.setCheckOut(date);
      }
    } else {
      this.setCheckOut(date);
    }
  }

  setCheckOut(date) {
    const { checkIn } = this.state;

    const lastCheckOutDay = this.lookForLastDay(checkIn);

    if (date > lastCheckOutDay) {
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
    }
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
    return (
      <Style1>
        <div>
          <Style2>
            <div>
              <section>
                <Style3>
                  <div>
                    <h3>
                      <div>Availability</div>
                    </h3>
                  </div>
                  <Message
                    clicked={this.state.clicked}
                    minNights={this.props.listing.minNights}
                    clearDate={this.clearDate}
                  />
                  <StyleCalendar>
                    <div>

                      <div id="calendarContainer">
                        <Button
                          backwardMonth={this.backwardMonth}
                          forwardMonth={this.forwardMonth}
                        />
                        <div id="calendars">
                          <Calendars id="calendar1">

                            <Month>
                              <div className="current-month-calendar">
                                <strong>{this.month()}</strong>
                              </div>
                            </Month>
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

                          </Calendars>
                          <Calendars id="calendar2">

                            <Month>
                              <div className="next-month-calendar">
                                <strong>{this.nextMonth()}</strong>
                              </div>
                            </Month>
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
                          </Calendars>
                        </div>
                      </div>
                    </div>
                  </StyleCalendar>
                  <StyleBot>
                    <div>{' '}</div>
                  </StyleBot>
                </Style3>
              </section>
            </div>
          </Style2>
        </div>
      </Style1>
    );
  }
}

export default Calendar;
