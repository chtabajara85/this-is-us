
import { GoogleGenAI, Type } from "@google/genai";

// Inicialização segura
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const getMealSuggestions = async (ingredients: string[]) => {
  const ai = getAIClient();
  if (!ai) {
    console.warn("API Key não configurada. IA desativada.");
    return null;
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Com base nesses ingredientes: ${ingredients.join(', ')}, sugira 3 receitas rápidas para o jantar. Responda em Português do Brasil.`,
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
    console.error("Erro no serviço Gemini:", error);
    return null;
  }
};
