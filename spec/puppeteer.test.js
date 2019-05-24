import puppeteer from 'puppeteer';
import moment from 'moment';
import App from '../client/src/components/App.jsx';

const url = 'http://localhost:3005/';
let page;
let browser;
const width = 1440;
const height = 900;


beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(() => {
  browser.close();
});

describe('Button Test Suite', () => {
  beforeEach(async () => {
    await page.goto(url, { waitUntil: 'networkidle2' });
  });

  test('Previous Month click', async () => {
    await page.click('#prevMonth');

    const currentValue = await page.$eval('.current-month-calendar', e => e.textContent);
    const prevMonth = moment().subtract(1, 'months').format('MMMM YYYY');
    const currentMonth = moment().format('MMMM YYYY');

    const nextValue = await page.$eval('.next-month-calendar', e => e.textContent);
    expect(currentValue).toEqual(prevMonth);
    expect(nextValue).toEqual(currentMonth);
  });

  test('Previous Month Clicked 2 Times', async () => {
    await page.click('#prevMonth');
    await page.click('#prevMonth');

    const currentValue = await page.$eval('.current-month-calendar', e => e.textContent);
    const prevMonth = moment().subtract(2, 'months').format('MMMM YYYY');
    const currentMonth = moment().subtract(1, 'months').format('MMMM YYYY');

    const nextValue = await page.$eval('.next-month-calendar', e => e.textContent);
    expect(currentValue).toEqual(prevMonth);
    expect(nextValue).toEqual(currentMonth);
  });

  test('Current Month ', async () => {
    const value = await page.$eval('.current-month-calendar', e => e.textContent);
    const currentMonth = moment().format('MMMM YYYY');

    expect(value).toEqual(currentMonth);
  });

  test('Next Month Click ', async () => {
    await page.click('#nextMonth');

    const currentValue = await page.$eval('.current-month-calendar', e => e.textContent);
    const nextValue = await page.$eval('.next-month-calendar', e => e.textContent);
    const nextMonth = moment().add(1, 'months').format('MMMM YYYY');
    const nextNextMonth = moment().add(2, 'months').format('MMMM YYYY');


    expect(currentValue).toEqual(nextMonth);
    expect(nextValue).toEqual(nextNextMonth);
  });

  test('Next Month Clicked 2 Times ', async () => {
    await page.click('#nextMonth');
    await page.click('#nextMonth');

    const currentValue = await page.$eval('.current-month-calendar', e => e.textContent);
    const nextValue = await page.$eval('.next-month-calendar', e => e.textContent);
    const nextMonth = moment().add(2, 'months').format('MMMM YYYY');
    const nextNextMonth = moment().add(3, 'months').format('MMMM YYYY');


    expect(currentValue).toEqual(nextMonth);
    expect(nextValue).toEqual(nextNextMonth);
  });
});

describe('Clear Date Button Test Suite', () => {
  beforeEach(async () => {
    await page.goto(url, { waitUntil: 'networkidle2' });
  });

  test('On page start clear date does not exist', async () => {
    const clearButtonCount = await page.$$eval('#clearDate', button => button.length);
    expect(clearButtonCount).toBe(0);
  });

  test('Click a calendar day and expect Clear date to pop up', async () => {
    await page.click('#click');
    await page.waitFor(2000);
    const clearButtonCount = await page.$$eval('#clearDate', button => button.length);

    expect(clearButtonCount).toBe(1);
  });

  test('Clicking clear date should make clear date button dissapear', async () => {
    await page.click('#click');
    await page.waitFor(2000);
    await page.click('#clearDate');
    const clearButtonCount = await page.$$eval('#clearDate', button => button.length);
    expect(clearButtonCount).toBe(0);
  });
});

describe('Min Day Span Test Suite', () => {
  beforeEach(async () => {
    await page.goto(url, { waitUntil: 'networkidle2' });
  });

  test('No day clicked then no min day div', async () => {
    const minNightSpanCount = await page.$$eval('#minNightsSpan', span => span.length);
    expect(minNightSpanCount).toBe(0);
  });

  test('Click a calendar day and expect min day to span pop up', async () => {
    await page.click('#click');
    await page.waitFor(2000);
    const minNightSpanCount = await page.$$eval('#minNightsSpan', span => span.length);
    expect(minNightSpanCount).toBe(1);
  });

  test('When clearDate is picked then min day span should be gone', async () => {
    await page.click('#click');
    await page.waitFor(2000);
    await page.click('#clearDate');
    const minNightSpanCount = await page.$$eval('#minNightsSpan', span => span.length);
    expect(minNightSpanCount).toBe(0);
  });

  // test('Clicked checkin and checkout day expect min day be gone', async () => {
  //   await page.click('#click');
  //   await page.waitFor(2000);
  //   await page.click('#click');
  //   await page.waitFor(2000);
  //   const minNightSpanCount = await page.$$eval('#minNightsSpan', span => span.length);
  //   expect(minNightSpanCount).toBe(0);
  // });
});
