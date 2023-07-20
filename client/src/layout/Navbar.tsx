const Navbar = () => {
  return (
    <nav className='p-3 border bg-red-400 text-white font-semibold flex justify-between'>
      <h1>ChatSphere</h1>
      <ul className='flex-grow flex justify-center gap-12'>
        <li>Chat</li>
        <li>Profile</li>
        <li>Login</li>
      </ul>
    </nav>
  );
};

export default Navbar;
