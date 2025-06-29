import { io, Socket } from "socket.io-client";

export const socket: Socket = io("http://localhost:4000");

socket.on('connect', () => console.log('🔌 Connected, socket id =', socket.id));
socket.on('disconnect', () => console.log('🔌 Disconnected'));