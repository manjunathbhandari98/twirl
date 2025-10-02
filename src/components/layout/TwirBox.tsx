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
import CommentModal from '../modal/CommentModal';
import PollBox from './PollBox';

type TwirlBoxProps = {
  twirl: Twirl;
  isReply: boolean;
};

const TwirlBox = ({ twirl, isReply }: TwirlBoxProps) => {
  const [viewThread, setViewThread] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCounts] = useState(twirl.reactions.like);
  const [commentsCount, setCommentsCount] = useState(twirl.replyCount);

  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [replies, setReplies] = useState<Twirl[]>(twirl.replies || []);
  const [selectedTwirl, setSelectedTwirl] = useState('');

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCounts((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    setSelectedTwirl(twirl.id);
    setCommentBoxOpen((prev) => !prev);
  };

  const handleReply = (comment: Twirl) => {
    setReplies((prev) => [...prev, comment]);
    setCommentsCount((prev) => prev + 1);
  };

  // --- Utility to parse hashtags in content ---
  const renderContentWithHashtags = (text: string) => {
    const hashtagRegex = /#[\w]+/g;
    const parts = text.split(hashtagRegex);

    const matches = text.match(hashtagRegex) || [];

    // Rebuild with clickable spans/links
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {matches[i] && (
          <span
            className="text-sky-500 hover:underline cursor-pointer"
            onClick={() => console.log(`Clicked hashtag: ${matches[i]}`)}
          >
            {matches[i]}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      className={`${!isReply && 'border'} rounded-2xl p-4 sm:m-3 mb-3 transition`}
    >
      {/* User Info + More Button */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img
            src={twirl.author.avatar}
            alt={twirl.author.username}
            className="rounded-full w-11 h-11 border"
          />
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
        <button className="p-1 rounded-full cursor-pointer">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content with hashtags parsed */}
      <div className="mt-3 text-[15px] leading-relaxed">
        {renderContentWithHashtags(twirl.content)}
      </div>

      {/* Media */}
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
                src={m.url}
                alt={twirl.content.slice(0, 20) || 'media'}
                className="w-full h-auto object-cover"
              />
            ) : m.type === 'video' ? (
              <video key={m.id} controls className="w-full h-auto rounded-xl">
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

      {/* Actions */}
      <div className="flex justify-between items-center mt-4 mx-5 text-gray-500 text-sm">
        <div className="flex gap-5 items-center">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition ${
              liked ? 'text-pink-500' : 'hover:text-pink-500'
            }`}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            <span>{likeCount}</span>
          </button>
          <button
            onClick={handleComment}
            className="flex items-center gap-2 hover:text-sky-500 transition"
          >
            <MessageCircle size={18} />
            <span>{commentsCount}</span>
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

      {commentsCount > 0 && (
        <div
          onClick={() => setViewThread((prev) => !prev)}
          className="m-5 cursor-pointer border-t p-4 border-gray-600"
        >
          {viewThread
            ? 'Hide thread'
            : `View thread (${commentsCount} ${commentsCount > 1 ? 'replies' : 'reply'})`}
        </div>
      )}

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          viewThread ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {replies.map((reply) => (
          <TwirlBox key={reply.id} twirl={reply} isReply={true} />
        ))}
      </div>

      {commentBoxOpen && (
        <CommentModal
          onClose={() => setCommentBoxOpen(false)}
          twirlId={selectedTwirl}
          onComment={(e) => handleReply(e)}
        />
      )}
    </div>
  );
};

export default TwirlBox;
