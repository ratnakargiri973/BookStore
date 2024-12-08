import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-start bg-gray-100 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
