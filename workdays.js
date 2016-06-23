

var WorkDays = function (oDate, offDates) {

  offDates = offDates || [];
  oDate = oDate || new Date();
  if (!(oDate instanceof Date)) oDate = new Date(oDate);

  var nextOn = function (d, n) {
        d.setDate(d.getDate() + n);
        return isOff(d) ? nextOn(d, n) : d;
      },
      toString = function (d) {
        return d.toISOString().substr(0, 10);
      },
      sameDate = function (d1, d2) {
        return toString(d1) === toString(d2);
      },
      isOff = function (d) {
        return (
          d.getDay() === 0 ||
          d.getDay() === 6 ||
          offDates.indexOf(toString(d)) > -1
        );
      },
      startOnWorkDay = function (d) {
        d = new Date(d.getTime());
        if (isOff(d)) d = nextOn(d, -1);
        return d;
      };

  this.getDate = function (n) {
    var d = startOnWorkDay(oDate),
        steps = Math.abs(n);

    if (steps === 0) return d;

    n = n / steps;
    for (var i = 0; i < steps; i++) d = nextOn(d, n);

    return d;
  };

  this.getDays = function (d) {
    d = d || new Date();
    if (!(d instanceof Date)) d = new Date(d);

    var d1 = startOnWorkDay(oDate),
        d2 = startOnWorkDay(d),
        c = 0,
        i = (d1 < d2) ? 1 : -1;

    while(!sameDate(d1, d2)) {
      c += i;
      d1 = nextOn(d1, i);
    };

    return c;
  };
};

module.exports = WorkDays;
