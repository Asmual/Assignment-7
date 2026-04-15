import { useParams, useNavigate } from "react-router-dom";
import { IoNotificationsOutline, IoArchiveOutline, IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { FiPhone, FiMessageSquare } from "react-icons/fi";
import { HiOutlineVideoCamera } from "react-icons/hi";
import toast from "react-hot-toast";
import friendsData from "../data/friends.json";
import { addTimelineEntry, getTimeline } from "../utils/timelineStore";
import { useState } from "react";

const FriendDetail = () => {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const friend = friendsData.find((f) => f.id === parseInt(friendId));

  const [recentEntries, setRecentEntries] = useState(() =>
    getTimeline().filter((e) => e.friendId === parseInt(friendId))
  );

  if (!friend) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Friend not found!</h2>
        <button onClick={() => navigate("/")} className="bg-[#234e44] text-white px-6 py-2 rounded-md">
          Back to Home
        </button>
      </div>
    );
  }

  const handleCheckIn = (type) => {
    const entry = {
      id: Date.now(),
      friendId: friend.id,
      friendName: friend.name,
      type,
      title: `${type} with ${friend.name}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    addTimelineEntry(entry);
    setRecentEntries(getTimeline().filter((e) => e.friendId === friend.id));
    toast.success(`${type} with ${friend.name} logged!`);
  };

  const typeIcon = (type) => {
    if (type === "Call") return <FiPhone size={18} className="text-[#234e44]" />;
    if (type === "Text") return <FiMessageSquare size={18} className="text-[#234e44]" />;
    if (type === "Video") return <HiOutlineVideoCamera size={18} className="text-[#234e44]" />;
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-20">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">

        {/* Left Column */}
        <aside className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-2 border-gray-50 shadow-sm"
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{friend.name}</h1>
            <div className="flex flex-col items-center gap-2 mb-4">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full ${
                friend.status === "overdue" ? "bg-red-500 text-white" :
                friend.status === "almost due" ? "bg-orange-400 text-white" : "bg-[#234e44] text-white"
              }`}>
                {friend.status}
              </span>
              <span className="bg-green-100 text-[#234e44] text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                {friend.tags[0]}
              </span>
            </div>
            <p className="text-slate-600 text-sm italic mb-1 leading-relaxed">"{friend.bio}"</p>
            <p className="text-slate-400 text-xs">{friend.email}</p>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-white text-slate-700 py-3 rounded-xl border border-gray-100 shadow-sm font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
              <IoNotificationsOutline size={20} /> Snooze 2 Weeks
            </button>
            <button className="w-full bg-white text-slate-700 py-3 rounded-xl border border-gray-100 shadow-sm font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
              <IoArchiveOutline size={20} /> Archive
            </button>
            <button className="w-full bg-white text-red-500 py-3 rounded-xl border border-gray-100 shadow-sm font-bold flex items-center justify-center gap-3 hover:bg-red-50 transition-all">
              <IoTrashOutline size={20} /> Delete
            </button>
          </div>
        </aside>

        {/* Right Column */}
        <main className="space-y-6">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h2 className="text-3xl font-black text-[#234e44] mb-3">{friend.days_since_contact}</h2>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Days Since Contact</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h2 className="text-3xl font-black text-[#234e44] mb-3">{friend.goal}</h2>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Goal (Days)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h2 className="text-xl font-black text-[#234e44] mb-3">{friend.next_due_date}</h2>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Next Due</p>
            </div>
          </div>

          {/* Relationship Goal */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-1">Relationship Goal</h3>
              <p className="text-gray-500 text-sm">Connect every <span className="font-bold text-gray-800">{friend.goal} days</span></p>
            </div>
            <button className="bg-slate-50 p-2.5 rounded-lg border border-gray-200 hover:bg-slate-100 text-gray-600 flex items-center gap-1">
              Edit <AiOutlineEdit size={18} />
            </button>
          </div>

          {/* Quick Check-In */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleCheckIn("Call")}
                className="bg-white py-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 hover:bg-gray-50 transition-all border-b-4 border-b-slate-100"
              >
                <FiPhone size={26} className="text-[#234e44]" />
                <span className="text-sm font-bold text-gray-700">Call</span>
              </button>
              <button
                onClick={() => handleCheckIn("Text")}
                className="bg-white py-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 hover:bg-gray-50 transition-all border-b-4 border-b-slate-100"
              >
                <FiMessageSquare size={26} className="text-[#234e44]" />
                <span className="text-sm font-bold text-gray-700">Text</span>
              </button>
              <button
                onClick={() => handleCheckIn("Video")}
                className="bg-white py-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 hover:bg-gray-50 transition-all border-b-4 border-b-slate-100"
              >
                <HiOutlineVideoCamera size={26} className="text-[#234e44]" />
                <span className="text-sm font-bold text-gray-700">Video</span>
              </button>
            </div>
          </div>

          {/* Recent Interactions */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Interactions</h3>
              <button
                onClick={() => navigate("/timeline")}
                className="text-xs font-semibold text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-1"
              >
                🕐 Full History
              </button>
            </div>

            {recentEntries.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">No interactions yet. Use Quick Check-In above!</p>
            ) : (
              <div className="space-y-4">
                {recentEntries.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-50 border border-gray-100 flex items-center justify-center">
                        {typeIcon(entry.type)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{entry.type}</p>
                        <p className="text-xs text-gray-400">{entry.title.split(" with ")[1] ? `with ${friend.name}` : ""}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{entry.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default FriendDetail;