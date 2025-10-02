import { Bell, Home, Plus, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Bottombar = () => {
  const navItems = [
    { icon: <Home />, link: '/' },
    { icon: <Search />, link: '/search' },
    { icon: <Plus />, link: '/create-post' },
    { icon: <Bell />, link: '/notification' },
    { icon: <Settings />, link: '/settings' },
  ];

  return (
    <div
      className="p-5 shadow-2xl fixed bottom-0 w-full flex sm:hidden justify-between items-center"
      style={{ background: 'var(--bg-color)' }}
    >
      {navItems.map((item, index) => (
        <Link to={item.link} className="p-1" key={index}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Bottombar;
