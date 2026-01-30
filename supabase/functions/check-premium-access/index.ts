import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-PREMIUM-ACCESS] ${step}${detailsStr}`);
};

// Valid promo codes - stored server-side for security
const VALID_PROMO_CODES = ['LHT'];

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

    // Parse request body
    let promoCode: string | undefined;
    try {
      const body = await req.json();
      promoCode = body?.promoCode;
    } catch {
      // No body or invalid JSON is fine
    }

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("No auth header - guest user");
      return new Response(JSON.stringify({ 
        hasPremiumAccess: false, 
        reason: "not_authenticated",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      logStep("Invalid auth token");
      return new Response(JSON.stringify({ 
        hasPremiumAccess: false, 
        reason: "invalid_token",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const user = userData.user;
    logStep("User authenticated", { userId: user.id });

    // If promo code is provided, validate it
    if (promoCode) {
      const isValidCode = VALID_PROMO_CODES.includes(promoCode.toUpperCase());
      logStep("Promo code validation", { code: promoCode, isValid: isValidCode });
      
      if (isValidCode) {
        // Record the promo code usage as a purchase with $0
        const { error: insertError } = await supabaseAdmin
          .from("purchases")
          .upsert({
            user_id: user.id,
            assessment_type: "bundle",
            amount_cents: 0,
            status: "completed",
            stripe_session_id: `promo_${promoCode.toUpperCase()}_${Date.now()}`,
          }, { 
            onConflict: "user_id,assessment_type",
            ignoreDuplicates: false 
          });

        if (insertError) {
          logStep("Failed to record promo usage", { error: insertError.message });
        } else {
          logStep("Promo code applied and recorded");
        }

        return new Response(JSON.stringify({ 
          hasPremiumAccess: true, 
          reason: "promo_code",
          promoCodeApplied: true,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ 
          hasPremiumAccess: false, 
          reason: "invalid_promo_code",
          promoCodeApplied: false,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }

    // Check if user has a completed bundle purchase
    const { data: purchases, error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .eq("assessment_type", "bundle");

    if (purchaseError) {
      logStep("Error checking purchases", { error: purchaseError.message });
    }

    if (purchases && purchases.length > 0) {
      logStep("User has premium access via purchase", { count: purchases.length });
      return new Response(JSON.stringify({ 
        hasPremiumAccess: true, 
        reason: "purchased",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // No premium access
    logStep("User does not have premium access");
    return new Response(JSON.stringify({ 
      hasPremiumAccess: false, 
      reason: "no_purchase",
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
