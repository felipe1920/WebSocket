const WebSocket = require('ws');
const url = require('url');

const server = new WebSocket.Server({ port: 8080 });
const clients = new Map(); // Armazena o identificador de cada cliente

server.on('connection', function connection(ws, req) {
  const query = url.parse(req.url, true).query;
  const userId = query.userId;

  clients.set(ws, userId); // Armazena o identificador na lista de clientes conectados

  console.log(`Nova conexão estabelecida para o usuário ${userId}.`);

  ws.on('message', function incoming(message) {
    console.log(`Mensagem recebida do usuário ${userId}: ${message}`);

    // Envia a mensagem de volta para o cliente
    ws.send(`Servidor: Você enviou a seguinte mensagem: ${message}`);
  });

  ws.on('close', function close() {
    console.log(`Conexão encerrada para o usuário ${userId}.`);

    clients.delete(ws); // Remove o identificador da lista de clientes conectados
  });
});

console.log(`WebSocket - Server`);