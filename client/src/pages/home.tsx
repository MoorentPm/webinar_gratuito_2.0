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

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePauseOrEnd = () => setIsVideoPlaying(false);

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePauseOrEnd);
    videoElement.addEventListener('ended', handlePauseOrEnd);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePauseOrEnd);
      videoElement.removeEventListener('ended', handlePauseOrEnd);
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
              <img 
                src="https://i.imgur.com/aazwI7x.png" 
                alt="MoorentPM Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden sm:flex items-center space-x-4 md:space-x-8">
              <a href="#webinar" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                Webinar
              </a>
              <a href="#newsletter" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                Newsletter
              </a>
              <a href="#contatti" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                Contatti
              </a>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-16 left-0 right-0 glass-effect border-b border-white/10 z-40">
            <div className="px-4 py-6 space-y-4">
              <a 
                href="#webinar" 
                className="block text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Webinar
              </a>
              <a 
                href="#newsletter" 
                className="block text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Newsletter
              </a>
              <a 
                href="#contatti" 
                className="block text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contatti
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section (SENZA ONDE) */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 hero-dark-bg">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&h=1384"
            alt="Luxury real estate property with modern architecture"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
              Trasforma il Tuo Immobile in un{" "}
              <span className="block font-semibold">Asset Redditizio</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed px-4">
              Scopri le strategie premium per massimizzare i rendimenti degli affitti brevi nel Triveneto.{" "}
              <span className="text-white font-medium">20 minuti di contenuto esclusivo</span> per proprietari immobiliari di alto valore.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <div className="flex items-center space-x-3 text-gray-300">
                <Play className="w-6 h-6" />
                <span className="font-medium">Webinar completo disponibile ora</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300 opacity-30"></div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Crown className="w-6 h-6 text-accent" />
                <span className="font-medium">Strategie premium esclusive</span>
              </div>
            </div>
            <a
              href="#webinar"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300 hover-lift"
            >
              <ArrowDown className="w-4 h-4 mr-2" />
              Guarda il Webinar
            </a>
          </div>
        </div>
      </section>

      {/* Contenitore per il resto della pagina (CON ONDE) */}
      <div className="relative hero-dark-bg text-white">
        <WavesBackground />
        <div className="relative z-10">
          {/* Video Section */}
          <section id="webinar" className="py-20 px-4 sm:px-6 lg:px-8 scroll-reveal">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
                  Il Tuo Immobile, Il Tuo <span className="font-semibold">Successo</span>
                </h2>
                <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
                  Un webinar completo che ti guiderà attraverso le strategie più efficaci per trasformare la tua proprietà in una fonte di reddito costante e redditizia.
                </p>
              </div>
              <div className="relative hover-lift">
                <div className="video-container">
                  <video
                    ref={videoRef}
                    id="main-video"
                    controls
                    poster="https://placehold.co/1280x720/1a1616/d6c4bf?text=Webinar+Premium"
                    className="rounded-2xl shadow-2xl"
                  >
                    <source src="videos/webinar.mp4" type="video/mp4" />
                    Il tuo browser non supporta il tag video.
                  </video>
                </div>
                <div className={`absolute -bottom-12 sm:-bottom-8 left-0 right-0 mx-4 transition-all duration-500 ${
                  isVideoPlaying ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
                }`}>
                  <div className="video-banner-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-base text-primary">Webinar Premium</h3>
                          <p className="text-secondary text-sm">Durata: 20 minuti • Contenuto esclusivo</p>
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-secondary pl-13 sm:pl-0 pt-2">
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

          {/* Risorse Gratuite Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 scroll-reveal">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
                    Risorse <span className="font-semibold">Esclusive</span> per Te
                  </h2>
                  <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
                    Accedi a strumenti e guide professionali per ottimizzare da subito la gestione del tuo immobile.
                  </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center hover-lift p-8 rounded-2xl flex flex-col items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Guida Burocratica</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow mb-6">
                    Un PDF completo con tutti i passaggi e gli adempimenti per avviare la tua attività.
                  </p>
                  <a
                    href="downloads/guida-burocratica.pdf"
                    download
                    className="inline-flex items-center justify-center mt-auto px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Scarica Ora
                  </a>
                </div>

                <div className="text-center hover-lift p-8 rounded-2xl flex flex-col items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                    <Calculator className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Calcolatore Prezzi Airbnb</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow mb-6">
                    Accedi al nostro strumento online per definire il prezzo di partenza ideale per il tuo annuncio.
                  </p>
                  <a
                    href="https://www.airbnb.it/host/homes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center mt-auto px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Accedi allo Strumento
                  </a>
                </div>

                <div className="text-center hover-lift p-8 rounded-2xl flex flex-col items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Messaggi per Ospiti</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow mb-6">
                    Un PDF con i messaggi preimpostati per una comunicazione impeccabile con i tuoi ospiti.
                  </p>
                  <a
                    href="downloads/messaggi-preimpostati.pdf"
                    download
                    className="inline-flex items-center justify-center mt-auto px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Scarica Ora
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8 scroll-reveal">
            <div className="max-w-4xl mx-auto">
              <div className="premium-gradient-dark rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
                <div className="mb-8">
                  <h2 className="text-3xl sm:text-4xl font-light mb-6">
                    Ricevi Strategie <span className="font-semibold">Esclusive</span> via Email
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed px-4">
                    Insights di mercato, case study premium e strategie avanzate per proprietari immobiliari che vogliono massimizzare i loro investimenti nel Triveneto.
                  </p>
                </div>
                <form className="max-w-md mx-auto space-y-6">
                    <div className="relative">
                        <Input
                        placeholder="La tua email"
                        className="w-full px-6 py-4 bg-white rounded-full text-lg font-medium placeholder:text-secondary border-2 border-transparent focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all text-black"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                        <Inbox className="w-5 h-5 text-secondary" />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="btn-primary w-full px-8 py-4 text-white font-semibold rounded-full text-lg"
                    >
                        <span className="flex items-center justify-center space-x-2">
                        <span>Iscriviti alla Newsletter</span>
                        <ArrowRight className="w-4 h-4" />
                        </span>
                    </Button>
                </form>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Contenuti esclusivi</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-gray-300 opacity-30"></div>
                  <div className="flex items-center space-x-2">
                    <ChartLine className="w-4 h-4 text-accent" />
                    <span>Insights di mercato</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-gray-300 opacity-30"></div>
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
                <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                  Il nostro team di esperti è pronto ad ascoltarti e a fornirti una consulenza personalizzata per trasformare il tuo immobile in un investimento di successo.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <a
                  href="https://wa.me/393534830386?text=Ciao!%20Ho%20visto%20il%20vostro%20webinar%20e%20vorrei%20maggiori%20informazioni%20sui%20vostri%20servizi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 transition-all duration-300 hover:border-green-200 text-primary"
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
                  className="group bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 transition-all duration-300 hover:border-blue-200 text-primary"
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
                  className="group bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100 transition-all duration-300 hover:border-pink-200 text-primary"
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
        </div>
      </div>

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
                Ogni immobile ha una storia da raccontare, un potenziale inespresso che attende di essere svelato. Noi siamo i custodi di queste storie, gli architetti che trasformano spazi in esperienze memorabili e investimenti in successi tangibili.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servizi</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Gestione Online</li>
                <li>Gestione Completa</li>
                <li>Subaffitto</li>
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
