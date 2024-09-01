function convertSecToHM(seconds: string | number): string {
  if (typeof seconds === "string") {
    seconds = parseInt(seconds, 10);
  }

  const dateTime = new Date(seconds * 1000);
  const time = new Date(dateTime).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
  // console.log(dateTime);
  // const hours = Math.floor(seconds / 3600);
  // const minutes = Math.floor((seconds % 3600) / 60);
  // return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
  //   2,
  //   "0"
  // )}`;
}

function convertToHMInString(seconds: string): string {
  const hours = Math.floor(Number(seconds) / 3600);
  const minutes = Math.floor((Number(seconds) % 3600) / 60);
  return `${hours}hr ${minutes}m`;
}

function changeToSeconds(time: string): number {
  /// time should be in the format 00:00
  if (time == "") return 0;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60;
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
  convertSecToHM as convertToHM,
  changeToSeconds,
  convertToHMInString,
  convertDateToString,
};
