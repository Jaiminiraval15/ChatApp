const express = require('express');
const app = express();
const fs = require('fs');
const server = app.listen(5000);
const io = require('socket.io')(server);

app.get('/', function(req, res) {
    fs.createReadStream('index.html').pipe(res);
});
io.sockets.on("connection", function(client) {
    client.on("message:client", function(data) {
        client.broadcast.emit("message:server", {message: data.message});
    });
    

});
