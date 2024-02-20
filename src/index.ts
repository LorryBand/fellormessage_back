import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ExpressPeerServer } from 'peer';
import { CustomConfigPeer } from './interfaces';
import { peerId } from './functions';

dotenv.config();

const app = express();
const port = process.env.PORT || 4444;

app.use(express.json());
const server = createServer(app);
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/',
  generateClientId: peerId,
} as CustomConfigPeer);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.use('/peer', peerServer);

io.on('connection', function (socket) {
  console.log('peer connected');
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(peerId());
});
