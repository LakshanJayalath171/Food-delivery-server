import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { JwtStrategy } from '../auth/jwt.strategy.js';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})

export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly JwtStrategy: JwtStrategy
    ) {}

    afterInit(server: Server) {
        server.use(async(client , next) => {
            try{
                const token = client.handshake.auth.token;
                if(!token) {
                    return next(new Error('unauthorized'));
                }

                const payload = await this.JwtStrategy.validate(token);
                client.data.user = payload;
                next();
            }
            catch(err){
                next(new Error('unauthorized'));
            }
        })
    }

    async handleConnection(client: Socket) {
        const user = client.data.user;

        const userId = user.userId;

        if(user.role !== 'admin') {
            await client.join('admin');
            console.log(`admin joined admin room`);
        }

        if(user.role === 'admin') {
            await client.join(`user-${userId}`);
            console.log(`admin joined user-${userId} room`);
        }
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
}