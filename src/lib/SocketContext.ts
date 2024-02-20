import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('ws://localhost:3000');

const SocketContext = createContext(socket);

export default SocketContext;
