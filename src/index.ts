import { HttpServer } from "./httpServer";

const httpSrv = new HttpServer(3000)
httpSrv.start()

httpSrv.on('turn', (data) => {
    console.log(data)
})

/*
const wss = new WebSocketServer( {server:httpSrv} );
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const msg = JSON.parse(message.toString())
        const action = msg.action ?? ''

        switch (action) {
            case 'turn':
                ws.send('turn')
                break;

            case 'ticket':
                ws.send('ticket')
                break;

            case 'pan':
                ws.send('pan')
                break;
        
            default:
                ws.send('no mode')
                break;
        }
    })
})
*/
