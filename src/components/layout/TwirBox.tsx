import {
  BadgeCheck,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
} from 'lucide-react';
import { useState } from 'react';
import type { Twirl } from '../../types';
import { formatTweetDate } from '../../utils/formatDate';
import PollBox from './PollBox';
import ReplyBox from './ReplyBox';

type TwirlBoxProps = {
  twirl: Twirl;
};

const TwirlBox = ({ twirl }: TwirlBoxProps) => {
  const [viewThread, setViewThread] = useState(false);


  return (
    <div className="border rounded-2xl p-4 m-3 bg-white hover:bg-gray-50 transition">
      {/* User Info + More Button */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          {/* Profile Image */}
          <img
            src={twirl.author.avatar}
            alt={twirl.author.username}
            className="rounded-full w-11 h-11 border"
          />

          {/* Name + Username + Date */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h2 className="font-semibold text-base">
                {twirl.author.displayName}
              </h2>
              {twirl.author.verified && (
                <BadgeCheck className="w-4 h-4 text-sky-500" />
              )}
            </div>
            <div className="flex gap-2 text-sm text-gray-500">
              <p>@{twirl.author.username}</p>
              <span>·</span>
              <p>{formatTweetDate(twirl.createdAt.toISOString())}</p>
            </div>
          </div>
        </div>

        <button className="p-1 rounded-full hover:bg-gray-100 transition">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="mt-3">
        <p className="text-[15px] leading-relaxed">{twirl.content}</p>
        {/* Media Content */}
       {/* Media Content */}
{Array.isArray(twirl.media) && twirl.media.length > 0 && (
  <div
    className={`mt-3 overflow-hidden rounded-xl border ${
      twirl.media.length > 1 ? 'grid grid-cols-2 gap-2' : ''
    }`}
  >
    {twirl.media.map((m) =>
      m.type === 'image' ? (
        <img
          key={m.id}
          src={m.url} // ✅ changed from thumbnail -> url
          alt={twirl.content.slice(0, 20) || 'media'} // fallback alt
          className="w-full h-auto object-cover"
        />
      ) : m.type === 'video' ? (
        <video
          key={m.id}
          controls
          className="w-full h-auto rounded-xl"
        >
          <source src={m.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null
    )}
  </div>
)}



        {/* Polls */}
        {twirl.poll && (
          <div className="overflow-hidden mt-3 rounded-xl border">
            <PollBox poll={twirl.poll} />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4 mx-5 text-gray-500 text-sm">
        <div className="flex gap-5 items-center">
          <button className="flex items-center gap-2 hover:text-pink-500 transition">
            <Heart size={18} />
            <span>{twirl.reactions.like}</span>
          </button>

          <button className="flex items-center gap-2 hover:text-sky-500 transition">
            <MessageCircle size={18} />
            <span>{twirl.replyCount}</span>
          </button>

          <button className="flex items-center gap-2 hover:text-green-500 transition">
            <Repeat2 size={18} />
            <span>{twirl.retwirls}</span>
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button className="hover:text-sky-500 transition">
            <Send size={18} />
          </button>
          <button className="hover:text-amber-500 transition">
            <Bookmark size={18} />
          </button>
        </div>
      </div>
      {twirl.replyCount > 0 && (
        <div
          onClick={() => setViewThread((prev) => !prev)}
          className="m-5 text-[#0a0018] cursor-pointer border-t p-4 border-gray-600"
        >
          {viewThread
            ? 'Hide thread'
            : `View thread (${twirl.replyCount} ${twirl.replyCount > 1 ? 'replies' : 'reply'})`}
        </div>
      )}

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          viewThread ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {twirl.replies?.map((reply) => (
          <ReplyBox key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default TwirlBox;
