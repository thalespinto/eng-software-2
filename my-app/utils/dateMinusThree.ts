export const dateMinusXhours = (date: Date, hours: number) => {
  var timestamp = date.getTime();

  var newTimestamp = timestamp - hours * 60 * 60 * 1000;
  var newDate = new Date(newTimestamp);

  return newDate;
};
