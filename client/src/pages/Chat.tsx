import { useEffect, useState } from 'react';
import ChatView from '../layout/ChatView';
import Sidebar from '../layout/Sidebar';
import { UserProps } from '../types/User';

const Chat = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    connectToWs();
  }, []);

  const [clients, setClients] = useState<UserProps[]>([]);

  function connectToWs() {
    const ws = new WebSocket('ws://localhost:3000');
    setWs(ws);
    ws.addEventListener('open', (ev: Event) => {
      console.log('Connection established', ev);
    });
    ws.addEventListener('message', handleMessage);
    ws.addEventListener('close', () => {
      setTimeout(() => {
        console.log('Disconnected. Trying to reconnect.');
        connectToWs();
      }, 1000);
    });
  }

  function handleMessage(ev: MessageEvent<string>) {
    const messageData = JSON.parse(ev.data);
    if ('clients' in messageData) {
      removeClientsDuplications(messageData.clients);
    }
  }

  function removeClientsDuplications(dupClients: UserProps[]) {
    const dict: { [_id: string]: string } = {};
    dupClients.forEach((client) => {
      const { _id, username } = client;
      dict[_id] = username;
    });
    const clients: UserProps[] = [];
    for (const [_id, username] of Object.entries(dict)) {
      clients.push({ _id, username });
    }
    setClients(clients);
  }

  return (
    <div className='flex h-full'>
      <Sidebar
        onSelectedId={setSelectedUserId}
        selectedUserId={selectedUserId}
        clients={clients}
      />
      <ChatView />
    </div>
  );
};

export default Chat;
