import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.NODE_ENV === "production"
    ? "https://rollkall.onrender.com"
    : "https://rollkall.onrender.com";

export const socketIO = io(URL);
