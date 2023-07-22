import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Chat from './pages/Chat';
import LoginRegisterForm from './pages/LoginRegisterForm';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className='flex-grow'>
        <RouterRoutes>
          <Route index path='/' element={<LoginRegisterForm />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='*' element={null} />
        </RouterRoutes>
      </main>
      <Footer />
    </div>
  );
};

export default Routes;
