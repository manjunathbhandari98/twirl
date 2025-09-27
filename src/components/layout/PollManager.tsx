import { Plus, X } from "lucide-react";
import { useState } from "react";

type PollManagerProps = {
  onClose: () => void;
  onSave: (question: string, options: string[]) => void;
};

const PollManager = ({ onClose, onSave }: PollManagerProps) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // start with 2 options

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 10) setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    const validOptions = options.filter((o) => o.trim() !== "");
    if (!question.trim()) {
      alert("Poll question cannot be empty!");
      return;
    }
    if (validOptions.length < 2) {
      alert("Add at least 2 options!");
      return;
    }
    onSave(question, validOptions);
    onClose();
  };

  return (
    <div className="bg-gray-100 rounded-xl p-6 w-full my-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Create Poll</h2>
        <button onClick={onClose} className="hover:text-red-500">
          <X size={20} />
        </button>
      </div>

      {/* Poll Question */}
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-xl outline-none w-full mb-4"
        placeholder="Poll Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Poll Options */}
      <div className="flex flex-col gap-3 mb-4">
        {options.map((option, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="p-2 border border-gray-300 rounded-xl outline-none flex-1"
            />
            {options.length > 2 && (
              <button
                onClick={() => removeOption(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Option */}
      {options.length < 10 && (
        <button
          onClick={addOption}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4"
        >
          <Plus size={16} /> Add option
        </button>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
      >
        Save Poll
      </button>
    </div>
  );
};

export default PollManager;
