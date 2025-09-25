import { ChartBar, Clock } from "lucide-react";
import type { Poll } from "../../types";
import { format } from "date-fns";

type PollBoxProps = {
    poll:Poll
}

const PollBox = ({ poll }: PollBoxProps) =>{
    return(
      <div className="p-4 flex flex-col gap-4">
  <h2 className="text-base font-semibold">{poll.question}</h2>

  {poll.options.map((option) => (
    <div key={option.id} className="flex gap-2 items-center">
      {/* Entire clickable area */}
      <label className="flex items-center flex-1 cursor-pointer relative">
        {/* Bar background */}
        <div className="absolute inset-0 bg-gray-200 rounded-xl"></div>

        {/* Filled bar width based on votes */}
        <div
          className="absolute inset-y-0 left-0 bg-blue-300 rounded-xl transition-all"
          style={{ width: `${option.votes}%` }}
        ></div>

        {/* Radio + Text on top */}
        <div className="flex items-center gap-4 relative p-2">
          <input type="radio" name="poll" className="w-4 h-4 accent-white z-10" />
          <h2 className="text-gray-900 font-medium z-10">{option.text}</h2>
        </div>
      </label>

      {/* Vote Percentage */}
      <div className="text-gray-700 font-medium">{option.votes}%</div>
    </div>
  ))}
  <div className="flex gap-4 items-center">
    <div className="flex gap-1 text-gray-600 text-sm items-center">
        <ChartBar size={14} />
        <p>{poll.totalVotes} votes</p>
    </div>
    <div className="flex gap-1 text-gray-600 text-sm items-center">
        <Clock size={14} />
        <p>{format(new Date(poll.expiresAt), 'MMM d, yyyy')}</p>
    </div>
  </div>
</div>

    )
}

export default PollBox;