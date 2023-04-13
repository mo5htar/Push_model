const http = require("http");
const webSocketServer = require("websocket").server;

let connections = [];

//Create http server
const httpServer = http.createServer();

// creat socket to this server to handshak
const websocket = new webSocketServer({ httpServer: httpServer });

const port = 8080;
httpServer.listen(`${port}`, () =>
  console.log(`Server Connect on port :${port}`)
);

websocket.on("request", (req) => {
  const connection = req.accept(null, req.origin);

  connection.on("message", (message) => {
    //send message that form req user to other connectoin on server  this a push model
    connections.forEach((c) =>
      c.send(`User ${connection.socket.remotePort} Says :${message.utf8Data}`)
    );
  });
  connections.push(connection);

  connections.forEach((c) =>
    c.send(`User${connections.socket.remotePort} Just connected `)
  );
});
