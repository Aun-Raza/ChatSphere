import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';

const Navbar = () => {
  const { username } = useContext(UserContext) as UserContextType;
  return (
    <nav className='p-3 border bg-red-400 text-white font-semibold flex'>
      <h1>ChatSphere</h1>
      <ul className='flex-grow flex justify-center gap-6'>
        <li>About Us</li>
        <li>Chat</li>
        <li>Profile</li>
        <li>Login</li>
      </ul>
      {username && <h2>{username}</h2>}
    </nav>
  );
};

export default Navbar;
