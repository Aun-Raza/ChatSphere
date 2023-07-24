import { MessageType } from '../types/Message';
import { UserProps } from '../types/User';

export function removeClientsDuplications(
  dupClients: UserProps[],
  ownId: string
) {
  const dict: { [_id: string]: string } = {};
  dupClients.forEach((client) => {
    const { _id, username } = client;
    dict[_id] = username;
  });
  delete dict[ownId];
  const clients: UserProps[] = [];
  for (const [_id, username] of Object.entries(dict)) {
    clients.push({ _id, username });
  }
  return clients;
}

export function removeMessagesDuplications(dupMessages: MessageType[]) {
  const dict: { [_id: string]: MessageType } = {};
  dupMessages.forEach((msg) => {
    const { _id } = msg;
    dict[_id] = msg;
  });

  const messages: MessageType[] = [];
  for (const messageData of Object.values(dict)) {
    messages.push(messageData);
  }
  return messages;
}
