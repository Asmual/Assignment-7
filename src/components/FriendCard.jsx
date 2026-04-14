import { useNavigate } from "react-router-dom";

const statusStyles = {
  "overdue":    "bg-red-500 text-white",
  "almost due": "bg-orange-400 text-white",
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
      className="bg-white rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-20 h-20 rounded-full object-cover mb-4 bg-gray-100"
      />

      <h3 className="text-lg font-bold text-gray-800 mb-1">{friend.name}</h3>

      <p className="text-gray-400 text-sm mb-3">{friend.days_since_contact}d ago</p>

      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {friend.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs font-semibold uppercase tracking-wide bg-green-100 text-green-700 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className={`text-xs font-semibold px-4 py-1 rounded-full ${statusStyles[friend.status]}`}>
        {statusLabels[friend.status]}
      </span>
    </div>
  );
};

export default FriendCard;