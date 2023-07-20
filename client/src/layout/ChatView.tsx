import ChatForm from '../components/ChatForm';
import Messages from '../components/Messages';

const ChatView = () => {
  return (
    <div className='w-2/3 border flex flex-col'>
      <Messages />
      <ChatForm />
    </div>
  );
};

export default ChatView;
