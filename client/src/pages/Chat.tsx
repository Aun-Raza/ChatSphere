import ChatView from '../layout/ChatView';
import Sidebar from '../layout/Sidebar';

const Chat = () => {
  return (
    <div className='flex h-full'>
      <Sidebar />
      <ChatView />
    </div>
  );
};

export default Chat;
