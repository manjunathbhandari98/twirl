import { Image } from "lucide-react";

function UploadButton({ handleFileChange }: { handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label
      htmlFor="file-upload"
      className="flex gap-2 text-sm items-center hover:text-blue-600 cursor-pointer"
    >
      <Image size={16} />
      <p>Image</p>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}

export default UploadButton;
