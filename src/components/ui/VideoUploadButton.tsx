import { VideoIcon } from "lucide-react";

const VideoUploadButton = ({ handleVideoChange }: { handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) =>{
    return(
         <label
      htmlFor="file-upload"
      className="flex gap-2 text-sm items-center hover:text-blue-600 cursor-pointer"
    >
      <VideoIcon size={16} />
      <p>Video</p>
      <input
        type="file"
        id="video-upload"
        accept="video/*"
        multiple
        onChange={handleVideoChange}
        className="hidden"
      />
    </label>
    )
}

export default VideoUploadButton;