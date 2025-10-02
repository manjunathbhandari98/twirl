import { Check, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { currentUser } from '../../data/profile';

type ProfileModalProps = {
  onClose: () => void;
};

const EditProfileModal = ({ onClose }: ProfileModalProps) => {
  const [formData, setFormData] = useState({
    displayName: currentUser.displayName,
    username: currentUser.username,
    email: currentUser.email,
    bio: currentUser.bio,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="inset-0 fixed bg-black/80 w-full flex justify-center items-center">
      <div className="rounded-xl p-4 w-xl overflow-y-auto scrollbar-hide"
      style={{backgroundColor:'var(--bg-color)'}}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <X />
          </button>
        </div>
        <form action="" onSubmit={handleSubmit}>
          {/* Display name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Display Name</label>
            <input
              type="text"
              name="displayName"
              className="p-2 border-gray-300 border outline-0 rounded-xl"
              onChange={handleChange}
              placeholder="Your Name"
              value={formData.displayName}
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username">User Name</label>
            <div className="flex gap-2 pr-3 items-center border-gray-300 border rounded-xl">
              <input
                type="text"
                className="p-2 outline-0 border-0 w-full"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Your Name"
                value={formData.username}
              />
              <Check size={16} color="green" />
            </div>
          </div>

          {/* email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="p-2 border-gray-300 border outline-0 rounded-xl"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Your Name"
              value={formData.email}
            />
          </div>

          {/* bio */}
          <div className="flex flex-col gap-2">
            <label htmlFor="bio">bio</label>
            <textarea
              rows={2}
              maxLength={100}
              className="p-2 border-gray-300 resize-none border outline-0 rounded-xl"
              id="bio"
              name="bio"
              onChange={handleChange}
              placeholder="Your Name"
              value={formData.bio}
            />
          </div>
          <button
            type="submit"
            className="p-2 my-4 rounded-xl cursor-pointer w-full bg-blue-500 text-white"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
