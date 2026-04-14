import { FiUserPlus } from "react-icons/fi";

const Banner = ({ friends }) => {
  const total = friends.length;
  const onTrack = friends.filter(f => f.status === "on-track").length;
  const needAttention = friends.filter(
    f => f.status === "overdue" || f.status === "almost due"
  ).length;
  const interactionsThisMonth = 12;

  const cards = [
    { value: total,                 label: "Total Friends" },
    { value: onTrack,               label: "On Track" },
    { value: needAttention,         label: "Need Attention" },
    { value: interactionsThisMonth, label: "Interactions This Month" },
  ];

  return (
    <section className="bg-[#f0f4f3] py-16 px-6 text-center">
      <h1 className="text-4xl font-bold text-[#1a3a32] mb-3">
        Friends to keep close in your life
      </h1>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
        Your personal shelf of meaningful connections. Browse, tend, and nurture
        the relationships that matter most.
      </p>

      <button className="flex items-center gap-2 bg-[#234e44] text-white px-6 py-3 rounded-md mx-auto mb-12 hover:bg-[#1a3a32] transition-colors">
        <FiUserPlus />
        Add a Friend
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-[#234e44] mb-1">{card.value}</p>
            <p className="text-gray-500 text-sm">{card.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;