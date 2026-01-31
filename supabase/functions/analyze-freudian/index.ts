import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface FreudianAnswer {
  questionId: number;
  answer: string;
}

interface FreudianResults {
  idStrength: number;
  egoStrength: number;
  superegoStrength: number;
  structuralBalance: 'id-dominant' | 'ego-dominant' | 'superego-dominant' | 'balanced' | 'conflicted';
  primaryDefenses: string[];
  defenseMaturity: 'primitive' | 'neurotic' | 'mature';
  coreConflicts: string[];
  unconsciousThemes: string[];
  profileSummary: string;
  strengths: string[];
  growthAreas: string[];
  answers: FreudianAnswer[];
}

const systemPrompt = `You are an expert psychoanalyst trained in Freudian psychoanalytic theory. Analyze the following free-form responses to psychological questions and provide a comprehensive assessment.

Your analysis should be based on classical Freudian concepts including:
- The structural model (Id, Ego, Superego)
- Defense mechanisms (denial, projection, repression, displacement, rationalization, sublimation, etc.)
- The unconscious and its manifestations
- Psychosexual development influences
- Repetition compulsion and transference patterns
- Dream analysis principles
- The pleasure principle vs reality principle

Provide your analysis in the following JSON format ONLY (no other text):
{
  "idStrength": <number 0-100 representing strength of primal drives and impulse expression>,
  "egoStrength": <number 0-100 representing reality testing and adaptive functioning>,
  "superegoStrength": <number 0-100 representing moral conscience and internalized standards>,
  "structuralBalance": <one of: "id-dominant", "ego-dominant", "superego-dominant", "balanced", "conflicted">,
  "primaryDefenses": [<array of 3-5 defense mechanisms the person primarily uses, e.g., "Rationalization", "Projection", "Sublimation">],
  "defenseMaturity": <one of: "primitive", "neurotic", "mature">,
  "coreConflicts": [<array of 3-4 core psychological conflicts identified, written as clear statements>],
  "unconsciousThemes": [<array of 3-4 unconscious themes or patterns detected>],
  "profileSummary": <string, 150-200 word psychoanalytic summary of the individual>,
  "strengths": [<array of 4-5 psychological strengths identified>],
  "growthAreas": [<array of 4-5 areas for psychological growth or exploration>]
}

Be insightful but compassionate. Avoid pathologizing normal human experience. Focus on patterns, not diagnoses. Provide actionable insights where appropriate.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json() as { answers: FreudianAnswer[] };
    
    if (!answers || !Array.isArray(answers)) {
      throw new Error("Invalid answers format");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Format answers for analysis
    const formattedAnswers = answers
      .map((a, idx) => `Question ${idx + 1} (ID: ${a.questionId}): ${a.answer}`)
      .join("\n\n");

    const userPrompt = `Please analyze these 20 free-form responses from a Freudian psychoanalytic perspective:\n\n${formattedAnswers}`;

    console.log("Sending request to Lovable AI for Freudian analysis...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("AI response received, parsing...");

    // Extract JSON from the response (handle potential markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const analysisResults = JSON.parse(jsonStr) as Omit<FreudianResults, 'answers'>;

    // Combine AI analysis with original answers
    const fullResults: FreudianResults = {
      ...analysisResults,
      answers,
    };

    console.log("Freudian analysis complete");

    return new Response(JSON.stringify(fullResults), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in analyze-freudian:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
