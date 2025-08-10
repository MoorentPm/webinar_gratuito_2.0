import { useEffect, useRef, useState } from "react";
import { 
  Mail, 
  Phone, 
  Play, 
  Crown, 
  Users, 
  MapPin, 
  ArrowDown, 
  ArrowRight, 
  Inbox, 
  CheckCircle, 
  ExternalLink, 
  Menu, 
  X,
  FileText,
  Calculator,
  MessageSquare,
  Download,
  ChartLine,
  Building
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WavesBackground from "@/components/WavesBackground";
// --- MODIFICA: Rimosso l'import del logo locale ---

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('dark');
    return () => {
      document.body.classList.remove('dark');
    };
  }, []);

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
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const nav = target.closest('nav');
      const menuButton = target.closest('button[aria-label="Toggle menu"]');
      
      if (isMobileMenuOpen && !nav && !menuButton) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-background font-sans text-foreground antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed left-0 right-0 z-50 glass-effect border-b border-white/10 transition-all duration-500 top-0 opacity-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* --- MODIFICA: Ripristinato link Imgur --- */}
              <img 
                src="https://i.imgur.com/aazwI7x.png"
                alt="MoorentPM Logo" 
                className="h-12 w-auto"
                data-testid="img-logo"
              />
            </div>
            <div className="hidden sm:flex items-center space-x-4 md:space-x-8">
              <a href="#webinar" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base" data-testid="link-webinar">
                Webinar
              </a>
              <a href="#newsletter" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base" data-testid="link-newsletter">
                Newsletter
              </a>
              <a href="#contatti" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base" data-testid="link-contatti">
                Contatti
              </a>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-16 left-0 right-0 glass-effect border-b border-white/10 z-40" data-testid="nav-mobile-menu">
            <div className="px-4 py-6 space-y-4">
              <a 
                href="#webinar" 
                className="block text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-webinar"
              >
                Webinar
              </a>
              <a 
                href="#newsletter" 
                className="block text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-newsletter"
              >
                Newsletter
              </a>
              <a 
                href="#contatti" 
                className="block text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="link-mobile-contatti"
              >
                Contatti
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section (SENZA ONDE) */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 hero-dark-bg" data-testid="section-hero">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&h=1384"
            alt="Luxury real estate property with modern architecture"
            className="w-full h-full object-cover opacity-5"
            data-testid="img-hero-background"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white px-2" data-testid="text-hero-title">
              Trasforma il Tuo Immobile in un{" "}
              <span className="block font-semibold mt-2">Asset Redditizio</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed px-4" data-testid="text-hero-subtitle">
              Scopri le strategie premium per massimizzare i rendimenti degli affitti brevi nel Triveneto.{" "}
              <span className="text-white font-medium block sm:inline mt-1 sm:mt-0">20 minuti di contenuto esclusivo</span> per proprietari immobiliari di alto valore.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-8 px-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3 text-gray-300 text-sm sm:text-base">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="font-medium">Webinar completo disponibile ora</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-300 opacity-30"></div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-gray-300 text-sm sm:text-base">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                  <span className="font-medium">Strategie premium esclusive</span>
                </div>
              </div>
            </div>
            <div className="pt-4 sm:pt-6">
              <a
                href="#webinar"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300 hover-lift text-sm sm:text-base"
                data-testid="button-hero-cta"
              >
                <ArrowDown className="w-4 h-4 mr-2" />
                Guarda il Webinar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contenitore per il resto della pagina (CON ONDE) */}
      <div className="relative text-white">
        <WavesBackground />
        <div className="relative z-10">
          {/* Video Section */}
          <section id="webinar" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 scroll-reveal" data-testid="section-webinar">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-4 sm:mb-6 px-2" data-testid="text-webinar-title">
                  Il Tuo Immobile, Il Tuo <span className="font-semibold">Successo</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 font-light max-w-3xl mx-auto px-4 leading-relaxed" data-testid="text-webinar-subtitle">
                  Un webinar completo che ti guiderà attraverso le strategie più efficaci per trasformare la tua proprietà in una fonte di reddito costante e redditizia.
                </p>
              </div>
              <div className="w-full aspect-video rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden hover-lift">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/V7qJSDNYrq4?si=5Ln33zIy3vHGhrep"
                  title="Webinar Premium MoorentPM"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>

          {/* Risorse Gratuite Section */}
          <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-reveal" data-testid="section-resources">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-4 sm:mb-6 px-2" data-testid="text-resources-title">
                    Risorse <span className="font-semibold">Esclusive</span> per Te
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 font-light max-w-3xl mx-auto px-4 leading-relaxed" data-testid="text-resources-subtitle">
                    Accedi a strumenti e guide professionali per ottimizzare da subito la gestione del tuo immobile.
                  </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center hover-lift p-6 sm:p-8 rounded-2xl flex flex-col items-center min-h-[280px] sm:min-h-[320px]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }} data-testid="card-resource-1">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Guida Burocratica</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow mb-4 sm:mb-6 text-sm sm:text-base">
                    Un PDF completo con tutti i passaggi e gli adempimenti per avviare la tua attività.
                  </p>
                  <a
                    href="downloads/guida-burocratica.pdf"
                    download
                    className="inline-flex items-center justify-center mt-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 text-sm sm:text-base touch-manipulation"
                    data-testid="button-download-guide"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Scarica Ora
                  </a>
                </div>

                <div className="text-center hover-lift p-6 sm:p-8 rounded-2xl flex flex-col items-center min-h-[280px] sm:min-h-[320px]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }} data-testid="card-resource-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Calcolatore Prezzi Airbnb</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow mb-4 sm:mb-6 text-sm sm:text-base">
                    Accedi al nostro strumento online per definire il prezzo di partenza ideale per il tuo annuncio.
                  </p>
                  <a
                    href="https://moorentpm.github.io/calcolatore-prezzi-airbnb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center mt-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 text-sm sm:text-base touch-manipulation"
                    data-testid="button-calculator-tool"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Accedi allo Strumento
                  </a>
                </div>

                <div className="text-center hover-lift p-6 sm:p-8 rounded-2xl flex flex-col items-center min-h-[280px] sm:min-h-[320px]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }} data-testid="card-resource-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Messaggi per Ospiti</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow mb-4 sm:mb-6 text-sm sm:text-base">
                    Un PDF con i messaggi preimpostati per una comunicazione impeccabile con i tuoi ospiti.
                  </p>
                  <a
                    href="downloads/messaggi-preimpostati.pdf"
                    download
                    className="inline-flex items-center justify-center mt-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 text-sm sm:text-base touch-manipulation"
                    data-testid="button-download-messages"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Scarica Ora
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section id="newsletter" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-reveal" data-testid="section-newsletter">
            <div className="max-w-4xl mx-auto">
              <div className="premium-gradient-dark rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 text-center">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 px-2" data-testid="text-newsletter-title">
                    Ricevi Strategie <span className="font-semibold">Esclusive</span> via Email
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed px-2 sm:px-4" data-testid="text-newsletter-subtitle">
                    Insights di mercato, case study premium e strategie avanzate per proprietari immobiliari che vogliono massimizzare i loro investimenti nel Triveneto.
                  </p>
                </div>
                <form className="max-w-md mx-auto space-y-4 sm:space-y-6" data-testid="form-newsletter">
                    <div className="relative">
                        <Input
                        placeholder="La tua email"
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-full text-base sm:text-lg font-medium placeholder:text-gray-500 border-2 border-transparent focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-black touch-manipulation"
                        data-testid="input-newsletter-email"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6">
                        <Inbox className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="btn-primary w-full px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-full text-base sm:text-lg touch-manipulation"
                        data-testid="button-newsletter-submit"
                    >
                        <span className="flex items-center justify-center space-x-2">
                        <span>Iscriviti alla Newsletter</span>
                        <ArrowRight className="w-4 h-4" />
                        </span>
                    </Button>
                </form>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Contenuti esclusivi</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-gray-200 opacity-30"></div>
                  <div className="flex items-center space-x-2">
                    <ChartLine className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Insights di mercato</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-gray-200 opacity-30"></div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Case study premium</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contatti" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-reveal" data-testid="section-contatti">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 px-2" data-testid="text-contact-title">
                  Vuoi Parlare <span className="font-semibold">Direttamente</span> con Noi?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed px-4" data-testid="text-contact-subtitle">
                  Il nostro team di esperti è pronto ad ascoltarti e a fornirti una consulenza personalizzata per trasformare il tuo immobile in un investimento di successo.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 max-w-4xl mx-auto">
                <a
                  href="https://wa.me/393534830386?text=Ciao!%20Ho%20visto%20il%20vostro%20webinar%20e%20vorrei%20maggiori%20informazioni%20sui%20vostri%20servizi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover-lift border border-gray-100 transition-all duration-300 hover:border-green-200 text-primary touch-manipulation min-h-[200px] sm:min-h-[240px] flex flex-col"
                  data-testid="link-contact-whatsapp"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-green-500 transition-colors duration-300">
                    <SiWhatsapp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 flex-grow text-sm sm:text-base">Contattaci direttamente su WhatsApp per una risposta immediata</p>
                  <span className="text-green-600 font-medium group-hover:text-green-700 transition-colors text-sm sm:text-base">Scrivici ora →</span>
                </a>
                <a
                  href="tel:+393534830386"
                  className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover-lift border border-gray-100 transition-all duration-300 hover:border-blue-200 text-primary touch-manipulation min-h-[200px] sm:min-h-[240px] flex flex-col"
                  data-testid="link-contact-phone"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                    <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">Chiamaci Direttamente</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 flex-grow text-sm sm:text-base">Parla direttamente con i nostri consulenti per una consulenza immediata</p>
                  <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors text-sm sm:text-base">Chiama ora →</span>
                </a>
                <a
                  href="https://linktr.ee/moorentpm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover-lift border border-gray-100 transition-all duration-300 hover:border-pink-200 text-primary touch-manipulation min-h-[200px] sm:min-h-[240px] flex flex-col"
                  data-testid="link-contact-linktree"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-pink-300 transition-colors duration-300">
                    <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">Link Tree</h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 flex-grow text-sm sm:text-base">Accedi a tutti i nostri canali social e di contatto in un unico posto</p>
                  <span className="text-pink-400 font-medium group-hover:text-pink-500 transition-colors text-sm sm:text-base">Visita ora →</span>
                </a>
              </div>
            </div>
          </section>
        </div> {/* Chiusura del div z-10 */}
      </div> {/* Chiusura del div relative per le onde */}

      {/* Footer */}
      <footer className="bg-background">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                {/* --- MODIFICA: Ripristinato link Imgur --- */}
                <img 
                  src="https://i.imgur.com/aazwI7x.png"
                  alt="MoorentPM Logo" 
                  className="h-12 w-auto"
                  data-testid="img-footer-logo"
                />
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed" data-testid="text-footer-description">
                Ogni immobile ha una storia da raccontare, un potenziale inespresso che attende di essere svelato. Noi siamo i custodi di queste storie, gli architetti che trasformano spazi in esperienze memorabili e investimenti in successi tangibili.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Servizi</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Gestione Online</li>
                <li>Gestione Completa</li>
                <li>Subaffitto</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contatti</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>+39 353 483 0386</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>hello@moorentpm.it</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Triveneto, Italia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
                <p className="text-gray-500 text-sm" data-testid="text-footer-copyright">© 2024 MoorentPM. Tutti i diritti riservati.</p>
                <div className="flex space-x-6 mt-4 sm:mt-0">
                <span className="text-gray-500 text-sm">Privacy Policy</span>
                <span className="text-gray-500 text-sm">Termini di Servizio</span>
                </div>
            </div>
        </div>
      </footer>
    </div> // Chiusura del div principale
  );
}
