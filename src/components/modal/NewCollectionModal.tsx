import { useState, type FormEvent } from "react";

type CollectionModalProps = {
    onClose: () => void;
    onSave: () => void;
}

const NewCollectionModal = ({onClose, onSave}: CollectionModalProps) =>{
    const [formData, setFormData] = useState({
        title:'',
        desc: ''
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]:value}))
    }

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault();
        onSave();
    }


    return(
        <div className="inset-0 fixed bg-black/80 w-full flex justify-center items-center">
      <div className="rounded-xl p-4 bg-white w-xl overflow-y-auto scrollbar-hide">
            <form action="" onSubmit={handleSubmit}>
          {/* Display name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              name="title"
              className="p-2 border-gray-300 border outline-0 rounded-xl"
              onChange={handleChange}
              placeholder="Collection Name"
              value={formData.title}
            />
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="name">Description <span className="text-gray-600">(optional)</span></label>
            <input
              type="text"
              name="desc"
              className="p-2 border-gray-300 border outline-0 rounded-xl"
              onChange={handleChange}
              placeholder="Description"
              value={formData.desc}
            />
          </div>

        <div className="flex gap-2">
            <button
            type="button"
            onClick={onClose}
            className="p-2 my-4 rounded-xl cursor-pointer w-full bg-red-400 text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 my-4 rounded-xl cursor-pointer w-full bg-blue-500 text-white"
          >
            Save
          </button>
        </div>
          </form>
        </div>
      </div>
    )
}

export default NewCollectionModal;