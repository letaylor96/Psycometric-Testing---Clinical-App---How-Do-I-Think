import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Price IDs for each assessment - $3 each, $9.99 bundle
const PRICE_CONFIG = {
  personality: {
    priceId: "price_1SunEvBc1qszx46pso7A1zyO",
    amount: 300,
    name: "Who Am I? (Personality)",
  },
  iq: {
    priceId: "price_1SunFCBc1qszx46pw2qPtn6F",
    amount: 300,
    name: "IQ Assessment",
  },
  cognitive: {
    priceId: "price_1SunFRBc1qszx46pIVIagGTN",
    amount: 300,
    name: "How Do I Think? (Cognitive)",
  },
  adhd: {
    priceId: "price_1SunFhBc1qszx46pHaZLrhXQ",
    amount: 300,
    name: "Am I Neurodivergent? (ADHD)",
  },
  bundle: {
    priceId: "price_1SunFvBc1qszx46p9jK6KiNp",
    amount: 999,
    name: "Complete Assessment Bundle",
  },
};

type AssessmentType = keyof typeof PRICE_CONFIG;

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-ASSESSMENT-PAYMENT] ${step}${detailsStr}`);
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

    const { assessmentType } = await req.json() as { assessmentType: AssessmentType };
    
    if (!PRICE_CONFIG[assessmentType]) {
      throw new Error(`Invalid assessment type: ${assessmentType}`);
    }

    logStep("Assessment type validated", { assessmentType });

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    const user = userData.user;
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing Stripe customer", { customerId });
    }

    const config = PRICE_CONFIG[assessmentType];

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: config.priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=${assessmentType}`,
      cancel_url: `${req.headers.get("origin")}/?payment_canceled=true`,
      metadata: {
        user_id: user.id,
        assessment_type: assessmentType,
      },
    });

    logStep("Checkout session created", { sessionId: session.id });

    // Create pending purchase record
    const { error: insertError } = await supabaseAdmin
      .from("purchases")
      .insert({
        user_id: user.id,
        assessment_type: assessmentType,
        stripe_session_id: session.id,
        amount_cents: config.amount,
        status: "pending",
      });

    if (insertError) {
      logStep("Failed to create purchase record", { error: insertError.message });
      // Don't fail the request, just log
    } else {
      logStep("Purchase record created");
    }

    return new Response(JSON.stringify({ url: session.url }), {
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
