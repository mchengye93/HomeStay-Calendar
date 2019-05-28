/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif';
font-weight: 700;
height: 12px;
line-height: 12px;
text-align: center;
width: 38px;
`;

const AvailableDiv = styled(Div)`
color: rgb(0, 132, 137);
background: rgb(237, 246, 246);
`;

const ClickedDiv = styled(Div)`
color: rgb(255, 255, 255);
background: rgb(0, 132, 137);
`;

const MinNightsDiv = styled(Div)`
color:rgb(255, 255, 255);
`;
const Td = styled.td`
  width: 40px;
  height: 39px;
  color: rgb(0, 0, 0);
  border: 1px solid rgb(255, 255, 255);
  borde-radius: 5px;
  padding: 0px;

`;
const ClickedTd = styled(Td)`
background: rgb(0, 132, 137);
`;

const BookedTd = styled(Td)`
background: repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px);
`;
const AvailableTd = styled(Td)`
background: rgb(237, 246, 246);
color: rgb(0, 132, 137);
`;
const HighlightTd = styled(Td)`
background: rgb(204,238,235);
color: rgb(0, 132, 137);
`;

const MinNightsTd = styled(Td)`
color:rgb(255, 255, 255);
background: rgb(204,238,235);
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

const Div1 = styled.div`
height: 38px;
position: relative;
width: 38px;
margin: 0px;
`;

const Div2 = styled.div`
padding-bottom: 13px;
padding-top:13px;
font-size:13px
`;

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
  border: '1px solid rgb(255, 255, 255)',
  borderRadius: '5px',
  padding: '0px',
  background: 'rgb(204,238,235)',
};

class Day extends React.Component {
  constructor(props) {
    super(props);

    this.checkDate = this.checkDate.bind(this);

    this.mouseOutCheck = this.mouseOutCheck.bind(this);
    this.mouseOverCheck = this.mouseOverCheck.bind(this);
  }

  checkDate() {
    if (this.props.checkInDate !== this.props.checkDate) {
      this.props.setCheckIn(this.props.checkDate);
    }
  }

  mouseOverCheck() {
    if (this.props.checkInDate === this.props.checkDate && this.props.showMinNights !== undefined) {
      this.props.showMinNights();
    }
    if (this.props.checkDate > this.props.checkInDate
      && this.props.checkInDate !== null && this.props.checkOutDate === null) {
      this.props.showNightsBeforeLast(this.props.checkDate);
    }
    if (this.props.highLightDay !== undefined) {
      this.props.highLightDay(this.props.checkDate);
    }
  }

  mouseOutCheck() {
    if (this.props.checkInDate === this.props.checkDate && this.props.noMinNights !== undefined) {
      this.props.noMinNights();
    }
    if (this.props.highLightDay !== undefined) {
      this.props.highLightDay(null);
    }
  }


  render() {
    let divStyling = minNightsDiv;
    if (this.props.highLight && this.props.checkOutDate === null) {
      return (
        <MinNightsTd
          id="click1"
          onClick={this.checkDate}

          key={this.props.d}
          className="calendar-day minNights"
          onMouseOver={this.mouseOverCheck}
          onMouseOut={this.mouseOutCheck}
          onFocus={this.mouseOverCheck}
          onBlur={this.mouseOutCheck}
        >
          <Div1>

            <Div2>
              <div style={divStyling}>{this.props.d}</div>
            </Div2>

          </Div1>

        </MinNightsTd>
      );
    }

    if (this.props.booked === 'true') {
      return (
        <BookedTd
          key={this.props.d}
          className="calendar-day booked"
        >
          <Div1>

            <Div2>
              <div style={bookedDiv}>{this.props.d}</div>
            </Div2>

          </Div1>
        </BookedTd>
      );
    }

    if (this.props.checkDate === this.props.highLightDate && this.props.highLightDate !== null && !this.props.selected) {
      divStyling = availableDiv;
      return (
        <HighlightTd
          id="click"
          onClick={this.checkDate}
          key={this.props.d}
          className="calendar-day"
          onMouseOver={this.mouseOverCheck}
          onMouseOut={this.mouseOutCheck}

        >
          <Div1>

            <Div2>
              <div style={divStyling}>{this.props.d}</div>
            </Div2>

          </Div1>

        </HighlightTd>
      );
    }


    const tdStyling = this.props.selected ? clickedTd : availableTd;
    divStyling = this.props.selected ? clickedDiv : availableDiv;

    if (this.props.checkInDate === this.props.checkDate && this.props.checkOutDate === null) {
      return (
        <ClickedTd
          id="click1"
          onClick={this.checkDate}

          key={this.props.d}
          className="calendar-day selected"
          onMouseOver={this.mouseOverCheck}
          onMouseOut={this.mouseOutCheck}

        >
          <Div1>
            <MessageDiv>
              <MessageSpan>
                <div id="minNightsSpan">
                  {this.props.minNights}
                  {' '}
night minimum stay
                  {' '}
                </div>
              </MessageSpan>
            </MessageDiv>

            <Div2>
              <div style={divStyling}>{this.props.d}</div>
            </Div2>

          </Div1>
        </ClickedTd>
      );
    }
    return (
      <td
        id="click"
        onClick={this.checkDate}
        style={tdStyling}
        key={this.props.d}
        className="calendar-day available"
        onMouseOver={this.mouseOverCheck}
        onMouseOut={this.mouseOutCheck}
        onBlur={this.mouseOutCheck}
      >
        <Div1>
          <Div2>

            <div style={divStyling}>{this.props.d}</div>

          </Div2>

        </Div1>
      </td>
    );
  }
}

export default Day;
