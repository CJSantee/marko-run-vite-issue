import { Server } from 'socket.io';

console.log('socket.ts');

let io: Server; 

export const initSocketServer = (server) => {
  io = new Server(server);
}

export const emitToSocket = (ev, data) => {
  io.emit(ev, data);
}