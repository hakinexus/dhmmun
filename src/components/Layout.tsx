import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-on-primary overflow-x-hidden w-full">
      <ScrollProgress />
      <Navbar />
      <div className="flex-grow flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
