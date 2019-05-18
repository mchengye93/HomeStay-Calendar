import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: [],
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
        console.log(this.state.listing);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>TEST</div>
    );
  }
}

export default App;
