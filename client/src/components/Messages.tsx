import { MessageType } from '../types/Message';
import { removeMessagesDuplications } from '../utils/utils';
import { UserContext, UserContextType } from '../context/UserContext';
import { useContext } from 'react';

const Messages = ({ messages }: { messages: MessageType[] }) => {
  const { id } = useContext(UserContext) as UserContextType;

  return (
    <div className='border flex-grow'>
      {removeMessagesDuplications(messages).map(
        ({ _id, message, senderId }) => (
          <div
            key={_id}
            className={'flex my-2 ' + (senderId === id ? '' : 'justify-end')}
          >
            <div
              className={
                'border py-2 px-3 rounded-md ' +
                (senderId === id ? 'bg-blue-400 text-white ms-1' : 'me-1')
              }
            >
              {message}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Messages;
