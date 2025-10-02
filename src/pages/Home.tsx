import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import FeedTabs from '../components/layout/FeedTabs';
import TwirlBox from '../components/layout/TwirBox';
import { twirls } from '../data/twirls';

const Home = () => {
  const sortedTwirls = [...twirls].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [visibleCount, setVisibleCount] = useState(5);
  const loadCount = 5;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      // Infinite scroll
      if (scrollTop + windowHeight >= fullHeight - 100) {
        setVisibleCount((prev) =>
          Math.min(prev + loadCount, sortedTwirls.length)
        );
      }

      // Toggle scroll-to-top button
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sortedTwirls.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative space-y-4">
      <FeedTabs />
      {sortedTwirls.slice(0, visibleCount).map((twirl) => (
        <TwirlBox key={twirl.id} twirl={twirl} isReply={false} />
      ))}

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 p-3 rounded-full bg-black/60 text-white shadow-lg transition-all z-50"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Home;
