import ws, { WebSocket, WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserProps } from '../types/User';
import { IncomingMessage } from 'http';
dotenv.config();
const { JWT_SECRET } = process.env;

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
