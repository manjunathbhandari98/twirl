import { ChartColumn, EyeOff, Globe, Hourglass, X } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../../data/profile';
import { twirls } from '../../data/twirls';
import { closeModal } from '../../redux/PostSlice';
import type { MediaItem, Poll } from '../../types';
import { generateId } from '../../utils/generateId';
import PollManager from '../layout/PollManager';
import UploadButton from '../ui/UploadButton';
import VideoUploadButton from '../ui/VideoUploadButton';

const CreatePostModal = () => {
  const dispatch = useDispatch();
  const totalWords = 300;
  const navigate = useNavigate();
  const [typedWords, setTypedWords] = useState(0);
  const [selectedVisibility, setSelectedVisibility] = useState(1);
  const [postContent, setPostContent] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState<Date | null>(null);

  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [pollSelected, setPollSelected] = useState(false);
  const [postPoll, setPostPoll] = useState<Poll | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);

  const handlePostContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTypedWords(value.length);
    setPostContent(value);

    // Extract complete hashtags from text (case-insensitive)
    const completeTags = Array.from(new Set(value.match(/#\w+/gi) || [])).map(
      (tag) => tag // Keep the hashtag with #
    );
    setHashtags(completeTags);

    // Get the current word being typed (for suggestions)
    const words = value.split(/\s/);
    const lastWord = words[words.length - 1];

    // Check if user is typing a hashtag
    if (lastWord.startsWith('#') && lastWord.length > 1) {
      const partialTag = lastWord.slice(1).toLowerCase(); // Remove # and lowercase

      // Get all existing tags from twirls (using hashtags as per your data structure)
      const allExistingTags = Array.from(
        new Set(twirls.flatMap((t) => t.hashtags ?? []))
      ).filter((tag): tag is string => tag !== undefined);

      // Find suggestions that start with the partial tag
      const suggestions = allExistingTags
        .filter((tag) => {
          const tagLower = tag.replace('#', '').toLowerCase();
          return tagLower.startsWith(partialTag) && tagLower !== partialTag;
        })
        .slice(0, 5); // Limit to 5 suggestions

      setTagSuggestions(suggestions);
    } else {
      setTagSuggestions([]);
    }
  };

  const handleTagClick = (tag: string) => {
    const cleanTag = tag.replace('#', '');

    // Split into words
    const words = postContent.split(/\s+/);

    // Find last hashtag index (not just last word)
    const lastHashtagIndex = [...words]
      .reverse()
      .findIndex((w) => w.startsWith('#'));

    if (lastHashtagIndex !== -1) {
      // Convert reverse index back to normal index
      const actualIndex = words.length - 1 - lastHashtagIndex;
      words[actualIndex] = `#${cleanTag}`;
    }

    const newContent = words.join(' ') + ' '; // keep space for smooth typing
    setPostContent(newContent);

    // Update hashtags array
    const allHashtags = Array.from(new Set(newContent.match(/#\w+/gi) || []));
    setHashtags(allHashtags);

    setTagSuggestions([]);
  };

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

  const handlePollSave = (question: string, options: string[]) => {
    const validOptions = options.filter((opt) => opt.trim() !== '');
    if (!question.trim()) {
      alert('Please enter a poll question');
      return;
    }
    if (validOptions.length < 2) {
      alert('Please add at least 2 options');
      return;
    }

    const pollOptions = validOptions.map((text, index) => ({
      id: `o${index + 1}`,
      text,
      votes: 0,
    }));

    const poll: Poll = {
      question,
      options: pollOptions,
      totalVotes: 0,
      expiresAt:
        selectedVisibility === 3 && selectedSchedule
          ? selectedSchedule
          : undefined,
    };

    setPollSelected(false);
    setPostPoll(poll);
  };

  const handleSubmit = () => {
    const visibility =
      selectedVisibility === 1
        ? 'public'
        : selectedVisibility === 2
          ? 'private'
          : 'temporary';

    const media: MediaItem[] = [
      ...images.map((img, i) => ({
        id: `img-${i}`,
        type: 'image' as const,
        url: img,
      })),
      ...videos.map((vid, i) => ({
        id: `vid-${i}`,
        type: 'video' as const,
        url: vid,
      })),
    ];

    twirls.push({
      id: generateId('twirl'),
      author: currentUser,
      content: postContent,
      hashtags: hashtags,
      media,
      createdAt: new Date(),
      reactions: { like: 0, love: 0, laugh: 0, angry: 0, sad: 0, wow: 0 },
      replyCount: 0,
      shareCount: 0,
      views: 0,
      retwirls: 0,
      isBookmarked: false,
      replies: [],
      isScheduled: selectedVisibility === 3,
      expiresAt:
        selectedVisibility === 3 ? selectedSchedule || undefined : undefined,
      visibility,
      poll: postPoll || undefined,
    });

    dispatch(closeModal());
    navigate('/');
  };

  const visibilityOption = [
    {
      id: 1,
      option: 'Public',
      desc: 'Anyone can see this post',
      icon: <Globe />,
    },
    {
      id: 2,
      option: 'Private',
      desc: 'Only Followers can see',
      icon: <EyeOff />,
    },
    {
      id: 3,
      option: 'Temporary',
      desc: 'Post expires after set time',
      icon: <Hourglass />,
    },
  ];

  return (
    <div
      className={`
        w-full h-full 
        ${/* Mobile → act like page */ ''}
        block 
        ${/* Desktop → modal overlay */ ''}
        sm:fixed sm:inset-0 sm:bg-black/80 sm:flex sm:justify-center sm:items-center
      `}
    >
      <div
        className={`
          h-full w-full p-4 overflow-y-auto scrollbar-hide 
          sm:rounded-xl sm:h-[600px] sm:w-[600px]
        `}
        style={{ backgroundColor: 'var(--bg-color)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="p-2 rounded-full cursor-pointer sm:block hidden"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="relative w-full">
          <textarea
            name="post"
            maxLength={totalWords}
            rows={5}
            className="w-full p-2 border rounded-xl my-4 outline-0 border-gray-500"
            placeholder="Write Your Thoughts here..."
            value={postContent}
            onChange={handlePostContent}
          />
          {tagSuggestions.length > 0 && (
            <ul
              style={{
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
              }}
              className="absolute border border-gray-600 rounded-md shadow-md top-full left-0 w-full z-10 max-h-40 overflow-y-auto"
            >
              {tagSuggestions.map((tag) => (
                <li
                  key={tag}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer "
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Polls */}
        {pollSelected && (
          <PollManager
            onClose={() => setPollSelected(false)}
            onSave={handlePollSave}
          />
        )}

        {/* Visibility */}
        <div>
          <p>Post Visibility</p>
          {visibilityOption.map((option) => (
            <label
              key={option.id}
              className="flex flex-wrap justify-between items-center p-3 rounded-2xl border my-2 cursor-pointer"
            >
              <div className="flex gap-3 items-center">
                {option.icon}
                <div className="flex flex-col">
                  <p className="text-md">{option.option}</p>
                  <p className="text-sm text-gray-700">{option.desc}</p>
                </div>
              </div>
              <input
                type="radio"
                name="radio"
                id={option.option}
                checked={selectedVisibility === option.id}
                onChange={() => setSelectedVisibility(option.id)}
                className="w-4 h-4"
              />
            </label>
          ))}

          {selectedVisibility === 3 && (
            <input
              type="datetime-local"
              value={
                selectedSchedule
                  ? selectedSchedule.toISOString().slice(0, 16)
                  : ''
              }
              onChange={(e) => setSelectedSchedule(new Date(e.target.value))}
              className="border border-gray-600 rounded-md p-2 w-full"
            />
          )}
        </div>

        {/* Media & Poll Preview */}
        {(images.length > 0 || videos.length > 0 || postPoll) && (
          <div className="mt-4 flex flex-col gap-2">
            {images.map((img, i) => (
              <div
                key={`img-${i}`}
                className="text-sm text-gray-700 bg-gray-100 rounded px-2 py-1"
              >
                📷 Image {i + 1}: {img.split('/').pop()}
              </div>
            ))}

            {videos.map((vid, i) => (
              <div
                key={`vid-${i}`}
                className="text-sm text-gray-700 bg-gray-100 rounded px-2 py-1"
              >
                🎬 Video {i + 1}: {vid.split('/').pop()}
              </div>
            ))}

            {postPoll && (
              <div className="text-sm text-gray-700 bg-gray-100 rounded px-2 py-1">
                Poll: {postPoll.question} ({postPoll.options.length} options)
              </div>
            )}
          </div>
        )}

        {/* Media & Poll Buttons */}
        <div className="mt-5 border-t pt-4 border-gray-600 flex justify-between items-center">
          <div
            className="flex gap-5 items-center"
            style={{ color: 'var(--gray-text)' }}
          >
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

          <div className="flex gap-3">
            <button
              onClick={() => dispatch(closeModal())}
              className="p-2 rounded-xl cursor-pointer bg-blue-500 text-white sm:block hidden"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="py-2 px-4 cursor-pointer rounded-xl"
              style={{
                backgroundColor: 'var(--text-color)',
                color: 'var(--bg-color)',
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
