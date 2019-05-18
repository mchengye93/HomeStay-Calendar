const request = require('supertest');


describe('API Test', () => {
  test('GET /bookings/:listId', async () => {
    const response = await request('http://localhost:3000').get('/bookings').query({ listingId: 0 });
    const listing = response.body[0];
    // console.log(listing);
    expect(response.statusCode).toBe(200);
    expect(listing).toHaveProperty('listingId');
    expect(listing).toHaveProperty('bookings');
    expect(listing).toHaveProperty('minNights');
    expect(listing).toHaveProperty('maxNights');
  });
});
