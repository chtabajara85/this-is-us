
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMealSuggestions = async (ingredients: string[]) => {
  if (!process.env.API_KEY) return null;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sugira 3 jantares práticos para uma família com os seguintes ingredientes disponíveis: ${ingredients.join(', ')}. Foque em receitas saudáveis e rápidas.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              ingredientsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "description", "ingredientsNeeded"]
          }
        }
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching meal suggestions:", error);
    return null;
  }
};
