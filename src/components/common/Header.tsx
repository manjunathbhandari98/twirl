import { Bell, Search } from "lucide-react";
import { useDispatch, } from "react-redux";
import { toggleNotificationModal } from "../../redux/NotificationSlice";
import { openModal } from "../../redux/PostSlice";

const Header = () => {
 
  const dispatch = useDispatch();
  return (
    <header className="flex justify-between items-center px-4 py-2">
      {/* Logo */}
      <div className="flex items-center">
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
        className="hidden sm:block bg-[#0a0018] py-2 px-4 rounded-xl text-white text-sm hover:bg-[#1a0030] transition">
          Create Post
        </button>
<button
onClick={() =>dispatch(toggleNotificationModal())}
className="cursor-pointer sm:block hidden">
        <Bell className="w-5 h-5 " />
</button>

        <div className="rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
