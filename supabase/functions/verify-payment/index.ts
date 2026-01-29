import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const { sessionId } = await req.json() as { sessionId: string };
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    logStep("Verifying session", { sessionId });

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }

    const user = userData.user;
    logStep("User authenticated", { userId: user.id });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Session retrieved", { status: session.payment_status, metadata: session.metadata });

    if (session.payment_status === "paid") {
      // Update purchase record to completed
      const { error: updateError } = await supabaseAdmin
        .from("purchases")
        .update({
          status: "completed",
          stripe_payment_intent_id: session.payment_intent as string,
        })
        .eq("stripe_session_id", sessionId);

      if (updateError) {
        logStep("Failed to update purchase", { error: updateError.message });
      } else {
        logStep("Purchase marked as completed");
      }

      // If it's a bundle, grant access to all assessments
      const assessmentType = session.metadata?.assessment_type;
      if (assessmentType === "bundle") {
        const bundleTypes = ["personality", "iq", "cognitive", "adhd"];
        for (const type of bundleTypes) {
          await supabaseAdmin.from("purchases").upsert({
            user_id: user.id,
            assessment_type: type,
            stripe_session_id: `${sessionId}_bundle_${type}`,
            amount_cents: 0,
            status: "completed",
          }, { onConflict: "user_id,assessment_type" });
        }
        logStep("Bundle access granted for all assessments");
      }

      return new Response(JSON.stringify({ 
        success: true, 
        assessmentType,
        message: "Payment verified successfully" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Payment not completed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
