import axios from 'axios';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { UserProps } from '../types/User';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode | ReactNode[];
}

export interface UserContextType {
  username: string | null;
  setUsername: (value: string | null) => void;
  id: string | null;
  setId: (value: string | null) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: Props) {
  const [id, setId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth();
  }, []);

  async function auth() {
    await axios
      .get<UserProps>('/auth')
      .then((res) => {
        const { _id, username } = res.data;
        setId(_id);
        setUsername(username);
        navigate('/chat');
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((_) => {
        navigate('/');
      });
  }

  return (
    <UserContext.Provider value={{ id, setId, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
