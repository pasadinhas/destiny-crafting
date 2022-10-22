function nextDayAndTime(dayOfWeek, hour, minute) {
  var now = new Date()
  var result = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + (7 + dayOfWeek - now.getDay()) % 7,
    hour,
    minute)

  if (result < now)
    result.setDate(result.getDate() + 7)

  return result
}

function subtractWeeks(numOfWeeks, date = new Date()) {
  date.setDate(date.getDate() - numOfWeeks * 7);
  return date;
}

function nextWeeklyReset() {
  return nextDayAndTime(2, 18, 0)
}

function lastWeeklyReset() {
  return subtractWeeks(1, nextWeeklyReset())
}

export { nextWeeklyReset, lastWeeklyReset }