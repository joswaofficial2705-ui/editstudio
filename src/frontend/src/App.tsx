import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Award,
  Check,
  ChevronUp,
  Clock,
  CreditCard,
  Film,
  Heart,
  Instagram,
  Menu,
  Phone,
  Play,
  ShieldCheck,
  Star,
  Twitter,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { PricingPackage } from "./backend.d";
import {
  useCreateCheckout,
  usePackages,
  usePortfolioItems,
} from "./hooks/useQueries";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: "#support" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1E242B]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a
          href="#home"
          className="flex items-center gap-2"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
            <Film className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            Edit<span className="text-primary">Studio</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="nav.primary_button"
          >
            START YOUR PROJECT
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1E242B]/98 backdrop-blur-md border-t border-border"
          >
            <nav className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="rounded-full bg-primary text-primary-foreground w-full mt-2"
                onClick={() => {
                  setMobileOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                data-ocid="nav.primary_button"
              >
                START YOUR PROJECT
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-mosaic.dim_1920x900.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#1E242B]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 rounded-full px-4 py-1">
            Professional Video Editing
          </Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tighter uppercase leading-none mb-6"
        >
          Transform <span className="text-primary">Your</span>
          <br />
          Vision
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We craft cinematic video edits that elevate your brand and captivate
          your audience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 py-6"
            onClick={() =>
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.primary_button"
          >
            <Play className="w-4 h-4 mr-2" /> VIEW OUR WORK
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-foreground/30 text-foreground hover:bg-foreground/10 font-bold text-base px-8 py-6"
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.secondary_button"
          >
            SEE PRICING
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Expert Editors",
      desc: "Our team of award-winning video editors has 10+ years of experience across film, advertising, and social media content.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Turnaround",
      desc: "We know deadlines matter. Get your video edits back in as little as 12 hours with our priority service.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Quality",
      desc: "Cinema-grade precision cuts, pro audio mixing, and motion graphics — we never compromise on quality.",
    },
  ];

  return (
    <section id="why" className="py-24 bg-[#2F3842]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground gold-underline">
            The EditStudio Difference
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.15}>
              <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/40 transition-colors">
                <div className="text-primary mb-4">{f.icon}</div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const { data: items = [] } = usePortfolioItems();

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Our Portfolio
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Featured Work
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A curated selection of our best video editing projects.
          </p>
        </FadeUp>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="portfolio.list"
        >
          {items.slice(0, 6).map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.08}>
              <div
                className="group relative rounded-xl overflow-hidden bg-card border border-border cursor-pointer"
                data-ocid={`portfolio.item.${i + 1}`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={
                      item.thumbnailUrl ||
                      "/assets/generated/portfolio-video-edit.dim_600x400.jpg"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Badge className="mb-2 text-xs bg-primary/15 text-primary border-primary/20 rounded-full">
                    {item.category}
                  </Badge>
                  <h3 className="font-display font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: <Film className="w-10 h-10" />,
      title: "Video Editing",
      desc: "From rough cuts to polished final edits — wedding films, corporate videos, music videos, documentaries and more. Beat-sync editing, motion graphics, and sound design included.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#2F3842]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            Editing Services
          </h2>
        </FadeUp>
        <div className="flex justify-center">
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.15}>
              <div className="text-center p-8 max-w-lg">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6">
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                  {s.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp className="mt-12 text-center" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              "Adobe Premiere Pro",
              "DaVinci Resolve",
              "After Effects",
              "Final Cut Pro",
              "Cinema 4D",
            ].map((tool) => (
              <span key={tool} className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                {tool}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function PricingCard({
  pkg,
  isPro,
  index,
}: { pkg: PricingPackage; isPro: boolean; index: number }) {
  const { mutate: checkout, isPending } = useCreateCheckout();

  const handleSelect = () => {
    checkout(pkg, {
      onError: () => toast.error("Failed to start checkout. Please try again."),
    });
  };

  const price = Number(pkg.priceInCents) / 100;

  return (
    <FadeUp delay={index * 0.12}>
      <div
        className={`relative rounded-2xl border p-8 flex flex-col h-full transition-transform hover:-translate-y-1 duration-300 ${
          isPro
            ? "bg-card border-primary shadow-[0_0_40px_rgba(201,168,92,0.15)]"
            : "bg-card border-border"
        }`}
        data-ocid={`pricing.card.${index + 1}`}
      >
        {isPro && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground rounded-full px-4 text-xs font-bold">
              MOST POPULAR
            </Badge>
          </div>
        )}
        <div className="mb-6">
          <h3
            className={`font-display font-bold text-2xl mb-1 ${
              isPro ? "text-primary" : "text-foreground"
            }`}
          >
            {pkg.name}
          </h3>
          <p className="text-muted-foreground text-sm">{pkg.description}</p>
        </div>
        <div className="mb-6">
          <span className="font-display font-extrabold text-5xl text-foreground">
            ₹{price}
          </span>
          <span className="text-muted-foreground text-sm ml-1">/ project</span>
        </div>
        <ul className="flex-1 space-y-3 mb-8">
          {pkg.features.map((feat) => (
            <li
              key={feat}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              {feat}
            </li>
          ))}
        </ul>
        <Button
          className={`w-full rounded-full font-bold py-6 ${
            isPro
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-primary text-primary bg-transparent hover:bg-primary/10"
          }`}
          onClick={handleSelect}
          disabled={isPending}
          data-ocid={`pricing.select_button.${index + 1}`}
        >
          {isPending ? "Processing..." : "SELECT PACKAGE"}
        </Button>
      </div>
    </FadeUp>
  );
}

function Pricing() {
  const { data: packages = [] } = usePackages();

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Simple Pricing
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Pricing & Packages
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No hidden fees. Choose the package that fits your project and
            budget.
          </p>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, i) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              isPro={pkg.name.toLowerCase() === "pro"}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const TIP_AMOUNTS = [50, 100, 300, 500];

function FanSupport() {
  const [loadingTip, setLoadingTip] = useState<number | null>(null);
  const { mutate: checkout } = useCreateCheckout();

  const handleTip = (amount: number) => {
    setLoadingTip(amount);
    const tipPkg: PricingPackage = {
      id: `tip-${amount}`,
      name: `Fan Tip ₹${amount}`,
      description: "Support the creator",
      priceInCents: BigInt(amount * 100),
      features: [],
    };
    checkout(tipPkg, {
      onError: () => {
        toast.error("Failed to start checkout. Please try again.");
        setLoadingTip(null);
      },
      onSettled: () => setLoadingTip(null),
    });
  };

  return (
    <section id="support" className="py-24 bg-[#2F3842]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Fan Support
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Support the Creator
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Love the work? Buy me a coffee or show your support with a tip.
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {TIP_AMOUNTS.map((amount, i) => {
            const isLoading = loadingTip === amount;
            return (
              <FadeUp key={amount} delay={i * 0.1}>
                <button
                  type="button"
                  onClick={() => handleTip(amount)}
                  disabled={loadingTip !== null}
                  className={`w-full group relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 transition-all duration-300 ${
                    isLoading
                      ? "bg-primary/20 border-primary scale-95"
                      : "bg-card border-border hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,168,92,0.12)]"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                  data-ocid={`support.button.${i + 1}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isLoading
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    }`}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                    ) : (
                      <Heart className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="font-display font-extrabold text-2xl text-foreground">
                      ₹{amount}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {isLoading ? "Processing..." : "One-time tip"}
                    </p>
                  </div>
                </button>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.5} className="text-center mt-10">
          <p className="text-muted-foreground text-sm">
            Your support helps keep the creativity going. Thank you! 🙏
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function CheckoutSection() {
  return (
    <section id="contact" className="py-24 bg-[#2F3842]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
              Get Started Today
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              Ready to Elevate
              <br />
              Your Content?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Join over 2,000 creators, brands, and agencies who trust
              EditStudio to transform their raw footage into compelling stories.
              Our process is simple — upload, we edit, you love it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-6"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="checkout.primary_button"
              >
                GET STARTED NOW
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Secure Checkout
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> Money-back guarantee
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary" />
              <span>
                Questions? Call us:{" "}
                <span className="text-foreground font-medium">
                  +91 86080 35953
                </span>
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div
              className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl"
              data-ocid="checkout.card"
            >
              <h3 className="font-display font-bold text-xl mb-6 text-gray-800">
                Order Summary
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-semibold">Pro Package</p>
                    <p className="text-gray-500 text-sm">Video Editing</p>
                  </div>
                  <span className="font-bold">₹300.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Rush delivery (24hr)</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Revisions</span>
                  <span>5 rounds</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-4 border-t border-gray-200 font-bold text-lg">
                <span>Total</span>
                <span>₹300.00</span>
              </div>
              <div className="mt-6">
                <p className="text-xs text-gray-400 mb-3">
                  Accepted payment methods
                </p>
                <div className="flex gap-2 flex-wrap">
                  {["VISA", "MC", "AMEX", "PayPal"].map((method) => (
                    <div
                      key={method}
                      className="border border-gray-200 rounded px-2 py-1 flex items-center gap-1"
                    >
                      <CreditCard className="w-3 h-3 text-gray-400" />
                      <span className="text-xs font-medium text-gray-600">
                        {method}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const socialLinks = [
    {
      href: "https://twitter.com",
      label: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      href: "https://www.instagram.com/m.s_editz7?igsh=MXgzMGJ5cjkweWE2OA==",
      label: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      href: "https://youtube.com",
      label: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="bg-[#1E242B] border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
                <Film className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Edit<span className="text-primary">Studio</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Professional video editing services for creators, brands, and
              agencies worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  {icon}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground text-sm">
                +91 86080 35953
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Portfolio", "Services", "Pricing", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      data-ocid="footer.link"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Video Editing",
                "Motion Graphics",
                "Reels & Shorts",
                "Documentary Editing",
              ].map((s) => (
                <li key={s}>
                  <span className="text-muted-foreground text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} EditStudio. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          data-ocid="page.button"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Portfolio />
        <Services />
        <Pricing />
        <FanSupport />
        <CheckoutSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
