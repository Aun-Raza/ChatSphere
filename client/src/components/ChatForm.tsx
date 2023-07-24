import { useState } from 'react';

const ChatForm = ({ onMessage }: { onMessage: (msg: string) => void }) => {
  const [newMessage, setNewMessage] = useState('');

  return (
    <form className='border p-3 flex gap-1 justify-end'>
      <input
        type='text'
        value={newMessage}
        onChange={(ev) => setNewMessage(ev.target.value)}
        className='border-2 rounded-md p-2 flex-grow'
      />
      <button
        onClick={() => onMessage(newMessage)}
        type='button'
        className=' rounded-md py-2 px-4 bg-blue-400 text-white text-lg font-semibold'
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
