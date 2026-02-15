
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePayrollData = async (data: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this payroll and attendance data and provide budget recommendations and efficiency tips: ${JSON.stringify(data)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          budgetAdvice: { type: Type.STRING },
          efficiencyScore: { type: Type.NUMBER },
          topActionItems: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "budgetAdvice", "efficiencyScore", "topActionItems"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateRencanaKerja = async (previousMonthData: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Based on previous month performance: ${JSON.stringify(previousMonthData)}, generate a strategic work plan for next month focus on wage efficiency.`,
    config: {
      thinkingConfig: { thinkingBudget: 2000 }
    }
  });
  return response.text;
};
