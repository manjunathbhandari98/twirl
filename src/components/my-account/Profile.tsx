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

  const sortedTwirls = [...twirls]
    .filter((t) => t.author.id === currentUser.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const [visibleCount, setVisibleCount] = useState(5);
  const loadCount = 5;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        setVisibleCount((prev) =>
          Math.min(prev + loadCount, sortedTwirls.length)
        );
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sortedTwirls.length]);

  return (
    <div className="sm:p-3">
      {/* Top section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex gap-3 sm:gap-5 items-start">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="rounded-full border w-18 h-14 sm:w-20 sm:h-20"
            />
            <button className="absolute sm:block hidden bg-white rounded-full p-1 top-12 left-12 sm:left-14 cursor-pointer">
              <Camera size={18} className="sm:size-5" color="black" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-0.5 items-center">
                  <h2 className="text-lg sm:text-2xl font-semibold">
                    {currentUser.displayName}
                  </h2>
                  {currentUser.verified ? (
                    <BadgeCheck fill="blue" color="white" />
                  ) : (
                    <button className="flex items-center gap-1 px-2 sm:px-4 py-0.5 border border-blue-500 rounded-lg sm:rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-md transition-all duration-200 cursor-pointer text-xs sm:text-sm">
                      <BadgeCheck
                        size={16}
                        className="sm:size-5"
                        fill="white"
                        color="blue"
                      />
                      <span className="font-semibold">Get Verified</span>
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setEditProfileModalOpen(true)}
                  className="p-1 flex sm:hidden rounded-full cursor-pointer self-end sm:self-auto"
                >
                  <Edit size={20} className="sm:size-6" />
                </button>
              </div>
            </div>
            <p className="text-sm sm:text-base">@{currentUser.username}</p>
            <p className="text-sm sm:text-base">{currentUser.bio}</p>

            <div className="flex justify-between sm:gap-5 mt-3 sm:mt-5">
              {analytics.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between w-full items-center gap-1"
                >
                  <h2 className="font-medium text-base sm:text-xl">
                    {data.count}
                  </h2>
                  <h4
                    className="text-xs sm:text-lg"
                    style={{ color: 'var(--gray-text)' }}
                  >
                    {data.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setEditProfileModalOpen(true)}
          className="p-1 hidden sm:flex rounded-full cursor-pointer self-end sm:self-auto"
        >
          <Edit size={20} className="sm:size-6" />
        </button>
      </div>

      {/* Posts */}
      <div className="my-4 border-t border-gray-300">
        <h2
          className="font-medium my-3 sm:my-4 text-sm sm:text-base"
          style={{ color: 'var(--gray-text)' }}
        >
          Recent Posts
        </h2>
        {sortedTwirls.slice(0, visibleCount).map((twirl) => (
          <TwirlBox key={twirl.id} twirl={twirl} />
        ))}
      </div>

      {editModalProfileOpen && (
        <EditProfileModal onClose={() => setEditProfileModalOpen(false)} />
      )}
    </div>
  );
};

export default Profile;
