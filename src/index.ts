import { HttpServer } from "./httpServer";
import { WsServer } from "./wsServer";
import type { TurnCall } from "./types";

const httpSrv = new HttpServer(3000)
const wsSrv = new WsServer(httpSrv.getServer())

httpSrv.start()
httpSrv.on('turn', (data:TurnCall) => {
    wsSrv.broadcast({accion:'turn', data})
})


setInterval(()=>{ wsSrv.broadcast({accion:'ping'}) }, 4000)