import React from 'react';

const messageSpan = {
  margin: '0px',
  wordWrap: 'break-word',
  fontFamily: 'Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
  fontSize: '16px',
  fontWeight: '200',
  lineHeight: '1.375em',
  color: '#484848',


};

const buttonSpan = {
  margin: '0px',
  wordWrap: 'break-word',
  fontFamily: 'Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
  fontSize: '16px',
  fontWeight: '200',
  lineHeight: '1.375em',
  color: '#008489',
  float: 'right',
  border: '0',
  padding: '0',
  textDecorationLine: 'underline',

};


const buttonSpan1 = {
  margin: '0px',
  wordWrap: 'break-word',
  fontFamily: 'Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
  fontSize: '16px',
  fontWeight: '200',
  lineHeight: '1.375em',
  color: '#008489',
  float: 'right',
  border: '0',
  padding: '0',


};


class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };

    this.toggleHover = this.toggleHover.bind(this);
    this.clearDate = this.clearDate.bind(this);
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  clearDate() {
    this.setState({ hover: false });
    this.props.clearDate();
  }

  render() {
    // console.log(this.props);
    if (this.props.clicked) {
      if (this.state.hover) {
        return (
          <div>
            <span style={messageSpan}>
              {this.props.minNights}
              {' '}
                night miminum stay · Updated today
            </span>
            <button id="clearDate" onClick={this.clearDate} style={buttonSpan} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>Clear dates</button>
          </div>
        );
      }

      return (
        <div>
          <span style={messageSpan}>
            {this.props.minNights}
            {' '}
              night miminum stay · Updated today
          </span>
          <button id="clearDate" onClick={this.props.clearDate} style={buttonSpan1} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>Clear dates</button>
        </div>
      );
    }
    return (
      <div>
        <span style={messageSpan}>
                Updated today
        </span>

      </div>
    );
  }
}
export default Message;
