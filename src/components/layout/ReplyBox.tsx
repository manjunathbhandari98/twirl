import {
  BadgeCheck,
  BarChart3,
  Heart,
  MessageCircle,
  PlayCircle,
  Repeat2,
} from 'lucide-react';
import type { Twirl } from '../../types';
import { formatTweetDate } from '../../utils/formatDate';

type ReplyProps = {
  reply: Twirl;
};

const ReplyBox = ({ reply }: ReplyProps) => {
  return (
    <div className="m-5 border-b pb-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          {/* Profile Image */}
          <img
            src={reply.author.avatar}
            alt={reply.author.username}
            className="rounded-full w-11 h-11 border"
          />

          {/* Author info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h2 className="font-semibold text-base">
                {reply.author.displayName}
              </h2>
              {reply.author.verified && (
                <BadgeCheck className="w-4 h-4 text-sky-500" />
              )}
            </div>
            <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
              <p>@{reply.author.username}</p>
              <span>·</span>
              <p>{formatTweetDate(reply.createdAt.toISOString())}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="my-3">
        {reply.content && (
          <p className="text-[15px] leading-relaxed whitespace-pre-line">
            {reply.content}
          </p>
        )}
      </div>

      {/* Media (images/videos) */}
      {reply.media && reply.media.length > 0 && (
        <div className="grid grid-cols-2 gap-2 my-3 rounded-xl overflow-hidden">
          {reply.media.map((item) =>
            item.type === 'image' ? (
              <img
                key={item.id}
                src={item.url}
                alt="reply media"
                className="rounded-xl w-full object-cover"
              />
            ) : (
              <div
                key={item.id}
                className="relative rounded-xl overflow-hidden bg-black"
              >
                <video
                  src={item.url}
                  controls
                  className="w-full h-auto rounded-xl"
                />
                <PlayCircle className="absolute inset-0 m-auto w-12 h-12 text-white opacity-80" />
              </div>
            )
          )}
        </div>
      )}

      {/* Poll (if present) */}
      {reply.poll && (
        <div className="my-3 p-3 border rounded-xl">
          <h4 className="text-sm font-semibold mb-2">Poll</h4>
          {reply.poll.options.map((opt) => (
            <div
              key={opt.id}
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 overflow-hidden"
            >
              <div
                className="bg-sky-500 text-white text-xs px-2 py-1"
                style={{ width: `${opt.votes}%` }}
              >
                {opt.text} ({opt.votes}%)
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {reply.poll.totalVotes} votes
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-6 items-center text-sm mt-2">
        <button className="flex items-center gap-2 hover:text-pink-500 transition">
          <Heart size={18} />
          <span>{reply.reactions.like}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-sky-500 transition">
          <MessageCircle size={18} />
          <span>{reply.replyCount}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-green-500 transition">
          <Repeat2 size={18} />
          <span>{reply.retwirls}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-purple-500 transition">
          <BarChart3 size={18} />
          <span>{reply.views || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default ReplyBox;
