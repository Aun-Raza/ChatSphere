const ChatForm = () => {
  return (
    <form className='border p-3 flex gap-1 justify-end'>
      <input type='text' className='border-2 rounded-md p-2 flex-grow' />
      <button className=' rounded-md py-2 px-4 bg-blue-400 text-white text-lg font-semibold'>
        Send
      </button>
    </form>
  );
};

export default ChatForm;
