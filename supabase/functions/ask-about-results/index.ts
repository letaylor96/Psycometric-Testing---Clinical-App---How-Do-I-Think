import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[ASK-ABOUT-RESULTS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
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
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    logStep("Premium access verified");

    // === PROCESS AI REQUEST ===
    const { messages, resultsContext } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful, empathetic AI assistant specializing in explaining psychological and cognitive assessment results. You have access to the user's assessment results and should help them understand what these results mean in practical terms.

IMPORTANT GUIDELINES:
1. Be warm, supportive, and non-judgmental in your responses
2. Explain technical terms in accessible language
3. Focus on strengths while being honest about challenges
4. Always remind users that these are screening tools, not clinical diagnoses
5. For ADHD screening specifically, emphasize that only a qualified professional can diagnose ADHD
6. Provide practical, actionable insights when possible
7. Connect different aspects of their profile when relevant
8. Keep responses focused and concise (2-4 paragraphs typically)

USER'S ASSESSMENT RESULTS:
${resultsContext}

Help the user understand their results, make connections between different assessments, and provide practical insights for their personal and professional life.`;

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
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("ask-about-results error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
