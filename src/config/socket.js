import { io } from "socket.io-client";
import { serverPath } from "./keys";
const socket = io.connect(serverPath, {
  transports: ["websocket", "polling"],
  rejectUnauthorized: false,
  reconnection: false,
});
socket.on("connect", () => {
  const userid = localStorage.getItem("luckyBox#@user");
  if (userid) {
    socket.emit("join", userid);
  }
});

socket.on("disconnect", () => {
  console.log("Socket Disconnected");
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
const tryReconnect = () => {
  setTimeout(() => {
    socket.io.open((err) => {
      if (err || socket.disconnected) {
        tryReconnect();
      }
    });
  }, 2000);
};
socket.io.on("close", tryReconnect);
export { socket };
