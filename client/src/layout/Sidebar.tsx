import { useContext } from 'react';
import { UserProps } from '../types/User';
import { UserContext, UserContextType } from '../context/UserContext';
import { removeClientsDuplications } from '../utils/utils';

const Sidebar = ({
  clients,
  selectedUserId,
  onSelectedId,
}: {
  clients: UserProps[];
  selectedUserId: string | null;
  onSelectedId: (id: string) => void;
}) => {
  const { id } = useContext(UserContext) as UserContextType;

  return (
    <div className='w-1/3 border'>
      {removeClientsDuplications(clients, id || '').map(({ _id, username }) => (
        <div
          className={
            'flex gap-2 items-center p-3 hover:bg-slate-300 cursor-pointer ' +
            (_id === selectedUserId ? 'bg-slate-300' : '')
          }
          onClick={() => onSelectedId(_id)}
          key={_id}
        >
          <div className='bg-blue-400 w-8 h-8 rounded-full'></div>
          <div className='text-lg'>{username}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
