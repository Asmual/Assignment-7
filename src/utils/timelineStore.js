
export const getTimeline = () => {
  const data = localStorage.getItem("timeline");
  return data ? JSON.parse(data) : [];
};

export const addTimelineEntry = (entry) => {
  const existing = getTimeline();
  const updated = [entry, ...existing];
  localStorage.setItem("timeline", JSON.stringify(updated));
};