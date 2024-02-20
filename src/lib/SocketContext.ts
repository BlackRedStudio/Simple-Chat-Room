import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('ws://localhost:3002');

const SocketContext = createContext(socket);

export default SocketContext;
