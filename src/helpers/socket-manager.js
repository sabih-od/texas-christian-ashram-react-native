import { io } from 'socket.io-client';

let socket = null;

export function connectSocket() {
    console.log('SOCKET_URL => ', process.env.SOCKET_URL);

    socket = io(process.env.SOCKET_URL ? process.env.SOCKET_URL : 'https://texaschristianashram.org:3022');
    // socket = io('ws://172.16.104.225:8028');

    socket.on('connect', () => {
        console.log('connect ', socket)
        console.log('socket?.id => ', socket?.id)
    });

    socket.on('disconnect', () => {
        console.log('disconnect')
    });

    socket.on("connect_error", (error) => {
        console.log('connect_error => ', error);
    });

    // socket?.on('new-message-2', data => {
    //     console.log('new-message-2 => ', data)
    // });

    // socket?.on('new-message-1', data => {
    //     console.log('new-message-1 => ', data)
    // });
}

export function getSocket() {
    return socket;
}

export function emit(eventName, data) {
    if (socket) {
        socket.emit(eventName, data);
    }
}

export function addListener(eventName, callback) {
    if (socket) {
        socket.on(eventName, callback);
    }
}