import React from 'react';

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
    };
    this.changeStyle = this.changeStyle.bind(this);
  }

  changeStyle(e) {
    this.setState({ checkIn: !this.state.checkIn });
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

    const tdStyling = this.state.checkIn ? clickedTd : availableTd;
    const divStyling = this.state.checkIn ? clickedDiv : availableDiv;


    return (
      <td onClick={this.changeStyle} style={tdStyling} key={this.props.d} className="calendar-day">
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
