import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface CognitiveProfile {
  iq: number;
  primaryStrength: string;
  divergentType: string;
  categoryScores: Array<{ category: string; percentage: number }>;
  divergentProfile: Array<{ dimension: string; percentage: number }>;
}

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[ANALYZE-CV] ${step}${detailsStr}`);
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // === AUTHENTICATION CHECK ===
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("No auth header - rejecting request");
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      logStep("Invalid auth token");
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const user = userData.user;
    logStep("User authenticated", { userId: user.id });

    // === PREMIUM ACCESS CHECK ===
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .eq('assessment_type', 'bundle')
      .maybeSingle();

    if (purchaseError) {
      logStep("Error checking premium access", { error: purchaseError.message });
    }

    if (!purchase) {
      logStep("User does not have premium access");
      return new Response(
        JSON.stringify({ error: 'Premium access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    logStep("Premium access verified");

    // === PROCESS CV ANALYSIS ===
    const formData = await req.formData();
    const cvFile = formData.get('cv') as File;
    const cognitiveProfileStr = formData.get('cognitiveProfile') as string;

    if (!cvFile || !cognitiveProfileStr) {
      throw new Error('Missing CV file or cognitive profile');
    }

    const cognitiveProfile: CognitiveProfile = JSON.parse(cognitiveProfileStr);

    // Read the CV file content
    const cvText = await cvFile.text();

    console.log('Processing CV analysis for profile:', cognitiveProfile.divergentType);

    // Call Lovable AI Gateway for analysis
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content: `You are an elite executive career strategist who works with Fortune 500 leaders and high-potential executives. You provide premium-tier career intelligence that executives pay $5,000+ for at top consulting firms.

Your task is to analyze a candidate's CV/resume in combination with their cognitive assessment results to produce an EXCLUSIVE "Career Intelligence Report" that will help them position themselves for senior roles.

Be specific, insightful, and use executive language. Reference specific details from their CV. Make them feel like they've received rare, valuable insights worth sharing on LinkedIn.

IMPORTANT: Format your response as valid JSON with this exact structure:
{
  "executiveSummary": "2-3 sentence powerful positioning statement",
  "careerTrajectoryScore": 85,
  "leadershipPotentialIndex": "A+" | "A" | "A-" | "B+" | "B",
  "cognitiveRoleAlignment": [
    {
      "role": "Chief Strategy Officer",
      "alignmentScore": 94,
      "reasoning": "Your strategic thinking combined with..."
    }
  ],
  "uniqueStrengths": [
    {
      "strength": "Strategic Pattern Recognition",
      "evidence": "Based on your experience at X and cognitive profile...",
      "executiveValue": "This positions you for board-level advisory roles"
    }
  ],
  "careerAccelerators": [
    {
      "accelerator": "Position yourself as a transformation leader",
      "action": "Specific actionable advice...",
      "impact": "High/Medium"
    }
  ],
  "interviewPowerStatements": [
    "When asked about leadership style: 'My cognitive assessment reveals...'",
    "When discussing problem-solving: '...'"
  ],
  "linkedInHeadline": "Suggested LinkedIn headline that incorporates cognitive archetype",
  "executivePositioning": "One paragraph on how to position yourself for C-suite"
}`
          },
          {
            role: 'user',
            content: `## COGNITIVE ASSESSMENT RESULTS

**Cognitive Score (IQ Equivalent):** ${cognitiveProfile.iq}
**Executive Archetype:** ${cognitiveProfile.divergentType}
**Primary Cognitive Strength:** ${cognitiveProfile.primaryStrength}

**Category Scores:**
${cognitiveProfile.categoryScores.map(s => `- ${s.category}: ${s.percentage}%`).join('\n')}

**Divergent Thinking Profile:**
${cognitiveProfile.divergentProfile.map(p => `- ${p.dimension}: ${p.percentage}%`).join('\n')}

---

## CV/RESUME CONTENT

${cvText}

---

Please analyze this candidate's profile and generate a comprehensive Career Intelligence Report.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', errorText);
      throw new Error('Failed to analyze CV with AI');
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in AI response');
    }

    console.log('AI analysis complete');

    // Parse the JSON response from AI
    let analysisResult;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/```\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      analysisResult = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Return a structured fallback based on the raw content
      analysisResult = {
        executiveSummary: content.substring(0, 300),
        careerTrajectoryScore: 78,
        leadershipPotentialIndex: "A-",
        cognitiveRoleAlignment: [
          {
            role: "Strategic Leadership",
            alignmentScore: 85,
            reasoning: "Based on your cognitive profile"
          }
        ],
        uniqueStrengths: [],
        careerAccelerators: [],
        interviewPowerStatements: [],
        linkedInHeadline: `${cognitiveProfile.divergentType} | Strategic Leader`,
        executivePositioning: content.substring(0, 500)
      };
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in analyze-cv function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});