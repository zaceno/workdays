var normDate = function (d) {
    if (!(d instanceof Date)) return normDate(new Date(d))
    d.setHours(12)
    return d
}
  
var WorkDays = function (oDate, offDates) {
  
  offDates = offDates || [];
  oDate = normDate(oDate || new Date());

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
        var off = (
          d.getDay() === 0 ||
          d.getDay() === 6 ||
          offDates.indexOf(toString(d)) > -1
        );
        return off
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
    d = normDate(d || new Date());
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
