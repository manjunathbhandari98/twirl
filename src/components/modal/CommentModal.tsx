import { BadgeCheck, ChartColumn } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { currentUser } from '../../data/profile';
import { twirls } from '../../data/twirls';
import type { Poll, Twirl } from '../../types';
import { formatTweetDate } from '../../utils/formatDate';
import UploadButton from '../ui/UploadButton';
import VideoUploadButton from '../ui/VideoUploadButton';

type CommentProps = {
  twirlId: string;
  onClose: () => void;
  onComment: (reply: Twirl) => void;
};

const CommentModal = ({ twirlId, onClose, onComment }: CommentProps) => {
  const twirl: Twirl | undefined = twirls.find((t) => t.id === twirlId);

  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [pollSelected, setPollSelected] = useState(false);
  const [postPoll, setPostPoll] = useState<Poll | undefined>(undefined);

  if (!twirl) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages(newImages);
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => URL.createObjectURL(file));
    setVideos(newVideos);
  };

  const handleReply = () => {
    if (!comment.trim()) return;

    const newReply: Twirl = {
      id: Date.now().toString(),
      author: currentUser,
      content: comment,
      createdAt: new Date(),
      reactions: { like: 0, laugh: 0, love: 0, angry: 0, sad: 0, wow: 0 },
      replyCount: 0,
      replies: [],
      media: [
        ...images.map((url) => ({ id: url, type: 'image' as const, url })),
        ...videos.map((url) => ({ id: url, type: 'video' as const, url })),
      ],
      poll: postPoll,
      shareCount: 0,
      views: 0,
      retwirls: 0,
      visibility: 'public',
      isBookmarked: false,
    };

    onComment(newReply);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div
        className="relative w-full max-w-3xl mx-4 rounded-2xl p-4 shadow-lg"
        style={{ background: 'var(--bg-color)' }}
      >
        <button onClick={onClose} className="absolute top-2 right-2 p-2">
          ✕
        </button>

        {/* Original Twirl */}
        <div className="flex gap-3">
          <img
            src={twirl.author.avatar}
            alt={twirl.author.username}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <h2 className="font-semibold text-base">
                {twirl.author.displayName}
              </h2>
              {twirl.author.verified && (
                <BadgeCheck className="w-4 h-4 text-sky-500" />
              )}
            </div>
            <div
              className="flex gap-2 text-sm"
              style={{ color: 'var(--gray-text)' }}
            >
              <p>@{twirl.author.username}</p>
              <span>·</span>
              <p>{formatTweetDate(twirl.createdAt.toISOString())}</p>
            </div>
            <p className="my-2">{twirl.content}</p>
          </div>
        </div>

        {/* Reply Input */}
        <div className="flex gap-3 my-7">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-16 h-16 rounded-full"
          />
          <textarea
            placeholder="Write a comment..."
            className="flex-1 w-full p-3 rounded-lg outline-none resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center text-gray-600">
            <UploadButton handleFileChange={handleFileChange} />
            <VideoUploadButton handleVideoChange={handleVideoChange} />
            <button
              onClick={() => setPollSelected(true)}
              className="flex gap-2 text-sm items-center hover:text-purple-600 cursor-pointer"
            >
              <ChartColumn size={16} />
              <p>Poll</p>
            </button>
          </div>
          <button
            onClick={handleReply}
            className="mt-2 px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
