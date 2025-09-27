import { ChartBar, Clock } from "lucide-react";
import { useState } from "react";
import type { Poll } from "../../types";

type PollBoxProps = {
  poll: Poll;
};

const PollBox = ({ poll }: PollBoxProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [options, setOptions] = useState(poll.options);
  const [totalVotes, setTotalVotes] = useState(poll.totalVotes);

  const handleVote = (id: string) => {
    setSelected(id);

    setOptions((prevOptions) =>
      prevOptions.map((opt) =>
        opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );

    setTotalVotes((prevTotal) => prevTotal + 1);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-base font-semibold">{poll.question}</h2>

      {options.map((option) => {
        const percentage = totalVotes
          ? Math.round((option.votes / totalVotes) * 100)
          : 0;

        return (
          <div key={option.id} className="flex gap-2 items-center">
            {/* Entire clickable area */}
            <label
              className="flex items-center flex-1 cursor-pointer relative"
              onClick={() => handleVote(option.id)}
            >
              {/* Bar background */}
              <div className="absolute inset-0 bg-gray-200 rounded-xl"></div>

              {/* Filled bar width based on votes */}
              <div
                className="absolute inset-y-0 left-0 bg-blue-300 rounded-xl transition-all"
                style={{ width: `${percentage}%` }}
              ></div>

              {/* Radio + Text on top */}
              <div className="flex items-center gap-4 relative p-2 z-10">
                <input
                  type="radio"
                  name="poll"
                  checked={selected === option.id}
                  readOnly
                  className="w-4 h-4 accent-blue-600"
                />
                <h2 className="text-gray-900 font-medium">{option.text}</h2>
              </div>
            </label>

            {/* Vote Percentage */}
            <div className="text-gray-700 font-medium">{percentage}%</div>
          </div>
        );
      })}

      <div className="flex gap-4 items-center">
        <div className="flex gap-1 text-gray-600 text-sm items-center">
          <ChartBar size={14} />
          <p>{totalVotes} votes</p>
        </div>
        <div className="flex gap-1 text-gray-600 text-sm items-center">
          <Clock size={14} />
          {/* <p>{formatDate(poll.expiresAt)}</p> */}
        </div>
      </div>
    </div>
  );
};

export default PollBox;
