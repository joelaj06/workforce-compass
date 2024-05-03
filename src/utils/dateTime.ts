function convertToHM(value: string | number): string {
  let sec: number;
  if (typeof value === "string") sec = parseInt(value, 10);
  else sec = value;
  let hours: string = Math.floor(sec / 3600).toPrecision(2);
  let minutes: string = Math.floor(
    (sec - Number(hours) * 3600) / 60
  ).toPrecision(2);
  let seconds: string = (
    sec -
    Number(hours) * 3600 -
    Number(minutes) * 60
  ).toPrecision(2);
  if (Number(hours) < 10) {
    hours = "0" + hours;
  }
  if (Number(minutes) < 10) {
    minutes = "0" + minutes;
  }
  if (Number(seconds) < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes;
}

export { convertToHM };
