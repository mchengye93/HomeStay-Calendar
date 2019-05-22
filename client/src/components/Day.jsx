import React from 'react';
import styled from 'styled-components';

const Td = styled.td`
  width: '40px',
  height: '39px',
  background: 'repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
  color: 'rgb(0, 0, 0)',
  border: '2px solid rgb(255, 255, 255)',
  borde-radius: '7px ',
  padding: '0px',

`;

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


const clickedTd = {
  width: '40px',
  height: '39px',
  background: 'rgb(0, 132, 137)',
  color: 'rgb(0, 0, 0)',
  border: '2px solid rgb(255, 255, 255)',
  borderRadius: '7px',
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


class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkIn: false,
      checkDate: null,
    };
    this.checkDate = this.checkDate.bind(this);
  }

  checkDate(e) {
    // if click date same as checkin date ignore it
    if (this.props.checkInDate !== this.props.checkDate) {
      this.props.setCheckIn(this.props.checkDate);
    }
  }

  render() {
    // console.log(this.props.booked);
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

    if (this.props.selected) {
      // console.log(`this day is between checkin and checkout :${this.props.checkDate}`);
    }

    // if (this.state.checkIn) {
    //   const tdStyling = clickedTd;
    //   const divStyling = clickedDiv;
    // } else {
    //   const tdStyling = this.props.selected ? clickedTd : availableTd;
    //   const divStyling = this.props.selected ? clickedDiv : availableDiv;
    // }


    const tdStyling = this.props.selected ? clickedTd : availableTd;
    const divStyling = this.props.selected ? clickedDiv : availableDiv;

    return (
      <td onClick={this.checkDate} style={tdStyling} key={this.props.d} className="calendar-day">
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
