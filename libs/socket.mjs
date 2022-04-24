import http from 'http';
import { Server } from 'socket.io';

const conn = {
    _server: null,
    _instance: null
}
export const useSocket = (app) => {
    if (app && !conn._instance) {
        const server = http.createServer(app);
        const io = new Server(server, {
            cors: {
                origin: '*',
            }
        });

        io.on('connection', (socket) => {
            console.log('connected')
            socket.on('disconnected', () => {
                console.log('disconnected')
            })
        })
        conn._server = server;
        conn._instance = io;
    } 

    return {
        getInstance: () => {
            return conn._instance;
        },
        getServer: () => {
            return conn._server;
        }
    }
}   