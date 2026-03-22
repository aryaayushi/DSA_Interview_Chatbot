export default function Suggestions({ onClick }) {
  const prompts = [
    "Give me a DSA question",
    "Mock HR interview",
    "Explain system design basics",
  ];

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {prompts.map((p, i) => (
        <button
          key={i}
          onClick={() => onClick(p)}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          {p}
        </button>
      ))}
    </div>
  );
}