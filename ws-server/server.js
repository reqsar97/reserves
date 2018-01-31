// const io = require("socket.io")();
//
// io.on("connection", client => {
//     client.on("subscribeToTimer", interval => {
//         console.log("client is subscribing to timer with interval ", interval);
//         setInterval(() => {
//             client.emit("timer", new Date());
//         }, interval);
//     });
// });
//
// const port = 8000;
// io.listen(port);
// console.log("listening on port ", port);

//resis
const Redis = require("ioredis");
const redis = new Redis();
const io = require("socket.io")(8000);

redis.psubscribe("*", function(err, count) {
    console.log(err);
    console.log(count);
});

redis.on("pmessage", function(pattern, channel, message) {
    console.log(message);
    message = JSON.parse(message);
    console.log(message);
    io.emit(channel + ":" + message.event, message.data.reserve);
    console.log(channel + ":" + message.event);
});

redis.on("error", function(err) {
    console.log(err);
});
