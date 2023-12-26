import type { TurnCall } from './types'
import { Color } from './types'
import type { Server } from 'http'
import { EventEmitter } from 'events'
import WebSocket from 'ws'

export class WebSocketServer extends EventEmitter {
    private httpServer:Server
    private wsServer:WebSocket.Server

    constructor(server:Server) {
        super()
        this.httpServer = server
        this.wsServer = new WebSocket.Server( {server:this.httpServer} );

        this.wsServer.on('connection', (ws: WebSocket) => {
            ws.on('message', (message: string) => {
                try {
                    const data = JSON.parse(message)
                    this.emit('message', data)
                } catch (error) {
                    console.error('Failed to parse WebSocket message:', error)
                }
            })
        })
    }
}
