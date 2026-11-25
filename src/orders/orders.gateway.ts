import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { JwtStrategy } from '../auth/jwt.strategy.js';
import { JwtService } from '@nestjs/jwt';

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
    private readonly JwtStrategy: JwtStrategy,
    private readonly JwtService: JwtService,
  ) {}

  afterInit(server: Server) {
    server.use(async (client, next) => {
      try {
        const token = client.handshake.auth.token;

        if (!token) {
          return next(new Error('Unauthorized'));
        }

        // Verify and decode JWT
        const payload = await this.JwtService.verifyAsync(token);

        // Transform decoded payload using JwtStrategy
        const user = this.JwtStrategy.validate(payload);

        client.data.user = user;

        next();
      } catch (error) {
        next(new Error('Unauthorized'));
      }
    });
  }

  async handleConnection(client: Socket) {
    const user = client.data.user;

    console.log('Decoded JWT Payload:', user);

    const userId = user.user_id;

    if (user.role === 'admin') {
      await client.join('admin');
      console.log('Admin joined admin room');
    } else {
      await client.join(`user:${userId}`);
      console.log(`Customer joined user:${userId} room`);
    }

    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket, reason?: string) {
    console.log(`Client disconnected: ${client.id}`, reason ?? '');
  }
}
