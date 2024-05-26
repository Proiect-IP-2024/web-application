import { io, Socket } from 'socket.io-client';

const URL = 'http://localhost:4000';  // Adjust the URL as needed
let socket: Socket;

export const initiateSocketConnection = (): void => {
  socket = io(URL);
  console.log('Connecting socket...');
};

export const disconnectSocket = (): void => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

export const subscribeToPulseUpdates = (cb: (err: Error | null, data?: any) => void): void => {
  if (!socket) return;
  socket.on('pulseUpdate', (data: any) => {
    cb(null, data);
  });
};

export const joinRoom = (CNP_pacient: number): void => {
  if (socket) socket.emit('joinRoom', { CNP_pacient });
};

export const leaveRoom = (CNP_pacient: number): void => {
  if (socket) socket.emit('leaveRoom', { CNP_pacient });
};
