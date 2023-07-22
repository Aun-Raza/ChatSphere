import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
// import Chat from './pages/Chat';
import LoginRegisterForm from './pages/LoginRegisterForm';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className='flex-grow'>
        <LoginRegisterForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
