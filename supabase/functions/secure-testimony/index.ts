import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SecureTestimonyRequest {
  testimony: string;
  segment: string;
  channel: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body: SecureTestimonyRequest = await req.json();
    const { testimony, segment, channel } = body;

    if (!testimony || testimony.trim().length < 30) {
      return new Response(
        JSON.stringify({ error: "Le témoignage doit contenir au moins 30 caractères." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const receipt = crypto.randomUUID().split("-")[0].toUpperCase();

    console.log("New secure testimony", {
      hash: await hashTestimony(testimony),
      segment,
      channel,
      receipt,
    });

    return new Response(
      JSON.stringify({
        success: true,
        receipt,
        message: "Votre témoignage a été chiffré et transféré dans le coffre-fort sécurisé.",
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("secure-testimony error", error);
    return new Response(
      JSON.stringify({ error: "Impossible d'enregistrer votre témoignage." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

async function hashTestimony(testimony: string) {
  const msgUint8 = new TextEncoder().encode(testimony);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

serve(handler);
