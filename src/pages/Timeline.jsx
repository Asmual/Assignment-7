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
  const [sortOrder, setSortOrder] = useState("newest");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setEntries(getTimeline());
  }, []);

  const filtered = filter === "All" ? entries : entries.filter((e) => e.type === filter);

  const searched = filtered.filter((e) =>
    e.friendName.toLowerCase().includes(search.toLowerCase()) ||
    e.type.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...searched].sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-4xl font-black text-gray-900 mb-8">Timeline</h1>

    
        <div className="flex flex-wrap gap-3 mb-6">

          {/* timeline filter */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-700 shadow-sm focus:outline-none"
            >
              <option value="All">Filter timeline</option>
              <option value="Call">Call</option>
              <option value="Text">Text</option>
              <option value="Video">Video</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
          </div>

          {/* Newest Oldest dropdown */}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-700 shadow-sm focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
          </div>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 shadow-sm focus:outline-none flex-1 min-w-45"
          />
        </div>

        {sorted.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-gray-400 text-sm">No interactions yet. Go to a friend's page and log a check-in!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((entry) => (
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