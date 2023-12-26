import type WebSocketServer from 'ws';
import { extname, dirname } from 'path'
import { fileURLToPath } from 'url';

export function mod(n:number, m:number):number {
    return ((n % m) + m) % m;
  }

export function getContentType(filename: string): string {
    switch ( extname(filename) ) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.jpg':
            return 'image/jpeg';
        case '.svg':
            return 'image/svg+xml';
        case '.png':
            return 'image/png';
        case '.json':
            return 'application/json';
        default:
            return 'application/octet-stream';
    }
}

export function cloneObject(o:Object):Object {
    return JSON.parse(JSON.stringify(o));
}


/*----------  Envia un mensaje a todos los clientes conectados por websocket  ----------*/
/*
export function broadcast(data:MediaEvent, ws:WebSocketServer) {
    if (data) {
        for (let i=0; i < ws.connections.length; i++) {
            ws.connections[i].sendUTF( JSON.stringify(data) )
        }
    }
}*/