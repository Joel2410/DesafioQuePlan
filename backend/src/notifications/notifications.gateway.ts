import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Data } from '../interfaces';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway {
  /* `@WebSocketServer()` is a decorator provided by the `@nestjs/websockets` package. It is used to
  mark a property as the WebSocket server instance within a WebSocket gateway class. */
  @WebSocketServer()
  server: Server;

  /**
   * The send function emits a 'newMessage' event to the server with the provided data.
   * @param {Data} data - The data parameter is of type Data, which means it is expected to be an
   * object that contains information to be sent.
   */
  send(data: Data) {
    this.server.emit('newMessage', data);
  }
}
