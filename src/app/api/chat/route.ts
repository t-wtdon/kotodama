import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// スタイルごとのプロンプトテンプレート関数
function createPrompt(name: string, keywords: string[], style: string) {
  const kwText = keywords.length
    ? keywords.join("、")
    : "特にキーワードはありません";

  switch (style) {
    case "映画風":
      return `名前は${name}さん。キーワードは${kwText}。これらをもとに、映画の予告編のセリフのような短くて印象的な「今日の名言」を作ってください。`;
    case "漫画風":
      return `名前は${name}さん。キーワードは${kwText}。漫画の吹き出しでキャラクターが言いそうな、ちょっとコミカルな「今日の名言」を作ってください。`;
    case "古典文学風":
      return `名前は${name}さん。キーワードは${kwText}。夏目漱石や芥川龍之介の文体を真似した、格調高い「今日の名言」を作ってください。`;
    case "占い風":
      return `名前は${name}さん。キーワードは${kwText}。今日の運勢やアドバイスを名言風にして作ってください。`;
    case "偉人風":
      return `名前は${name}さん。キーワードは${kwText}。歴史上の偉人が現代に言いそうな「今日の名言」を作ってください。`;
    default:
      return `名前は${name}さん。キーワードは${kwText}。これらをもとに短くて前向きな「今日の名言」を作ってください。`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, keywords, style } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "名前が必要です" }, { status: 400 });
    }

    const prompt = createPrompt(
      name,
      Array.isArray(keywords) ? keywords : [],
      style
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const message = completion.choices[0]?.message?.content;

    return NextResponse.json({ message });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "API呼び出しに失敗しました" },
      { status: 500 }
    );
  }
}
