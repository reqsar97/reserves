import openSocket from "socket.io-client";
const host = process.env.NODE_ENV === 'production' ? "http://212.92.98.211:8000" : 'http://dargett.loc:8000';
const socket = openSocket(host);

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
