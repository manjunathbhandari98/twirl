import { Bookmark, Settings, User } from 'lucide-react';
import { useState } from 'react';
import Collections from '../components/my-account/Collections';
import Profile from '../components/my-account/Profile';
import SettingsPage from '../components/my-account/SettingsPage';

const MyAccount = () => {
  const [activeOption, setActiveOption] = useState(1);

  const sidebarOptions = [
    { id: 1, name: 'Profile', icon: <User />, component: <Profile /> },
    {
      id: 2,
      name: 'Collections',
      icon: <Bookmark />,
      component: <Collections />,
    },
    {
      id: 3,
      name: 'Settings',
      icon: <Settings />,
      component: <SettingsPage />,
    },
  ];

  // Get the active component based on selection
  const activeComponent = sidebarOptions.find(
    (o) => o.id === activeOption
  )?.component;

  return (
    <div className="flex gap-2">
      {/* Sidebar */}
      <div className="w-20 hidden sm:w-60 sm:flex flex-col gap-3">
        {sidebarOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setActiveOption(option.id)}
            className={`flex gap-2 rounded-xl cursor-pointer p-3 ${
              activeOption === option.id && 'bg-blue-100 text-purple-950'
            }`}
          >
            {option.icon}
            <p>{option.name}</p>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <div className="w-full p-4 rounded-lg">{activeComponent}</div>
    </div>
  );
};

export default MyAccount;
