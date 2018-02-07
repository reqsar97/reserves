import openSocket from "socket.io-client";
const socket = openSocket("http://dargett.loc:8000");

function subscribeToAddReserve(cb) {
  socket.on("addReserve:reserve", data => cb(null, data));
}

function subscribeToReserveArrived(cb) {
  socket.on("reserveArrived:reserve", data => cb(null, data));
}

function subscribeToReserveCancelled(cb) {
  socket.on("reserveCancelled:reserve", data => cb(null, data));
}

function subscribeToOpenTable(cb) {
  socket.on("tableOpen:table", data => cb(null, data));
}

function subscribeToUpdateReserve(cb) {
  socket.on("reserveUpdated:reserve", data => cb(null, data));
}

export {
  subscribeToAddReserve,
  subscribeToReserveArrived,
  subscribeToReserveCancelled,
  subscribeToOpenTable,
  subscribeToUpdateReserve
};
