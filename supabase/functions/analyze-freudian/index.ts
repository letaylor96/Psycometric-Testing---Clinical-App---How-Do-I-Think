import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface Answer {
  questionId: number;
  answer: string;
}

type Framework = 'freudian' | 'jungian' | 'nietzschean';

const frameworkPrompts: Record<Framework, string> = {
  freudian: `You are an expert psychoanalyst trained in Freudian psychoanalytic theory. Analyze these free-form responses from a classical Freudian perspective.

Your analysis should be based on:
- The structural model (Id, Ego, Superego)
- Defense mechanisms (denial, projection, repression, displacement, rationalization, sublimation, etc.)
- The unconscious and its manifestations
- Psychosexual development influences
- Repetition compulsion and transference patterns
- Dream analysis principles
- The pleasure principle vs reality principle

Provide your analysis in this JSON format ONLY (no other text):
{
  "framework": "freudian",
  "idStrength": <number 0-100 representing strength of primal drives>,
  "egoStrength": <number 0-100 representing reality testing and adaptive functioning>,
  "superegoStrength": <number 0-100 representing moral conscience>,
  "structuralBalance": <one of: "id-dominant", "ego-dominant", "superego-dominant", "balanced", "conflicted">,
  "primaryDefenses": [<array of 3-5 defense mechanisms>],
  "defenseMaturity": <one of: "primitive", "neurotic", "mature">,
  "coreConflicts": [<array of 3-4 core psychological conflicts>],
  "unconsciousThemes": [<array of 3-4 unconscious themes>],
  "profileSummary": <150-200 word psychoanalytic summary>,
  "strengths": [<array of 4-5 psychological strengths>],
  "growthAreas": [<array of 4-5 areas for growth>]
}`,

  jungian: `You are an expert in Jungian Analytical Psychology. Analyze these free-form responses from Carl Jung's perspective.

Your analysis should be based on:
- Archetypes (Hero, Shadow, Anima/Animus, Self, Wise Old Man/Woman, Trickster, etc.)
- The individuation process and stages of psychological development
- The collective unconscious and personal unconscious
- Persona vs authentic self
- Shadow work and integration
- Psychological types (Thinking, Feeling, Sensation, Intuition)
- Symbols and their meanings
- The transcendent function and integration of opposites

Provide your analysis in this JSON format ONLY (no other text):
{
  "framework": "jungian",
  "dominantArchetypes": [<array of 3-4 dominant archetypes expressed, e.g., "The Hero", "The Caregiver">],
  "shadowContent": [<array of 3-4 shadow aspects identified>],
  "personaMask": <string describing the social mask/persona>,
  "animaAnimusBalance": <one of: "anima-leaning", "animus-leaning", "integrated", "undeveloped">,
  "individuationStage": <one of: "unconscious", "shadow-work", "anima-animus", "self-realization">,
  "collectiveUnconscious": [<array of 3-4 collective unconscious themes>],
  "primaryFunction": <one of: "thinking", "feeling", "sensation", "intuition">,
  "auxiliaryFunction": <one of: "thinking", "feeling", "sensation", "intuition">,
  "profileSummary": <150-200 word Jungian analysis summary>,
  "strengths": [<array of 4-5 psychological strengths>],
  "growthAreas": [<array of 4-5 areas for individuation work>]
}`,

  nietzschean: `You are an expert in Nietzschean philosophy and psychological analysis. Analyze these free-form responses from Friedrich Nietzsche's perspective.

Your analysis should be based on:
- Will to Power as fundamental drive
- Master vs Slave morality
- Ressentiment and its psychological effects
- The Übermensch ideal and self-overcoming
- Eternal Recurrence as a test of life affirmation
- Active vs Passive Nihilism
- Amor Fati (love of fate)
- Authenticity vs herd mentality
- The creation of one's own values
- The death of God and its implications for meaning-making

Provide your analysis in this JSON format ONLY (no other text):
{
  "framework": "nietzschean",
  "willToPower": <number 0-100 representing drive for growth and self-overcoming>,
  "lifeAffirmation": <number 0-100 representing ability to embrace existence>,
  "overcomingCapacity": <number 0-100 representing ability to transcend limitations>,
  "slaveVsMasterMorality": <one of: "master", "slave", "transitional", "beyond">,
  "resentimentLevel": <one of: "low", "moderate", "high", "overcome">,
  "authenticityScore": <number 0-100 representing freedom from herd mentality>,
  "ubermenschTraits": [<array of 3-4 self-overcoming/creative traits>],
  "lastManTraits": [<array of 3-4 comfort-seeking/stagnation traits>],
  "eternalRecurrence": <one of: "embrace", "struggle", "reject">,
  "nihilismStance": <one of: "passive", "active", "creative", "transcended">,
  "profileSummary": <150-200 word Nietzschean analysis summary>,
  "strengths": [<array of 4-5 strengths in self-creation>],
  "growthAreas": [<array of 4-5 areas for self-overcoming>]
}`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers, framework = 'freudian' } = await req.json() as { answers: Answer[]; framework?: Framework };
    
    if (!answers || !Array.isArray(answers)) {
      throw new Error("Invalid answers format");
    }

    if (!['freudian', 'jungian', 'nietzschean'].includes(framework)) {
      throw new Error("Invalid framework. Must be 'freudian', 'jungian', or 'nietzschean'");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Format answers for analysis
    const formattedAnswers = answers
      .map((a, idx) => `Question ${idx + 1}: ${a.answer}`)
      .join("\n\n");

    const systemPrompt = frameworkPrompts[framework];
    const userPrompt = `Please analyze these 20 free-form responses:\n\n${formattedAnswers}`;

    console.log(`Sending request for ${framework} analysis...`);

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

    const analysisResults = JSON.parse(jsonStr);

    // Combine AI analysis with original answers
    const fullResults = {
      ...analysisResults,
      answers,
    };

    console.log(`${framework} analysis complete`);

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
