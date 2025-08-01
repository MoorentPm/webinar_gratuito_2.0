import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MessageCircle, Play, Crown, Users, MapPin, Check, ChartLine, Building, ArrowDown, ArrowRight, Inbox, CheckCircle, LoaderPinwheel, ExternalLink } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertNewsletterSchema, type InsertNewsletterSubscription } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const form = useForm<InsertNewsletterSubscription>({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: InsertNewsletterSubscription) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Iscrizione completata!",
        description: "Riceverai presto i nostri contenuti esclusivi.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Errore nell'iscrizione",
        description: error.message || "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (data: InsertNewsletterSubscription) => {
    newsletterMutation.mutate(data);
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // YouTube API setup per controllare lo stato del video
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Global callback quando l'API è pronta
    (window as any).onYouTubeIframeAPIReady = () => {
      new (window as any).YT.Player('youtube-player', {
        events: {
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1
            if (event.data === 1) {
              setIsVideoPlaying(true);
            } else {
              setIsVideoPlaying(false);
            }
          }
        }
      });
    };

    return () => {
      // Cleanup
      if ((window as any).onYouTubeIframeAPIReady) {
        delete (window as any).onYouTubeIframeAPIReady;
      }
    };
  }, []);

  return (
    <div className="font-sans bg-background text-foreground antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed left-0 right-0 z-50 glass-effect border-b border-gray-100 transition-all duration-500 ${
        isVideoPlaying ? '-top-16 opacity-50' : 'top-0 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="https://i.imgur.com/aazwI7x.png" 
                alt="MoorentPM Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4 md:space-x-8">
              <a href="#webinar" className="text-secondary hover:text-primary transition-colors text-sm md:text-base">
                Webinar
              </a>
              <a href="#newsletter" className="text-secondary hover:text-primary transition-colors text-sm md:text-base">
                Newsletter
              </a>
              <a href="#contatti" className="text-secondary hover:text-primary transition-colors text-sm md:text-base">
                Contatti
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&h=1384"
            alt="Luxury real estate property with modern architecture"
            className="w-full h-full object-cover opacity-5"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Trasforma il Tuo Immobile in un{" "}
              <span className="block font-semibold text-primary">Asset Redditizio</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-secondary font-light max-w-3xl mx-auto leading-relaxed px-4">
              Scopri le strategie premium per massimizzare i rendimenti degli affitti brevi nel Triveneto.{" "}
              <span className="text-primary font-medium">60 minuti di contenuto esclusivo</span> per proprietari immobiliari di alto valore.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <div className="flex items-center space-x-3 text-secondary">
                <Play className="w-6 h-6" />
                <span className="font-medium">Webinar completo disponibile ora</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-secondary opacity-30"></div>
              <div className="flex items-center space-x-3 text-secondary">
                <Crown className="w-6 h-6 text-accent" />
                <span className="font-medium">Strategie premium esclusive</span>
              </div>
            </div>

            <a
              href="#webinar"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover-lift"
            >
              <ArrowDown className="w-4 h-4 mr-2" />
              Guarda il Webinar
            </a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="webinar" className="py-20 px-4 sm:px-6 lg:px-8 scroll-reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
              Il Tuo Immobile, Il Tuo <span className="font-semibold">Successo</span>
            </h2>
            <p className="text-xl text-secondary font-light max-w-3xl mx-auto">
              Un webinar completo che ti guiderà attraverso le strategie più efficaci per trasformare la tua proprietà in una fonte di reddito costante e redditizia.
            </p>
          </div>

          <div className="relative hover-lift">
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&rel=0&showinfo=0&enablejsapi=1"
                title="MoorentPM Webinar - Trasforma il Tuo Immobile in un Asset Redditizio"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl shadow-2xl"
                id="youtube-player"
              />
            </div>

            <div className={`absolute -bottom-8 left-0 right-0 mx-4 transition-all duration-500 ${
              isVideoPlaying ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}>
              <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-gray-100">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">Webinar Premium</h3>
                      <p className="text-secondary text-sm sm:text-base">Durata: 60 minuti • Contenuto esclusivo</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm text-secondary">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span>Proprietari HNWI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>Triveneto</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 scroll-reveal">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center hover-lift">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Modern property management consultation with professional team"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Strategie Innovative</h3>
              <p className="text-secondary leading-relaxed">
                Metodologie avanzate per ottimizzare ogni aspetto della gestione immobiliare
              </p>
            </div>

            <div className="text-center hover-lift">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Premium business consultation in luxury office setting"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Consulenza Premium</h3>
              <p className="text-secondary leading-relaxed">
                Approccio personalizzato per massimizzare il ROI delle tue proprietà di lusso
              </p>
            </div>

            <div className="text-center hover-lift">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Luxury real estate portfolio analysis with financial charts"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risultati Misurabili</h3>
              <p className="text-secondary leading-relaxed">
                Monitoraggio costante delle performance e ottimizzazione continua dei rendimenti
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8 scroll-reveal">
        <div className="max-w-4xl mx-auto">
          <div className="premium-gradient rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-light mb-6">
                Ricevi Strategie <span className="font-semibold">Esclusive</span> via Email
              </h2>
              <p className="text-lg sm:text-xl text-secondary font-light max-w-2xl mx-auto leading-relaxed px-4">
                Insights di mercato, case study premium e strategie avanzate per proprietari immobiliari che vogliono massimizzare i loro investimenti nel Triveneto.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleNewsletterSubmit)} className="max-w-md mx-auto space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="La tua email"
                            {...field}
                            className="w-full px-6 py-4 bg-white rounded-full text-lg font-medium placeholder:text-secondary border-2 border-transparent focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                            <Inbox className="w-5 h-5 text-secondary" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={newsletterMutation.isPending}
                  className="btn-primary w-full px-8 py-4 text-white font-semibold rounded-full text-lg"
                >
                  {newsletterMutation.isPending ? (
                    <span className="flex items-center justify-center space-x-2">
                      <LoaderPinwheel className="w-4 h-4 animate-spin" />
                      <span>Iscrizione in corso...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Iscriviti alla Newsletter</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-secondary">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Contenuti esclusivi</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-secondary opacity-30"></div>
              <div className="flex items-center space-x-2">
                <ChartLine className="w-4 h-4 text-accent" />
                <span>Insights di mercato</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-secondary opacity-30"></div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-accent" />
                <span>Case study premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contatti" className="py-20 px-4 sm:px-6 lg:px-8 scroll-reveal">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-light mb-6">
              Vuoi Parlare <span className="font-semibold">Direttamente</span> con Noi?
            </h2>
            <p className="text-xl text-secondary font-light max-w-3xl mx-auto leading-relaxed">
              Il nostro team di esperti è pronto ad ascoltarti e a fornirti una consulenza personalizzata per trasformare il tuo immobile in un investimento di successo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="https://wa.me/393534830386?text=Ciao!%20Ho%20visto%20il%20vostro%20webinar%20e%20vorrei%20maggiori%20informazioni%20sui%20vostri%20servizi"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 transition-all duration-300 hover:border-green-200"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 transition-colors duration-300">
                <SiWhatsapp className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">WhatsApp</h3>
              <p className="text-secondary mb-4">Contattaci direttamente su WhatsApp per una risposta immediata</p>
              <span className="text-green-600 font-medium group-hover:text-green-700 transition-colors">Scrivici ora →</span>
            </a>

            <a
              href="tel:+393534830386"
              className="group bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 transition-all duration-300 hover:border-blue-200"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                <Phone className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chiamaci Direttamente</h3>
              <p className="text-secondary mb-4">Parla direttamente con i nostri consulenti per una consulenza immediata</p>
              <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">Chiama ora →</span>
            </a>

            <a
              href="https://linktr.ee/moorentpm"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 transition-all duration-300 hover:border-pink-200"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-300 transition-colors duration-300">
                <ExternalLink className="w-8 h-8 text-pink-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Link Tree</h3>
              <p className="text-secondary mb-4">Accedi a tutti i nostri canali social e di contatto in un unico posto</p>
              <span className="text-pink-400 font-medium group-hover:text-pink-500 transition-colors">Visita ora →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="https://i.imgur.com/aazwI7x.png" 
                  alt="MoorentPM Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Property Management Premium nel Triveneto. Trasformiamo immobili di lusso in asset redditizi attraverso strategie innovative e gestione professionale.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servizi</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Affitti Brevi</li>
                <li>Gestione Premium</li>
                <li>Consulenza</li>
                <li>Ottimizzazione ROI</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contatti</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>+39 353 483 0386</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>hello@moorentpm.it</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Triveneto, Italia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">© 2024 MoorentPM. Tutti i diritti riservati.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm">Privacy Policy</span>
              <span className="text-gray-400 text-sm">Termini di Servizio</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
