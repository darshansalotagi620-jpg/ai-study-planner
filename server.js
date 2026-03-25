import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-plan", async (req, res) => {
  const { tasks } = req.body;

  try {
    const prompt = `
Create a smart study plan for a student based on these tasks:
${JSON.stringify(tasks)}

Rules:
- Prioritize subjects with earlier deadlines
- Divide study time clearly
- Suggest daily study strategy
- Keep it simple and useful
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({ plan: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed to generate plan" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});