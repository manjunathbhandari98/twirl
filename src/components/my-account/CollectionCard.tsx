import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { twirls } from "../../data/twirls";
import { setSelectedCollection } from "../../redux/CollectionSlice";
import type { Favorite, MediaItem } from "../../types";

type CollectionCardProps = {
  favorite: Favorite; 
};

const CollectionCard = ({ favorite }: CollectionCardProps) => {
const navigate = useNavigate();
const dispatch = useDispatch();

const placeholderUrl = "https://imgs.search.brave.com/H9OqK_fwJZOUHpCEFk9BoRvyb_3OVFStaaIxsKxv7MU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJ1cGxvYWQv/MzQ1MDg5MjIvZmls/ZS9zdGlsbC0yNWJl/MWYxOTdmNjMxMjUw/M2ZlNDI5Y2QxM2Rh/Y2FkMS5wbmc_Zm9y/bWF0PXdlYnAmcmVz/aXplPTQwMHgzMDAm/dmVydGljYWw9Y2Vu/dGVy";

const images = twirls
  .filter(twirl => favorite.twirlIds.includes(twirl.id))
  .map(twirl => twirl.media?.[0] || { url: placeholderUrl, id: `placeholder-${twirl.id}` })
  .filter(Boolean) as MediaItem[];

  const handleCollection = () =>{
    dispatch(setSelectedCollection(favorite.id))
    navigate(`/collections/${favorite.title}`)
  }

  return (
    <div onClick={handleCollection} className="p-3 rounded-2xl border border-gray-300">
      <div className="flex justify-between items-center">
        <h2 className="font-medium">{favorite.title}</h2>
        <p>{favorite.twirlIds.length} Posts</p>
      </div>
      <p>{favorite.description}</p>

      <div className="grid grid-cols-2 gap-1 mt-2 rounded-xl overflow-hidden">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="relative w-full h-24">
            <img
              src={image.url}
              alt={image.alt || `img-${index}`}
              className="w-full h-full object-cover"
            />
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/50 cursor-pointer flex items-center justify-center text-white text-lg font-semibold">
                +{images.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default CollectionCard;
