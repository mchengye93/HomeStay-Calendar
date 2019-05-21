import React from 'react';
import axios from 'axios';
import Calendar from './Calendar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: {},
    };
    this.getBookings = this.getBookings.bind(this);
  }

  componentDidMount() {
    this.getBookings(0);
  }

  getBookings(listingId) {
    // console.log(this.state);
    axios.get('/bookings', {
      params: {
        listingId,
      },
    })
      .then((results) => {
        // console.log(results);
        this.setState({ listing: results.data[0] });
        // console.log(this.state.listing);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // console.log(this.state.listing);
    const calendarDiv = {
      boxSizing: 'border-box',
      color: 'rgb(72, 72, 72)',
      display: 'inline-block',
      fontFamily: 'Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif',
      fontSize: '14px',
      height: '467px',
      lineHeight: '20.02px',
      textSizeAdjust: '100%',
      verticalAlign: 'bottom',
      width: '648px',
    };

    const inline = { display: 'inline-block' };
    const width = {
      display: 'inline-block',
      width: '100px',
    };
    return (

      // <div style={inline}>
      //   <div style={width}> Div1</div>
      //   <div style={width}>Div2</div>
      // </div>
      <div style={calendarDiv}>
        <Calendar listing={this.state.listing} />
      </div>

    );
  }
}

export default App;
