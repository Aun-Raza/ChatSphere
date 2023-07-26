import ws, { WebSocket, WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserProps } from '../types/User';
import { MessageType } from '../types/Message';
dotenv.config();
const { JWT_SECRET } = process.env;
import MessageModel from '../models/Message';
import { v4 as uuidv4 } from 'uuid';

interface CustomClient extends ws {
  _id: string;
  username: string;
}

export default function webSocket(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (client, req) => {
    const cookies = req.headers.cookie;
    if (!cookies) {
      client.close();
      return;
    }

    const tokenString = cookies
      .split(';')
      .find((cookie) => cookie.startsWith('token='));
    if (!tokenString) {
      client.close();
      return;
    }

    const token = tokenString.split('=')[1];
    const foundUser = jwt.verify(token, JWT_SECRET || '') as UserProps;

    if (!foundUser) {
      client.close();
      return;
    }

    const customClient = client as CustomClient;
    customClient._id = foundUser._id;
    customClient.username = foundUser.username;
    broadcastAllClients(wss);

    customClient.on('message', async (buffer) => {
      const { senderId, recipientId, message } = JSON.parse(
        buffer.toString()
      ) as MessageType;

      const messageDoc = await MessageModel.create({
        senderId,
        recipientId,
        message,
      });

      Array.from(wss.clients)
        .filter((client) => (client as CustomClient)._id === recipientId)
        .map((c) =>
          c.send(
            JSON.stringify({
              _id: messageDoc._id,
              senderId,
              recipientId,
              message,
            })
          )
        );
    });
  });

  function broadcastAllClients(wss: ws.Server) {
    const customClients = Array.from(wss.clients) as CustomClient[];
    customClients.forEach((client) => {
      client.send(
        JSON.stringify({
          clients: customClients.map((c) => {
            return { _id: c._id, username: c.username };
          }),
        })
      );
    });
  }
}
