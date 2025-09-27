import { Bell, Bookmark, LogOut, Search, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../data/profile";
import { toggleNotificationModal } from "../../redux/NotificationSlice";
import { openModal } from "../../redux/PostSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownOptions = [
    {name:'Account', link:`/${currentUser.username}`, icon:<User size={16}/>},
    {name:'Saved', link:'', icon:<Bookmark size={16}/>},
    {name:'Settings', link:'', icon:<Settings size={16}/>}
  ]

  return (
    <>
      <header className="flex justify-between items-center px-4 py-2 relative">
        {/* Logo */}
        <div
        onClick={() => navigate('/')}
        className="flex items-center">
          <img
            src="/twirl-logo.png"
            alt="logo"
            className="w-12 h-12 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
          />
        </div>

        {/* Search bar (desktop only) */}
        <div className="hidden sm:flex items-center border rounded-3xl px-3 py-2 w-64 lg:w-96">
          <input
            type="text"
            className="flex-1 border-0 outline-0 text-sm"
            placeholder="Search for anything..."
          />
          <Search className="w-4 h-4 text-gray-500" />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Create Post (desktop only) */}
          <button
            onClick={() => dispatch(openModal())}
            className="hidden sm:block bg-[#0a0018] py-2 px-4 rounded-xl text-white text-sm hover:bg-[#1a0030] transition"
          >
            Create Post
          </button>

          {/* Notifications */}
          <button
            onClick={() => dispatch(toggleNotificationModal())}
            className="cursor-pointer sm:block hidden"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-full h-full object-cover"
              />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2 z-50">
                {dropdownOptions.map((option,index) =>(
                      <a
                      key={index}
                  href={option.link}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option.icon} {option.name}
                </a>
                
                ))} 
            
                <button
                  onClick={() => console.log("Logout clicked")}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
