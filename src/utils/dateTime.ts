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

function convertToHMInString(value: string): string {
  const sec = parseInt(value, 10);
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const seconds = sec - hours * 3600 - minutes * 60;
  let hrs: string = "0";
  let mins: string = "0";
  //let s: string = "0";
  if (hours < 10) {
    hrs = "0" + hours;
  }
  if (minutes < 10) {
    mins = "0" + minutes;
  }
  if (seconds < 10) {
    // s = "0" + seconds;
  }
  return hrs + "h " + mins + "m";
}

function changeToSeconds(time: string): number {
  /// time should be in the format 00:00
  const hours: number = Number(time.split(":")[0]);
  const mins: number = Number(time.split(":")[1]);
  const secs = hours * 60 * 60 + mins * 60;
  return secs;
}

function sqlTimestampToJs(date: string) {
  const t = date.split(/[- :]/);
  const newDate = new Date(
    Date.UTC(
      Number(t[0]),
      Number(t[1]) - 1,
      Number(t[2]),
      Number(t[3]),
      Number(t[4]),
      Number(t[5])
    )
  );
  return newDate;
}

const convertDateToString = (dateTime: string) => {
  const date = dateTime.split("T")[0];
  const time = dateTime.split("T")[1].split(".")[0];
  const dateA = `${date} ${time}`;
  const dateToString = sqlTimestampToJs(dateA).toDateString();
  return dateToString;
};

export {
  convertToHM,
  changeToSeconds,
  convertToHMInString,
  convertDateToString,
};
