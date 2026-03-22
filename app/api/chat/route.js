export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // ✅ FINAL FIX
          messages: [
            {
              role: "system",
              content:
                "You are an SDE interview coach.Always format answers using:- Headings (###) - Bullet points - Short paragraphs- Code blocks if needed",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("✅ GROQ RESPONSE:", data);

    if (data.error) {
      return Response.json({
        reply: "❌ API Error: " + data.error.message,
      });
    }

    if (data.choices && data.choices.length > 0) {
      return Response.json({
        reply: data.choices[0].message.content,
      });
    }

    return Response.json({
      reply: "⚠️ No response from AI",
    });
  } catch (error) {
    console.error("❌ ERROR:", error);

    return Response.json(
      { reply: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}