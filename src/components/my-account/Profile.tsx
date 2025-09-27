import { BadgeCheck, Camera, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { currentUser } from '../../data/profile';
import { twirls } from '../../data/twirls';
import TwirlBox from '../layout/TwirBox';
import EditProfileModal from '../modal/EditProfileModal';

const Profile = () => {
    const [editModalProfileOpen, setEditProfileModalOpen] = useState(false);

  const analytics = [
    { title: 'Posts', count: currentUser.postCount },
    { title: 'Followers', count: currentUser.followerCount },
    { title: 'Following', count: currentUser.followingCount },
  ];

  const sortedTwirls = [...twirls].filter((t) => t.author.id === currentUser.id).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())



    const [visibleCount, setVisibleCount] = useState(5);  // initial visible items
    const loadCount = 5;
  
  
    useEffect(() =>{
      const handleScroll = () =>{
          const scrollTop = window.scrollY;
          const windowHeight = window.innerHeight;
          const fullHeight = document.body.scrollHeight;
  
          if(scrollTop + windowHeight >= fullHeight - 100) {
              setVisibleCount(prev => Math.min(prev + loadCount, sortedTwirls.length))
          };
  
      }
      window.addEventListener('scroll',handleScroll);
      return () => window.removeEventListener('scroll',handleScroll);
    },[sortedTwirls.length])

  return (
    <div>
      <div className="p-3 flex justify-between items-start">
        <div className="flex gap-2 items-start">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="rounded-full border w-20 h-20"
            />
            <button className="absolute bg-white rounded-full p-1 top-12 cursor-pointer left-14">
              <Camera size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-2 ml-5">
            <div className="flex gap-1 items-center">
              <h2 className="text-2xl font-semibold">
                {currentUser.displayName}
              </h2>
              {currentUser.verified ? (
                <BadgeCheck fill="blue" color="white" />
              ) : (
                <button className="flex items-center gap-2 px-4 py-0.5 ml-3 border border-blue-500 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <BadgeCheck size={20} fill="white" color="blue" />
                  <h2 className="font-semibold text-sm">Get Verified</h2>
                </button>
              )}
            </div>
            <p>@{currentUser.username}</p>
            <p>{currentUser.bio}</p>

            <div className="flex gap-5 mt-5">
              {analytics.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between w-full items-center gap-1.5"
                >
                  <h2 className="font-medium text-xl">{data.count}</h2>
                  <h4 className="text-lg text-gray-700">{data.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
        onClick={() => setEditProfileModalOpen(true)}
        className="p-1 rounded-full hover:bg-gray-50">
          <Edit />
        </button>
      </div>
      <div className="my-4 border-t border-gray-300">
        <h2 className="font-medium text-gray-700 my-4">Recent Posts</h2>
        {sortedTwirls.slice(0,visibleCount)
        .map(twirl =>(
            <TwirlBox twirl={twirl} />
        ))
        }
      </div>
      {editModalProfileOpen &&
       <EditProfileModal onClose = {() => setEditProfileModalOpen(false)} />}
    </div>
  );
};

export default Profile;
