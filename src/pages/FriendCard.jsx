import { useNavigate } from "react-router-dom";

const statusStyles = {
  "overdue":    "bg-[#FF2D55] text-white",
  "almost due": "bg-[#F97316] text-white",
  "on-track":   "bg-[#234e44] text-white",
};

const statusLabels = {
  "overdue":    "Overdue",
  "almost due": "Almost Due",
  "on-track":   "On-Track",
};

const FriendCard = ({ friend }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/friends/${friend.id}`)}
      className="bg-white rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all border border-transparent hover:border-green-100"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-50 shadow-sm"
        onError={(e) => {
          e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + friend.name;
        }}
      />

      <h3 className="text-lg font-bold text-gray-800 mb-1">{friend.name}</h3>

      <p className="text-gray-400 text-sm mb-3">{friend.days_since_contact}d ago</p>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {friend.tags?.map((tag, index) => (
          <span
            key={index}
            className="text-[10px] font-bold uppercase tracking-wider bg-[#dcfce7] text-[#10392f] px-3 py-1 rounded-full border border-[#bbf7d0]"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className={`text-[11px] font-bold px-6 py-1.5 rounded-full uppercase tracking-wide shadow-sm ${statusStyles[friend.status] || "bg-gray-400 text-white"}`}>
        {statusLabels[friend.status] || "Unknown"}
      </span>
    </div>
  );
};

export default FriendCard;