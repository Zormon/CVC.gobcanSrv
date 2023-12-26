import request from 'supertest';
import { HttpServer } from "../src/httpServer";

const httpSrv = new HttpServer(3000)
const server = httpSrv.getServer();

beforeAll(() => {
    httpSrv.start();
});

describe('Test', () => {
    it('Test endpoint', async () => {
        const response = await request(server).get('/test')
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('application/json');
        expect(response.body).toEqual({status: 'ok'});
    });
});

describe('Turns', () => {
    it('Turn endpoint', async () => {
        const response = await request(server).get('/turn?code=123&name=Juan&color=red')
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('application/json');
        expect(response.body).toEqual({code: '123', name: 'Juan', color: 'red'});
    });

    it('Turn endpoint with invalid color', async () => {
        const response = await request(server).get('/turn?code=123&name=Juan&color=invalid')
        expect(response.status).toBe(400);
    });

    it('Turn endpoint without params', async () => {
        const response = await request(server).get('/turn')
        expect(response.status).toBe(400);
    });

    it('Turn endpoint without code', async () => {
        const response = await request(server).get('/turn?name=Juan&color=red')
        expect(response.status).toBe(400);
    });

    it('Turn endpoint without name', async () => {
        const response = await request(server).get('/turn?code=123&color=red')
        expect(response.status).toBe(400);
    });

    it('Turn endpoint without color', async () => {
        const response = await request(server).get('/turn?code=123&name=Juan')
        expect(response.status).toBe(400);
    });
});

describe('Control', () => {
    it('Control endpoint', async () => {
        const response = await request(server).get('/control')
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toBe('text/html');
    });

    
    it('Control endpoint with invalid path', async () => {
        const response = await request(server).get('/control/invalid')
        expect(response.status).toBe(404);
    });

    it('Control endpoint with query params', async () => {
        const response = await request(server).get('/control?code=123')
        expect(response.status).toBe(400);
        const response2 = await request(server).get('/control?noexpected')
        expect(response2.status).toBe(400);
    });
});

afterAll(() => {
    httpSrv.stop();
});