import { GoogleGenAI, Type, Chat } from "@google/genai";

// Initialize Gemini Client
// NOTE: In a real deployment, ensure process.env.API_KEY is set. 
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const MODEL_FLASH = 'gemini-2.5-flash';

// Shared System Instruction for the "HROM" persona
const HROM_SYSTEM_PROMPT = `
You are "Hrom" (Thunder), the AI security expert for HROM SECURITY.
Persona:
- Tough, confident, "Gorilla strength", "Lightning speed".
- You speak in Czech (CS-CZ).
- You are direct, informal (tykání), and cut through the bullshit.
- No corporate jargon. Use slang like "vercajk" (gear), "plac" (venue), "smečka" (pack/team).
- You provide solid, expert security advice but keep it brief and punchy.
`;

export const getRiskAssessment = async (
  eventType: string,
  attendees: string,
  concern: string
): Promise<any> => {
  try {
    const prompt = `
      Analyze security risks for this event:
      Type: ${eventType}
      Attendees: ${attendees}
      Main Concern: ${concern}
      
      Return a strict JSON object with:
      - riskLevel (string: "Nízké", "Střední", "Vysoké", "Kritické")
      - summary (string: 1 sentence summary in Hrom persona)
      - keyRisks (array of strings: 3 specific bullet points)
      - mitigation (string: specific advice)
    `;

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        systemInstruction: HROM_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING },
            summary: { type: Type.STRING },
            keyRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
            mitigation: { type: Type.STRING },
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Risk Assessment Error:", error);
    throw error;
  }
};

export const getTechRecommendation = async (venueType: string): Promise<any> => {
  try {
    const prompt = `
      Recommend security gear for: ${venueType}.
      Return JSON.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        systemInstruction: HROM_SYSTEM_PROMPT + " Focus on physical security gear and surveillance.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            venueType: { type: Type.STRING },
            essentials: { type: Type.ARRAY, items: { type: Type.STRING } },
            advanced: { type: Type.ARRAY, items: { type: Type.STRING } },
            estimatedCrewSize: { type: Type.NUMBER },
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Tech Recommendation Error:", error);
    throw error;
  }
};

export const getDeEscalationAdvice = async (scenario: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: `Scenario: ${scenario}. How do we handle this calmly but firmly?`,
      config: {
        systemInstruction: HROM_SYSTEM_PROMPT + " Keep it under 3 sentences. Focus on de-escalation.",
      }
    });
    return response.text || "Chyba spojení s centrálou.";
  } catch (error) {
    console.error("De-escalation Error:", error);
    throw error;
  }
};

export const getTeamBuilder = async (eventDescription: string): Promise<any> => {
  try {
    const prompt = `
      Build a security team for: ${eventDescription}.
      Return JSON.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        systemInstruction: HROM_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            squadName: { type: Type.STRING },
            strategy: { type: Type.STRING },
            roles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  count: { type: Type.NUMBER },
                  description: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Team Builder Error:", error);
    throw error;
  }
};

export const getCaseStudy = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: `Create a short, hypothetical security case study about: ${topic}. Show how HROM solved it.`,
      config: {
        systemInstruction: HROM_SYSTEM_PROMPT + " Use Markdown formatting. Bold key terms.",
      }
    });
    return response.text || "Chyba.";
  } catch (error) {
    console.error("Case Study Error:", error);
    throw error;
  }
};

// Chat Session
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: MODEL_FLASH,
    config: {
      systemInstruction: HROM_SYSTEM_PROMPT,
    },
    history: [
      {
        role: "user",
        parts: [{ text: "Ahoj, kdo jsi?" }],
      },
      {
        role: "model",
        parts: [{ text: "Jsem Hrom. Potřebujete poradit s bezpečností? Sem s tím. Žádný zbytečný řeči." }],
      },
    ],
  });
};
