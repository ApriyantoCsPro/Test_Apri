module.exports = {
  dateComparison: (time1, time2) => {
    // 2004-06-06T01:06:06.359Z
    const year1 = time1.split('-')[0];
    const year2 = time2.split('-')[0];
    const month1 = time1.split('-')[1];
    const month2 = time2.split('-')[1];
    const date1 = time1.split('-')[2].substring(0, 2);
    const date2 = time2.split('-')[2].substring(0, 2);
    const hour1 = time1.split('T')[1].split(':')[0];
    const hour2 = time2.split('T')[1].split(':')[0];
    const min1 = time1.split('T')[1].split(':')[1];
    const min2 = time2.split('T')[1].split(':')[1];
    const sec1 = time1.split('T')[1].split(':')[2].substring(0, 2);
    const sec2 = time2.split('T')[1].split(':')[2].substring(0, 2);

    let diff_year = year2 - year1;
    let diff_month = month2 - month1;
    let diff_date = date2 - date1;
    let diff_hour = hour2 - hour1;
    let diff_min = min2 - min1;
    let diff_sec = sec2 - sec1;

    if (diff_month < 0) {
      diff_month += 12;
      diff_year--;
    } else if (diff_month >= 12) {
      diff_month -= 12;
    }
    if (diff_date < 0) {
      diff_date += 30;
      diff_month--;
    } else if (diff_date >= 30) {
      diff_date -= 30;
      diff_month++;
    }
    if (diff_hour < 0) {
      diff_hour += 24;
      diff_date--;
    } else if (diff_hour >= 24) {
      diff_hour -= 24;
      diff_date++;
    }
    if (diff_min < 0) {
      diff_min += 60;
      diff_hour--;
    } else if (diff_min >= 60) {
      diff_min -= 60;
      diff_hour++;
    }
    if (diff_sec < 0) {
      diff_sec += 60;
      diff_min--;
    } else if (diff_sec >= 60) {
      diff_sec -= 60;
      diff_min++;
    }
    return { year: diff_year > 0 ? diff_year : 0, month: diff_month, date: diff_date, hour: diff_hour, minute: diff_min, second: diff_sec }
  }
}