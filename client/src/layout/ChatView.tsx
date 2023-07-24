import ChatForm from '../components/ChatForm';
import Messages from '../components/Messages';
import { MessageType } from '../types/Message';

const ChatView = ({
  onMessage,
  hideTextForm,
  messages,
}: {
  onMessage: (msg: string) => void;
  hideTextForm: boolean;
  messages: MessageType[];
}) => {
  return (
    <div className='w-2/3 border flex flex-col'>
      <Messages messages={messages} />
      {!hideTextForm && <ChatForm onMessage={onMessage} />}
    </div>
  );
};

export default ChatView;
