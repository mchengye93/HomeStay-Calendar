const faker = require('faker');
const moment = require('moment');

const db = require('../database/index.js');

const listingGenerator = () => {
  const listings = [];
  for (let x = 0; x < 10; x += 1) {
    const listing = { };

    listing.listingId = x;

    const randomDateArr = [];
    for (let i = 0; i < 10; i += 1) {
      const now = new Date();

      const aYearFromNow = new Date();
      aYearFromNow.setYear(now.getFullYear() + 1);


      const randomDate = faker.date.between(now, aYearFromNow);

      const day = new Date(randomDate);


      day.setDate(day.getDate() + 7);
      // console.log('day', day);
      for (let y = 0; y < 3; y += 1) {
        const randomWeekDate = faker.date.between(randomDate, day);
        // console.log(randomWeekDate);
        const date = moment(randomWeekDate, 'YYYY-MM-DD').format('YYYY-MM-DD');

        if (!randomDateArr.includes(date)) {
          randomDateArr.push(date);
        }
      }
      // console.log(randomDateArr);
    }
    listing.bookings = randomDateArr.sort();
    listing.minNights = 1 + Math.floor(5 * Math.random());
    listing.maxNights = 7 + Math.floor(30 * Math.random());

    listings.push(listing);
  }

  return listings;
};

// console.log(listingGenerator());
db.addListings(listingGenerator());
