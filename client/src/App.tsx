import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Chat from './pages/Chat';

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className='flex-grow'>
        <Chat />
      </main>
      <Footer />
    </div>
  );
}

export default App;
