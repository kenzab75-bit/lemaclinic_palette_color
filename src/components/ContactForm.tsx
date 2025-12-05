import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, ShieldCheck } from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(100, { message: "Le nom doit contenir moins de 100 caractères" }),
  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email doit contenir moins de 255 caractères" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Le message est requis" })
    .max(1000, { message: "Le message doit contenir moins de 1000 caractères" }),
  channel: z.enum(["email", "whatsapp"], {
    required_error: "Choisissez un canal de réponse",
  }),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter le traitement de vos données",
    }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      channel: "email",
      consent: false,
    },
  });

  const contactEmail = "collectif@lemaclinictruth.fr";
  const contactChannels = {
    email: {
      label: "Email chiffré",
    },
      whatsapp: {
        label: "WhatsApp sécurisé",
      },
  } as const;

  const onSubmit = (data: ContactFormValues) => {
    const payload = encodeURIComponent(
      `Nouveau message du collectif\n\nNom: ${data.name}\nEmail: ${data.email}\nCanal souhaité: ${contactChannels[data.channel].label}\n\n${data.message}`
    );

    window.location.href = `mailto:${contactEmail}?subject=Collectif%20LemaClinic%20Truth&body=${payload}`;

    toast({
      title: "Message prêt à être envoyé",
      description:
        data.channel === "email"
          ? "Votre logiciel de messagerie va s'ouvrir pour finaliser l'envoi sécurisé."
          : "Précisez dans votre email que vous souhaitez poursuivre via " + contactChannels[data.channel].label.toLowerCase() + ".",
    });

    form.reset({
      name: "",
      email: "",
      message: "",
      channel: "email",
      consent: false,
    });
  };

  return (
    <div className="w-full h-full p-8 lg:p-10 bg-gradient-to-b from-[#213245] to-[#0f1b29] rounded-2xl border border-white/10 shadow-xl backdrop-blur text-white">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 border border-white/15 shadow-lg">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Contactez-nous</h2>
        <p className="text-white/80">
          Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
        </p>
        <div className="mt-4 text-sm text-white/75 flex flex-col items-center gap-2 text-center">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#E02B2B]" />
              Vos messages sont priorisés selon l'urgence médicale ou juridique.
            </p>
          <p className="text-xs uppercase tracking-widest text-white/70">Équipe bénévole santé + juridique</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Nom complet *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jean Dupont"
                    {...field}
                    className="transition-all duration-200 focus:scale-[1.02] bg-white/5 border border-white/15 text-white placeholder:text-white/60 focus:border-[#E02B2B] focus:ring-2 focus:ring-[#E02B2B]/30"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Adresse email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jean.dupont@example.com"
                    {...field}
                    className="transition-all duration-200 focus:scale-[1.02] bg-white/5 border border-white/15 text-white placeholder:text-white/60 focus:border-[#E02B2B] focus:ring-2 focus:ring-[#E02B2B]/30"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="channel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Canal de réponse privilégié</FormLabel>
                <FormControl>
                  <RadioGroup className="grid gap-3 md:grid-cols-2" value={field.value} onValueChange={field.onChange}>
                    <FormItem className="rounded-2xl border border-white/12 bg-gradient-to-b from-[#334E60]/95 via-[#2B4255]/95 to-[#1f2f3d]/95 p-4 backdrop-blur-[1px] shadow-lg shadow-black/30 transition-all duration-200 ease-out data-[state=checked]:border-[#E02B2B]/85 data-[state=checked]:ring-1 data-[state=checked]:ring-[#E02B2B]/40">
                      <FormControl>
                        <RadioGroupItem value="email" className="border-white/60 data-[state=checked]:border-[#E02B2B] data-[state=checked]:bg-[#E02B2B]" />
                      </FormControl>
                      <FormLabel className="font-semibold text-[#F5F6F7]">Email</FormLabel>
                      <p className="text-xs text-[#D8E4EF]/90">Réponse directe via messagerie sécurisée</p>
                    </FormItem>
                    <FormItem className="rounded-2xl border border-white/12 bg-gradient-to-b from-[#334E60]/95 via-[#2B4255]/95 to-[#1f2f3d]/95 p-4 backdrop-blur-[1px] shadow-lg shadow-black/30 transition-all duration-200 ease-out data-[state=checked]:border-[#E02B2B]/85 data-[state=checked]:ring-1 data-[state=checked]:ring-[#E02B2B]/40">
                      <FormControl>
                        <RadioGroupItem value="whatsapp" className="border-white/60 data-[state=checked]:border-[#E02B2B] data-[state=checked]:bg-[#E02B2B]" />
                      </FormControl>
                      <FormLabel className="font-semibold text-[#F5F6F7]">WhatsApp</FormLabel>
                      <p className="text-xs text-[#D8E4EF]/90">Nous convenons d'un relais sécurisé après votre email</p>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Votre message *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Décrivez votre situation ou posez votre question..."
                    className="min-h-[150px] resize-none transition-all duration-200 focus:scale-[1.02] bg-white/5 border border-white/15 text-white placeholder:text-white/60 focus:border-[#E02B2B] focus:ring-2 focus:ring-[#E02B2B]/30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-white/15 p-4 bg-white/5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-white/50 data-[state=checked]:bg-[#E02B2B] data-[state=checked]:border-[#E02B2B]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal text-white cursor-pointer">
                    J'accepte que mes données soient traitées conformément à la{" "}
                    <a href="/politique-confidentialite" className="text-primary hover:underline font-semibold">
                      politique de confidentialité
                    </a>
                    {" "}*
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold group bg-gradient-to-r from-[#E02B2B] to-[#B61F1F] text-white rounded-full shadow-lg shadow-[#E02B2B]/30 hover:shadow-[#E02B2B]/50 hover:scale-[1.02]"
            disabled={form.formState.isSubmitting}
          >
            <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </Button>

          <p className="text-sm text-white/70 text-center">
            * Champs obligatoires
          </p>
        </form>
      </Form>
    </div>
  );
}
