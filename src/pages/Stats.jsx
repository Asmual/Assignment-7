/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { getTimeline } from "../utils/timelineStore";

const COLORS = {
  Call: "#234e44",
  Text: "#7c3aed",
  Video: "#22c55e",
};

export default function Stats() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const entries = getTimeline();
    const counts = { Call: 0, Text: 0, Video: 0 };
    entries.forEach((e) => {
      if (counts[e.type] !== undefined) counts[e.type]++;
    });
    const data = Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name, value }));
    setChartData(data);
  }, []);

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-4xl font-black text-gray-900 mb-8">Friendship Analytics</h1>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <p className="text-sm font-semibold text-gray-500 mb-6">By Interaction Type</p>

          {total === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No interactions yet. Log some check-ins first!</p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} interactions`, name]} />
                  <Legend />
                </PieChart>
                </ResponsiveContainer>
                
              <div className="grid grid-cols-3 gap-4 mt-6">
                {["Call", "Text", "Video"].map((type) => {
                  const count = chartData.find((d) => d.name === type)?.value || 0;
                  return (
                    <div key={type} className="bg-slate-50 rounded-xl p-4 text-center border border-gray-100">
                      <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: COLORS[type] }}></div>
                      <p className="text-2xl font-black text-gray-800">{count}</p>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">{type}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}