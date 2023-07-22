import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { UserProps } from '../types/User';

const LoginRegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleFormSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setErrorMsg('');

    try {
      const url = isLogin ? '/login' : '/register';
      const { data } = await axios.post<UserProps>(url, { username, password });
      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('ERROR', error);
        const newErrorMsg: string = error.response?.data.error;
        setErrorMsg(newErrorMsg);
      }
    }
  }

  return (
    <div className='flex flex-col h-full mt-12'>
      <div className='w-min mx-auto border p-8 rounded-md'>
        <h2 className='text-center font-semibold text-4xl mb-4'>
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-3'>
          <fieldset className='flex items-center'>
            <label className='text-lg w-24' htmlFor='username'>
              Username
            </label>
            <input
              id='username'
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              className='border rounded-md p-1'
            />
          </fieldset>
          <fieldset className='flex items-center'>
            <label className='text-lg w-24' htmlFor='password'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className='border rounded-md p-1'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </fieldset>
          {errorMsg && (
            <div className='border border-red-500 text-red-600 p-1 pt-0'>
              {errorMsg}
            </div>
          )}
          <button className='block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            {isLogin ? 'Login' : 'Register'}
          </button>
          {isLogin && (
            <p>
              Don't have an account?{' '}
              <a
                onClick={() => setIsLogin(false)}
                className='underline text-purple-500 cursor-pointer'
              >
                Register here
              </a>
            </p>
          )}
          {!isLogin && (
            <p>
              Already have an account?{' '}
              <a
                onClick={() => setIsLogin(true)}
                className='underline text-purple-500 cursor-pointer'
              >
                Login here
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
