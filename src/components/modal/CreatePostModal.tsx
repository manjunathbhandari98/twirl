import {
  ChartColumn,
  EyeOff,
  Globe,
  Hourglass,
  Image,
  Video,
  X,
} from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from '../../data/profile';
import { twirls } from '../../data/twirls';
import { closeModal } from '../../redux/PostSlice';
import { generateId } from '../../utils/generateId';

const CreatePostModal = () => {
  const dispatch = useDispatch();
  const totalWords = 300;
  const [typedWords, setTypedWords] = useState(0);
  const [selectedVisibility, setSelectedVisibility] = useState(1);
  const [postContent, setPostContent] = useState('');
  // const [postMedias, setPostMedias] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Date>();

  const handlePostContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTypedWords(e.target.value.length);
    setPostContent(e.target.value);
  };

  const handleSubmit = () => {
    const visiblity  = selectedVisibility == 1 ? 'public' : selectedVisibility == 2 ? 'private': 'temporary';
    twirls.push({
      id: generateId('twirl'),
      author: currentUser,
      content: postContent,
      media: [
      ],
      createdAt: new Date(), 
      reactions: {
        like: 0,
        love: 0,
        laugh: 0,
        angry: 0,
        sad: 0,
        wow: 0,
      },
      replyCount: 0,
      shareCount: 0,
      views: 0,
      retwirls:0,
      isBookmarked: false,
      replies: [],
      isScheduled: selectedVisibility == 3 ? true : false,
      expiresAt: selectedVisibility == 3 ? selectedSchedule : undefined,
      visibility: visiblity,
    });
    dispatch(closeModal());
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
    <div className="inset-0 fixed bg-black/80 w-full h-full flex justify-center items-center">
      <div className="rounded-xl p-4 bg-white w-xl h-150 overflow-y-auto scrollbar-hide">
        {/* header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <textarea
            name="post"
            id=""
            maxLength={totalWords}
            rows={5}
            className="w-full p-2 border rounded-xl my-4 outline-0 border-gray-500"
            placeholder="Write Your Thoughts here..."
            onChange={handlePostContent}
          />
          <span className="flex justify-end text-xs text-gray-700">
            {typedWords}/{totalWords}
          </span>
        </div>

        {/* Visiblity */}
        <div>
          <p>Post Visibility</p>
          {visibilityOption.map((option) => (
            <label
              key={option.id}
              className="flex flex-wrap justify-between 
                    items-center p-3 rounded-2xl border hover:bg-gray-200 my-2 cursor-pointer"
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
                checked={selectedVisibility == option.id}
                value={selectedVisibility}
                onChange={() => setSelectedVisibility(option.id)}
                className="w-4 h-4"
              />
            </label>
          ))}
          {selectedVisibility === 3 && (
            <input
  type="datetime-local"
  value={selectedSchedule ? selectedSchedule.toISOString().slice(0, 16) : ""}
  onChange={(e) => setSelectedSchedule(new Date(e.target.value))}
  className="border border-gray-600 rounded-md p-2 w-full"
/>

          )}
        </div>

        <div className="mt-5 border-t pt-4 border-gray-600 flex justify-between items-center">
          <div className="flex gap-5 items-center text-gray-600">
            <button className="flex gap-2 text-sm items-center hover:text-blue-600 cursor-pointer">
              <Image size={16} />
              <p>Image</p>
            </button>
            <button className="flex gap-2 text-sm items-center hover:text-green-600 cursor-pointer">
              <Video size={16} />
              <p>Video</p>
            </button>
            <button className="flex gap-2 text-sm items-center hover:text-purple-600 cursor-pointer">
              <ChartColumn size={16} />
              <p>Poll</p>
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => dispatch(closeModal())}
              className="p-2 rounded-xl cursor-pointer bg-blue-500 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="py-2 px-4 cursor-pointer rounded-xl bg-[#0a0018] text-white"
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
