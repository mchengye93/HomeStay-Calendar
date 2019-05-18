const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/airbnb-calendar', { useNewUrlParser: true });


const { Schema } = mongoose;

const listingSchema = new Schema({
  listingId: { type: Number, required: true },
  // new Date("<YYYY-mm-dd>")
  bookings: [Date],
  minNights: { type: Number, default: 1 },
  maxNights: { type: Number, default: 30 },
  finalDay: { type: Date },

});
// test
const Listing = mongoose.model('Listing', listingSchema);


const getBookings = (listingIdObj, res) => {
  // Listing.find().
  // console.log('db listIdobj', listingIdObj);
  Listing.find(listingIdObj, (err, results) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      // console.log('inside dbs getBookings result:', JSON.stringify(results));
      res.status(200);
      res.send(results);
    }
  });
};

const addListings = (listings) => {
  console.log('from db addListings ', listings);
  console.log(listings.length);

  for (let i = 0; i < listings.length; i += 1) {
    const listing = new Listing(listings[i]);
    listing.save().then((result) => {
      // console.log('saved ', result);
    });
  }
};


module.exports = {
  getBookings,
  addListings,
};
