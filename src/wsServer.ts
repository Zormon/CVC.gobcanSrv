import type { Server } from 'http'
import { EventEmitter } from 'events'
import { WebSocketServer } from 'ws'

export class WsServer extends EventEmitter {
    private httpServer:Server
    private wsServer:WebSocketServer

    constructor(server:Server) {
        super()
        this.httpServer = server
        this.wsServer = new WebSocketServer( {server:this.httpServer} );
    }

    public broadcast(data: Object) {
        this.wsServer.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify(data))
            }
        })
    }
}
