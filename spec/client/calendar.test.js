import React from 'react';
import { shallow, mount } from 'enzyme';


import Calendar from '../../client/src/components/Calendar.jsx';


describe('Calendar', () => {
  const listingArr = [{
    listingId: 0,
    bookings:
     ['2019-06-15',
       '2019-06-17',
       '2019-06-19',
       '2019-06-23',
       '2019-06-24',
       '2019-06-25',
       '2019-06-26',
       '2019-06-27',
       '2019-08-07',
       '2019-08-10'],
    minNights: 1,
    maxNights: 36,
  }];
  it('Calendar components should be defined', () => {
    const calendar = shallow(<Calendar listing={listingArr} />);

    expect(calendar.exists()).toBe(true);
    // expect(wrapper.find(Calendar)).to.have.lengthOf(1);
  });

  it('Calendar components state default', () => {
    const calendar = shallow(<Calendar listing={listingArr} />);
    const { clicked } = calendar.state();
    const { checkIn } = calendar.state();
    const { checkOut } = calendar.state();
    const { lastDay } = calendar.state();
    const { secondCheckIn } = calendar.state();

    const { lastHoverDate } = calendar.state();
    const { isCheckIn } = calendar.state();

    expect(clicked).toBeDefined();
    expect(clicked).toBe(false);

    expect(checkIn).toBeDefined();
    expect(checkIn).toBeNull();

    expect(checkOut).toBeDefined();
    expect(checkOut).toBeNull();

    expect(lastDay).toBeDefined();
    expect(lastDay).toBeNull();

    expect(lastHoverDate).toBeDefined();
    expect(lastHoverDate).toBeNull();

    expect(isCheckIn).toBeDefined();
    expect(isCheckIn).toBe(true);
  });
});

describe('Calendar minDayAwayCheckout Test', () => {
  const listing = {
    listingId: 0,
    bookings:
     ['2019-06-15',
       '2019-06-17',
       '2019-06-19',
       '2019-06-23',
       '2019-06-24',
       '2019-06-25',
       '2019-06-26',
       '2019-06-27',
       '2019-08-07',
       '2019-08-10'],
    minNights: 3,
    maxNights: 36,
  };
  it('New date does not meet minDayAwayCheckOut for 3 min nights ', () => {
    const calendar = shallow(<Calendar listing={listing} />);

    calendar.setState({ checkOut: '2019-06-24' });

    const instance = calendar.instance();

    const minDayAwayCheckOut = instance.minDayAwayCheckOut('2019-06-24');
    expect(minDayAwayCheckOut).toBe(false);
    // expect(wrapper.find(Calendar)).to.have.lengthOf(1);
  });
  it('New date does not meet minDayAwayCheckOut for 3 min nights ', () => {
    const calendar = shallow(<Calendar listing={listing} />);
    calendar.setState({ checkOut: '2019-06-24' });

    const instance = calendar.instance();

    const minDayAwayCheckOut = instance.minDayAwayCheckOut('2019-06-20');
    expect(minDayAwayCheckOut).toBe(true);
  });
});

describe('Calendar minDayAwayCheckIn Test', () => {
  const listing = {
    listingId: 0,
    bookings:
     ['2019-06-15',
       '2019-06-17',
       '2019-06-19',
       '2019-06-23',
       '2019-06-24',
       '2019-06-25',
       '2019-06-26',
       '2019-06-27',
       '2019-08-07',
       '2019-08-10'],
    minNights: 3,
    maxNights: 36,
  };
  it('New date does not meet minDayAwayCheckIn for 3 min nights ', () => {
    const calendar = shallow(<Calendar listing={listing} />);

    calendar.setState({ checkIn: '2019-06-24' });

    const instance = calendar.instance();

    const minDayAwayCheckOut = instance.minDayAwayCheckIn('2019-06-22');
    expect(minDayAwayCheckOut).toBe(false);
    // expect(wrapper.find(Calendar)).to.have.lengthOf(1);
  });
  it('New date does not meet minDayAwayCheckIn for 3 min nights ', () => {
    const calendar = shallow(<Calendar listing={listing} />);
    calendar.setState({ checkIn: '2019-06-24' });

    const instance = calendar.instance();

    const minDayAwayCheckOut = instance.minDayAwayCheckIn('2019-06-20');
    expect(minDayAwayCheckOut).toBe(true);
  });
});
