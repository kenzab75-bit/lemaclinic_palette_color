import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscribeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: SubscribeRequest = await req.json();

    console.log("Newsletter subscription request for:", email);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Email invalide" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    // Add contact to Resend audience using REST API (optional)
    const audienceId = Deno.env.get("RESEND_AUDIENCE_ID");
    
    if (audienceId) {
      const contactResponse = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          unsubscribed: false,
        }),
      });

      if (!contactResponse.ok) {
        const errorData = await contactResponse.json();
        console.error("Resend contact API error:", errorData);
        
        if (contactResponse.status === 409) {
          return new Response(
            JSON.stringify({ 
              error: "Cet email est déjà inscrit à la newsletter."
            }),
            {
              status: 409,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            }
          );
        }
      } else {
        const contactData = await contactResponse.json();
        console.log("Contact added to Resend:", contactData);
      }
    }

    // Send welcome email
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LemaClinic Truth <onboarding@resend.dev>", // Replace with your verified domain
        to: [email],
        subject: "Bienvenue à notre newsletter !",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #dc2626;">Merci de votre inscription !</h1>
            <p>Vous êtes maintenant inscrit à la newsletter de LemaClinic Truth.</p>
            <p>Vous recevrez les dernières actualités et témoignages directement dans votre boîte mail.</p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Vos données sont protégées conformément au RGPD.
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Pour vous désinscrire, cliquez sur le lien de désinscription dans nos emails.
            </p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error("Resend email API error:", errorData);
      throw new Error("Failed to send welcome email");
    }

    const emailData = await emailResponse.json();
    console.log("Welcome email sent:", emailData);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Inscription réussie ! Vérifiez votre email.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in newsletter-subscribe function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Une erreur est survenue lors de l'inscription.",
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
