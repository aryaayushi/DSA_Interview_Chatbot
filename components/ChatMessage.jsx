import ReactMarkdown from "react-markdown";

export default function ChatMessage({ role, text }) {
  return (
    <div className={`flex mb-3 ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-3 rounded-xl max-w-[75%] ${
          role === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        {role === "user" ? (
          text
        ) : (
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-xl font-bold mb-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-lg font-semibold mb-2" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-md font-semibold mb-1" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-5 mb-2" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-1" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-2" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code className="bg-black px-1 py-0.5 rounded" {...props} />
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}