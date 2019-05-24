import React from 'react';
import styled from 'styled-components';

const Td = styled.td`
  width: '40px',
  height: '39px',
  background: 'repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
  color: 'rgb(0, 0, 0)',
  border: '1px solid rgb(255, 255, 255)',
  borde-radius: '5px ',
  padding: '0px',

`;

const MessageDiv = styled.div` 
  background-color: rgb(255, 255, 255) !important;
  box-shadow: rgb(118, 118, 118) 0px 1px 2px !important;
  color: rgb(72, 72, 72) !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: max-content !important;
  z-index: 1 !important;
  transform: translateY(-100%) translateY(-4px) !important;
  border-radius: 2px !important;
  padding: 2px 4px !important;
`;

const MessageSpan = styled.span` 
  overflow-wrap: break-word !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  line-height: 1.33333em !important;
  color: rgb(72, 72, 72) !important;

`;


const bookedTd = {
  width: '40px',
  height: '39px',
  background: 'repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
  color: 'rgb(0, 0, 0)',
  border: '1px solid rgb(255, 255, 255)',
  borderRadius: '5px ',
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
  fontSize: '13px',

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


const clickedTd = {
  width: '40px',
  height: '39px',
  background: 'rgb(0, 132, 137)',
  color: 'rgb(0, 0, 0)',
  border: '1px solid rgb(255, 255, 255)',
  borderRadius: '5px',
  padding: '0px',

};

const clickedDiv = {
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
  border: '1px solid rgb(255, 255, 255)',
  borderRadius: '5px',
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

const highLightTd = {
  width: '40px',
  height: '39px',
  background: 'rgb(237, 246, 246)',
  color: 'rgb(0, 132, 137)',
  border: '1px solid rgb(255, 255, 255)',
  borderRadius: '5px',
  padding: '0px',
  background: 'rgb(204,238,235)',
};

const minNightsDiv = {
  fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
  fontWeight: '700',
  height: '12px',
  lineHeight: '12px',
  textAlign: 'center',
  width: '38px',
  color: 'rgb(255, 255, 255)',
};

const minNightsTd = {
  width: '40px',
  height: '39px',
  background: 'rgb(237, 246, 246)',
  color: 'rgb(255, 255, 255)',
  border: '1px solid rgb(255, 255, 255)',
  borderRadius: '5px',
  padding: '0px',
  background: 'rgb(204,238,235)',
};

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      highLight: false,
    };
    this.checkDate = this.checkDate.bind(this);

    this.mouseOutCheck = this.mouseOutCheck.bind(this);
    this.mouseOverCheck = this.mouseOverCheck.bind(this);
  }

  checkDate(e) {
    // if click date same as checkin date ignore it

    if (this.props.checkInDate !== this.props.checkDate) {
      this.props.setCheckIn(this.props.checkDate);
    }
  }

  mouseOverCheck(e) {
    this.setState({ highLight: true });
    if (this.props.checkInDate === this.props.checkDate) {
      this.props.showMinNights();
    }
    if (this.props.checkDate > this.props.checkInDate
      && this.props.checkInDate !== null && this.props.checkOutDate === null) {
      this.props.showNightsBeforeLast(this.props.checkDate);
    }
    // console.log('this day less than last day?', this.props.showNightsBeforeLast(this.props.checkDate));
  }

  mouseOutCheck(e) {
    this.setState({ highLight: false });
    if (this.props.checkInDate === this.props.checkDate) {
      this.props.noMinNights();
    }
  }

  render() {
    let tdStyling = minNightsTd;
    let divStyling = minNightsDiv;
    if (this.props.checkDate < this.props.lastDay) {
      console.log('current day less than last day!');
    }

    if (this.props.highLight && this.props.checkOutDate === null) {
      return (
        <td
          id="click1"
          onClick={this.checkDate}
          style={tdStyling}
          key={this.props.d}
          className="calendar-day"
          onMouseOver={this.mouseOverCheck}
          onMouseOut={this.mouseOutCheck}
        >
          <div style={div1}>
            <div style={div2}>
              <div style={divStyling}>{this.props.d}</div>
            </div>
          </div>
        </td>
      );
    }


    if (this.state.highLight && !this.props.selected) {
      tdStyling = highLightTd;
      divStyling = availableDiv;
      return (
        <td
          id="click"
          onClick={this.checkDate}
          style={tdStyling}
          key={this.props.d}
          className="calendar-day"
          onMouseOver={this.mouseOverCheck}
          onMouseOut={this.mouseOutCheck}
        >
          <div style={div1}>
            <div style={div2}>
              <div style={divStyling}>{this.props.d}</div>
            </div>
          </div>
        </td>
      );
    }


    if (this.props.booked === 'true') {
      // console.log('inside true!');
      return (
        <td style={bookedTd} key={this.props.d} className="calendar-day booked">
          <div style={div1}>
            <div style={div2}>
              <div style={bookedDiv}>{this.props.d}</div>
            </div>
          </div>
        </td>
      );
    }


    tdStyling = this.props.selected ? clickedTd : availableTd;
    divStyling = this.props.selected ? clickedDiv : availableDiv;

    if (this.props.checkInDate === this.props.checkDate && this.props.checkOutDate === null) {
      return (
        <td
          id="click1"
          onClick={this.checkDate}
          style={tdStyling}
          key={this.props.d}
          className="calendar-day"
          onMouseOver={this.mouseOverCheck}
          onMouseOut={this.mouseOutCheck}
        >
          <div style={div1}>
            <MessageDiv>

              <div>
                <MessageSpan>
                  <span>
                    <div id="minNightsSpan">
                      {this.props.minNights}
                      {' '}
night minimum stay
                      {' '}
                    </div>
                  </span>
                </MessageSpan>
              </div>
            </MessageDiv>

            <div style={div2}>
              <div style={divStyling}>{this.props.d}</div>
            </div>
          </div>
        </td>
      );
    }
    return (
      <td
        id="click"
        onClick={this.checkDate}
        style={tdStyling}
        key={this.props.d}
        className="calendar-day"
        onMouseOver={this.mouseOverCheck}
        onMouseOut={this.mouseOutCheck}
      >

        <div style={div1}>
          <div style={div2}>
            <div style={divStyling}>{this.props.d}</div>
          </div>
        </div>
      </td>
    );
  }
}
export default Day;
