import { useEffect, useState, useContext } from 'react';
import ChatView from '../layout/ChatView';
import Sidebar from '../layout/Sidebar';
import { UserProps } from '../types/User';
import { removeClientsDuplications } from '../utils/utils';
import { UserContext, UserContextType } from '../context/UserContext';
import { MessageType } from '../types/Message';

const Chat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useContext(UserContext) as UserContextType;

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
  }

  function handleMessage(ev: MessageEvent<string>) {
    const messageData = JSON.parse(ev.data);
    if ('clients' in messageData) {
      const clients = removeClientsDuplications(messageData.clients, id || '');
      setClients(clients);
    } else if ('message' in messageData) {
      setMessages((prev) => prev.concat(messageData));
    }
  }

  function sendMessage(msg: string) {
    if (!ws) return;
    const messageObj = {
      senderId: id || '',
      recipientId: selectedUserId || '',
      message: msg || '',
    };
    ws.send(JSON.stringify(messageObj));
    const messageObjWithId = { ...messageObj, _id: Date.now().toString() };
    setMessages((prev) => prev.concat(messageObjWithId));
  }

  return (
    <div className='flex h-full'>
      <Sidebar
        onSelectedId={setSelectedUserId}
        selectedUserId={selectedUserId}
        clients={clients}
      />
      <ChatView
        hideTextForm={selectedUserId === null}
        onMessage={sendMessage}
        messages={messages}
      />
    </div>
  );
};

export default Chat;
