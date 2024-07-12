import type { TurnCall } from './types'
import { Color } from './types'
import { createServer, IncomingMessage, ServerResponse, OutgoingHttpHeaders } from 'http'
import { existsSync, readFile } from 'node:fs'
import { getContentType } from './utils'
import { EventEmitter } from 'events'

export class HttpServer extends EventEmitter {
    private port: number = 80
    private server = createServer((req: IncomingMessage, res: ServerResponse) => {
        console.log('req' + req.url)
        if (!req.url) { return }

        const url = new URL(req.url, `http://${req.headers.host}`)
        const parts = url.pathname.split('/')
        const action = parts[1]

        switch (action) {
            case 'test':
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.write(JSON.stringify({ status: 'ok' }))
                res.end()
            break

            case 'control':
                if (!!parts[2])                     { res.writeHead(404).end(); return; }
                if (url.searchParams.toString())    { res.writeHead(400).end(); return;}

                readFile(`./static/control/index.html`, 'binary', (err, file) => {
                    if (err) {
                        res.writeHead(404).end();
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(file, 'binary');
                    res.end();
                });
            break;

            case 'turn':
                const code = url.searchParams.get('code')
                const name = url.searchParams.get('name')
                const color = url.searchParams.get('color')

                if ( !code || !name || !color || !Object.values(Color).includes(color as Color) ) {
                    res.writeHead(400, { 'Content-Type': 'application/json' }).end()
                    return
                }

                const params: TurnCall = {
                    code: code,
                    name: name,
                    color: color as Color,
                }

                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.write(JSON.stringify(params))
                res.end()

                this.emit('turn', params)
            break

            default:
                const filename = `./static/` + new URL(req?.url ?? '', `http://${req.headers.host}`).pathname
                
                if ( existsSync(filename) ) {
                    let headers:OutgoingHttpHeaders = {}
                    headers['Content-Type'] = getContentType(filename)
    
                    readFile(filename, 'binary', (err, file)=> {
                        res.writeHead(200, headers)
                        res.write( file, 'binary' )
                        res.end()
                    })
                } else {
                    res.writeHead( 404, {'Content-Type': 'text/plain'} ).end()
                }
            break;
        }
    })
    

    constructor(port: number) {
        super()
        this.port = port
    }

    public getServer() {
        return this.server
    }

    public start() {
        this.server.listen(this.port)
        console.log(`Server running at http://localhost:${this.port}/`)
    }

    public stop() {
        this.server.close()
    }
}