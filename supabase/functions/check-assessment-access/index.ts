import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-ASSESSMENT-ACCESS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const { assessmentType } = await req.json() as { assessmentType: string };
    
    if (!assessmentType) {
      throw new Error("Assessment type is required");
    }

    logStep("Checking access for", { assessmentType });

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      // Not logged in - they can take their first free assessment
      return new Response(JSON.stringify({ 
        hasAccess: true, 
        reason: "guest_first_free",
        requiresAuth: true,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ 
        hasAccess: true, 
        reason: "guest_first_free",
        requiresAuth: true,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const user = userData.user;
    logStep("User authenticated", { userId: user.id });

    // Check if user has a completed purchase for this assessment
    const { data: purchases, error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .or(`assessment_type.eq.${assessmentType},assessment_type.eq.bundle`);

    if (purchaseError) {
      logStep("Error checking purchases", { error: purchaseError.message });
    }

    if (purchases && purchases.length > 0) {
      logStep("User has purchased access", { count: purchases.length });
      return new Response(JSON.stringify({ 
        hasAccess: true, 
        reason: "purchased",
        requiresAuth: false,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check if user has used their free assessment for this type
    const { data: freeUsage, error: freeError } = await supabaseAdmin
      .from("free_assessments")
      .select("*")
      .eq("user_id", user.id)
      .eq("assessment_type", assessmentType)
      .maybeSingle();

    if (freeError) {
      logStep("Error checking free usage", { error: freeError.message });
    }

    if (!freeUsage) {
      // User hasn't used their free assessment for this type
      logStep("User has free access available");
      return new Response(JSON.stringify({ 
        hasAccess: true, 
        reason: "first_free",
        requiresAuth: false,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // User has used their free assessment and hasn't purchased
    logStep("User needs to purchase");
    return new Response(JSON.stringify({ 
      hasAccess: false, 
      reason: "requires_purchase",
      requiresAuth: false,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
