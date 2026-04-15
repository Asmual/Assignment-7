/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { getTimeline } from "../utils/timelineStore";
import callIcon from "../assets/call.png";
import textIcon from "../assets/text.png";
import videoIcon from "../assets/video.png";

const typeIcon = (type) => {
  if (type === "Call") return <img src={callIcon} alt="call" className="w-6 h-6 object-contain" />;
  if (type === "Text") return <img src={textIcon} alt="text" className="w-6 h-6 object-contain" />;
  if (type === "Video") return <img src={videoIcon} alt="video" className="w-6 h-6 object-contain" />;
};

export default function Timeline() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setEntries(getTimeline());
  }, []);

  const filtered = filter === "All" ? entries : entries.filter((e) => e.type === filter);

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-4xl font-black text-gray-900 mb-8">Timeline</h1>

        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 shadow-sm w-64 focus:outline-none"
          >
            <option value="All">Filter timeline</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-gray-400 text-sm">No interactions yet. Go to a friend's page and log a check-in!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <div key={entry.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-slate-50 border border-gray-100 flex items-center justify-center shrink-0">
                  {typeIcon(entry.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">
                    <span className="text-gray-900">{entry.type}</span>{" "}
                    <span className="text-gray-500 font-normal">with {entry.friendName}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}