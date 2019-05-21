import React from 'react';
import moment from 'moment';

import WeekDays from './WeekDays.jsx';
import DaysInMonth from './DaysInMonth.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/destructuring-assignment
      listing: {},
      dateObject: moment(),
      nextMonth: moment().add(1, 'months'),
    };


    this.backwardMonth = this.backwardMonth.bind(this);
    this.forwardMonth = this.forwardMonth.bind(this);

    this.month = this.month.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
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

  render() {
    // console.log('this.state.listing', this.state.listing);

    // console.log(this.props.listing);
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

    const messageSpan = {
      margin: '0px',
      wordWrap: 'break-word',
      fontFamily: 'Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '1.375em',
      color: '#484848',

    };

    const calendars = {
      transform: 'translateX(0px)',
      width: '307px',
      display: 'inline-block',
      padding: '0px 13px',

    };

    const botSvg = {
      height: '19px',
      width: '19px',
      fill: 'rgb(130, 136, 138)',
    };
    const rightBotStyle = {
      cursor: 'pointer',
      userSelect: 'none',
      backgroundColor: 'rgb(255, 255, 255)',
      color: 'rgb(117, 117, 117)',
      position: 'absolute',
      top: '18px',
      lineHeight: '0.78',
      right: '22px',
      margin: '0px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(228, 231, 231)',
      borderImage: 'initial',
      borderRadius: '3px',
      padding: '6px 9px',
      width: '19px',


    };

    const leftBotStyle = {
      cursor: 'pointer',
      userSelect: 'none',
      backgroundColor: 'rgb(255, 255, 255)',
      color: 'rgb(117, 117, 117)',
      position: 'absolute',
      top: '18px',
      lineHeight: '0.78',
      left: '22px',
      margin: '0px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(228, 231, 231)',
      borderImage: 'initial',
      borderRadius: '3px',
      padding: '6px 9px',
      width: '19px',


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
    const relative = {
      width: '678px',
      position: 'relative',
      zIndex: '2',
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
            <div style={styleCalendar}>
              <div>
                <span style={messageSpan} />
              </div>
              <div id="calendarContainer">
                <div id="buttons" style={relative}>
                  <div onClick={this.backwardMonth} style={leftBotStyle} role="button" tabIndex="0" className="_18s8f6ik" aria-label="Move backward to switch to the previous month.">
                    <svg style={botSvg} className="_1ri93fe" focusable="false" viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z" /></svg>

                  </div>
                  <div onClick={this.forwardMonth} style={rightBotStyle} role="button" tabIndex="0" className="_1h5uiygl" aria-label="Move forward to switch to the next month.">
                    <svg style={botSvg} className="_1ri93fe" focusable="false" viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" /></svg>

                  </div>
                </div>
                <div id="calendars">
                  <div id="calendar1" style={calendars}>
                    <div style={monthStyle} className="current-month-calendar">
                      <strong>{this.month()}</strong>
                    </div>
                    <table className="calendar-day">
                      <WeekDays />
                      <DaysInMonth month={this.state.dateObject} listing={this.props.listing} />
                    </table>
                  </div>
                  <div id="calendar2" style={calendars}>
                    <div style={monthStyle} className="calendar-navi">
                      <strong>{this.nextMonth()}</strong>
                    </div>
                    <table className="next-calendar-day">
                      <WeekDays />
                      <DaysInMonth month={this.state.nextMonth} listing={this.props.listing} />
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
