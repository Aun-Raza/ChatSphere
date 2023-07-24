import { UserProps } from '../types/User';

const Sidebar = ({
  clients,
  selectedUserId,
  onSelectedId,
}: {
  clients: UserProps[];
  selectedUserId: string | null;
  onSelectedId: (id: string) => void;
}) => {
  return (
    <div className='w-1/3 border'>
      {clients.map(({ _id, username }) => (
        <div
          className={
            'flex gap-2 items-center p-3 hover:bg-slate-300 cursor-pointer ' +
            (_id === selectedUserId ? 'bg-slate-300' : '')
          }
          onClick={() => onSelectedId(_id)}
        >
          <div className='bg-blue-400 w-8 h-8 rounded-full'></div>
          <div className='text-lg'>{username}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
