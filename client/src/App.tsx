import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
// import Chat from './pages/Chat';
import LoginRegisterForm from './components/LoginRegisterForm';

function App() {
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
