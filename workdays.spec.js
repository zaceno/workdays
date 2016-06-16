var assert = require('assert');
var WorkDays = require('./workdays.js');
//start midweek just count around
var tests = [
  {s: '2016-06-15', n: -2, d: '2016-06-13'},
  {s: '2016-06-15', n: -1, d: '2016-06-14'},
  {s: '2016-06-15', n: 0, d: '2016-06-15'},
  {s: '2016-06-15', n: 1, d: '2016-06-16'},
  {s: '2016-06-15', n: 2, d: '2016-06-17'},

  //start before weekend. prev yields day before, next two yield same day, next third yields weekend
  {s: '2016-06-10', n: -1, d: '2016-06-09'},
  {s: '2016-06-10', n: 0, d: '2016-06-10'},
  {s: '2016-06-10', n: 1, d: '2016-06-13'},

  //start after weekend. prev yields last friday,
  {s: '2016-06-13', n: -1, d: '2016-06-10'},
  {s: '2016-06-13', n: 0, d: '2016-06-13'},
  {s: '2016-06-13', n: 1, d: '2016-06-14'},

  //start on sunday, 0 yields prev weekday, 1 next, -1 also yields prev weekday
  {s: '2016-06-12', n: -1, d: '2016-06-09'},
  {s: '2016-06-12', n: 0, d: '2016-06-10'},
  {s: '2016-06-12', n: 1, d: '2016-06-13'},

  //start on saturday, 0 yields prev weekday, 1 next, -1 also yields prev weekday
  {s: '2016-06-11', n: -1, d: '2016-06-09'},
  {s: '2016-06-11', n: 0, d: '2016-06-10'},
  {s: '2016-06-11', n: 1, d: '2016-06-13'},

  {s: '2016-06-02', n: 1, d: '2016-06-06'},
  {s: '2016-06-02', n: 2, d: '2016-06-09'},
  {s: '2016-06-03', n: -1, d: '2016-06-01'},
  {s: '2016-06-03', n: 0, d: '2016-06-02'},
  {s: '2016-06-03', n: 1, d: '2016-06-06'},
  {s: '2016-06-03', n: 2, d: '2016-06-09'},
  {s: '2016-06-06', n: -2, d: '2016-06-01'},
  {s: '2016-06-06', n: -1, d: '2016-06-02'},
  {s: '2016-06-06', n: 0, d: '2016-06-06'},
  {s: '2016-06-06', n: 1, d: '2016-06-09'},
  {s: '2016-06-06', n: 2, d: '2016-06-10'},
];
var offDates = [
  '2016-06-03',
  '2016-06-07',
  '2016-06-08',
];

/*
  Basic behavior:

  a regular day counts itself as day 0,
  a weekend or holiday counts its last previous working day as day 0,

*/

describe('getDate', function () {
  tests.forEach(function (t) {
    it(t.s + ' add ' + t.n + ' work days => ' + t.d, function () {
      var w = new WorkDays(t.s, offDates);
      var d = w.getDate(t.n).toISOString().substr(0, 10);
      assert.equal(d, t.d);
    });
  });
});
describe('getDays', function () {
  tests.forEach(function (t) {
    it ('start: ' + t.s + ', end: ' + t.d + ', has ' + t.n + ' days', function () {
      var w = new WorkDays(t.s, offDates)
      var n = w.getDays(t.d);
      assert.equal(n, t.n);
    });
  });
});
