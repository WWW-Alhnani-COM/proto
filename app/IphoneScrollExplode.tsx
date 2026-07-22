"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

// ===== عدد الإطارات للصور =====
const FRAME_COUNT = 61;

// ===== بيانات النصوص في الهيرو =====
const textBlocks = [
  {
    id: 0,
    title: "Mohammed Al-Hanani",
    subtitle: "Full-Stack Web Developer | مهندس برمجيات",
    align: "center" as const,
    start: 0,
    end: 0.25,
  },
  {
    id: 1,
    title: "التميز والخبرة",
    subtitle: "تطوير تطبيقات وتصميم حلول برمجية بمعايير عالمية",
    align: "left" as const,
    start: 0.22,
    end: 0.5,
  },
  {
    id: 2,
    title: "الخدمات والمهارات",
    subtitle: "Flutter, Laravel, Firebase & Modern Web Tech",
    align: "right" as const,
    start: 0.48,
    end: 0.75,
  },
  {
    id: 3,
    title: "تواصل معي",
    subtitle: "جاهز لتحويل أفكارك إلى حلول برمجية احترافية",
    align: "center" as const,
    start: 0.73,
    end: 1,
  },
];

// ===== دالة مسار الصور =====
function getFramePath(index: number) {
  return `/me/ffout${String(index + 1).padStart(3, "0")}.gif`;
}

export default function PortfolioMain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // إحداثيات مؤشر الفأرة لتتبع البقعة الكاشفة
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isInsideHero, setIsInsideHero] = useState(false);

  // حالة نموذج الاتصال
  const [formStatus, setFormStatus] = useState(false);
  
  // حالة القائمة المنبثقة للجوال (Mobile Menu)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const framePaths = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, index) => getFramePath(index)),
    []
  );

  useEffect(() => {
    const updateScrollProgress = () => {
      const heroScrollDistance = window.innerHeight * 3;
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / heroScrollDistance));
      progressRef.current = nextProgress;
      setScrollProgress(nextProgress);
    };

    updateScrollProgress();

    let frameId = 0;
    const handleScroll = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      frameId = window.requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadedFrames: HTMLImageElement[] = [];
    let completed = 0;

    framePaths.forEach((path, index) => {
      const image = new window.Image();
      image.onload = image.onerror = () => {
        if (cancelled) return;
        loadedFrames[index] = image;
        completed += 1;
        if (completed === framePaths.length) {
          setFrames(loadedFrames);
          setIsLoaded(true);
        }
      };
      image.src = path;
    });

    return () => {
      cancelled = true;
    };
  }, [framePaths]);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.documentElement.style.overflowY = "auto";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || !frames.length) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const image =
      frames[Math.min(frames.length - 1, Math.max(0, Math.round(scrollProgress * (frames.length - 1))))];
    if (!image) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);
      context.imageSmoothingEnabled = true;

      const naturalAspect = image.naturalWidth / image.naturalHeight;
      const canvasAspect = rect.width / rect.height;

      let drawWidth = rect.width;
      let drawHeight = rect.height;
      let offsetX = 0;
      let offsetY = 0;

      if (naturalAspect > canvasAspect) {
        drawHeight = rect.height;
        drawWidth = drawHeight * naturalAspect;
        offsetX = (rect.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = rect.width;
        drawHeight = drawWidth / naturalAspect;
        offsetX = 0;
        offsetY = (rect.height - drawHeight) / 2;
      }

      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    draw();
    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, [frames, isLoaded, scrollProgress]);

  const isHeroFinished = scrollProgress >= 1;

  return (
    <main className="relative bg-[#020202] text-white selection:bg-amber-400/20 selection:text-white font-sans">
      
      {/* ===== الهيدر الاحترافي (Navbar) ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-2xl">
          
          {/* الشعار / الاسم */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold text-lg shadow-lg shadow-amber-400/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors text-sm sm:text-base">
              Mohammed Al-Hanani
            </span>
          </a>

          {/* روابط التنقل للشاشات الكبيرة */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            <a href="#about" className="hover:text-amber-400 transition-colors">عني</a>
            <a href="#resume" className="hover:text-amber-400 transition-colors">السيرة الذاتية</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">الخدمات</a>
            <a href="#portfolio" className="hover:text-amber-400 transition-colors">الأعمال</a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors">الآراء</a>
          </nav>

          {/* زر اتصل بي */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="px-5 py-2 rounded-xl bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              اتصل بي
            </a>
          </div>

          {/* زر القائمة للجوال (Hamburger Menu) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* القائمة المنسدلة للجوال */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto mt-2 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl text-center"
          >
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-amber-400 transition-colors py-2 border-b border-white/5"
            >
              عني
            </a>
            <a 
              href="#resume" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-amber-400 transition-colors py-2 border-b border-white/5"
            >
              السيرة الذاتية
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-amber-400 transition-colors py-2 border-b border-white/5"
            >
              الخدمات
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-amber-400 transition-colors py-2 border-b border-white/5"
            >
              الأعمال
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-amber-400 transition-colors py-2 border-b border-white/5"
            >
              الآراء
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/25 mt-2"
            >
              اتصل بي
            </a>
          </motion.div>
        )}
      </header>

      {/* ===== الخلفية الثابتة والممتدة لجميع الصفحة ===== */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#020202]">
        <canvas ref={canvasRef} className="h-full w-full opacity-60" />
        
        {/* طبقة التعتيم الأساسية */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />

        {/* تأثير البقعة الضوئية */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isInsideHero ? 1 : 0,
            backdropFilter: "brightness(1.5) contrast(1.1)",
            WebkitBackdropFilter: "brightness(1.5) contrast(1.1)",
            maskImage: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          }}
        />

        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#020202] backdrop-blur-md">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-white/10 border-t-amber-400" />
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">جاري تحميل المعرض</p>
                <p className="mt-2 text-base font-medium text-white/90">استعد لاكتشاف أعمال Mohammed Al-Hanani</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== 1 & 2. قسم الهيرو والتمرير بالصور مع تعقب المؤشر ===== */}
      <div 
        className="h-[300vh] relative z-10"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
          setIsInsideHero(true);
        }}
        onMouseEnter={() => setIsInsideHero(true)}
        onMouseLeave={() => setIsInsideHero(false)}
      >
        
        {/* حاوية النصوص الثابتة على الشاشة أثناء تمرير الهيرو */}
        <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-x-0 top-24 flex justify-center px-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-white/60 drop-shadow">
              {isHeroFinished ? "✨ مرحباً بك في موقعي الرسمي" : "اسحب للأسفل لاستكشاف الإبداع (حرّك المؤشر لرؤية تأثير الكشف الدقيق)"}
            </p>
          </div>

          {textBlocks.map((block) => {
            const start = block.start;
            const end = block.end;
            const inRange = scrollProgress >= start && scrollProgress <= end;
            const progress = inRange
              ? (scrollProgress - start) / (end - start)
              : scrollProgress < start
                ? 0
                : 1;
            
            const opacity = inRange
              ? progress < 0.15
                ? progress / 0.15
                : progress > 0.85
                  ? (1 - progress) / 0.15
                  : 1
              : 0;
            
            const offsetY = inRange ? 0 : 30;
            const translateX = block.align === "left" ? -30 : block.align === "right" ? 30 : 0;
            const scale = inRange ? 1 : 0.95;

            return (
              <motion.div
                key={block.id}
                className={`absolute max-w-[22rem] px-6 sm:max-w-[28rem] ${
                  block.align === "left"
                    ? "left-6 top-1/2 -translate-y-1/2 text-left sm:left-16"
                    : block.align === "right"
                      ? "right-6 top-1/2 -translate-y-1/2 text-right sm:right-16"
                      : "top-1/2 -translate-y-1/2 text-center"
                }`}
                initial={false}
                animate={{
                  opacity: isHeroFinished ? 0 : opacity,
                  y: isHeroFinished ? 30 : offsetY,
                  x: inRange ? 0 : translateX,
                  scale: isHeroFinished ? 0.9 : scale,
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { duration: 0.3 }
                }}
              >
                <div>
                  <motion.p 
                    className="mb-2 text-[11px] uppercase tracking-[0.45em] text-amber-400 drop-shadow-md font-medium"
                    animate={{ letterSpacing: inRange ? "0.45em" : "0.2em" }}
                    transition={{ duration: 0.3 }}
                  >
                    {block.title}
                  </motion.p>
                  <motion.h2 
                    className="text-xl font-bold leading-snug tracking-tight text-white drop-shadow-lg sm:text-3xl"
                    animate={{ scale: inRange ? 1 : 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    {block.subtitle}
                  </motion.h2>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* مؤشر التمرير */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/40 text-xs uppercase tracking-[0.3em]"
          >
            {isHeroFinished ? "✓ تم" : "مرر للأسفل"}
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-white/40 animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* ===== المحتوى الرئيسي (بخلفية شفافة لتظهر الخلفية المتحركة تحته) ===== */}
      <div className="relative z-10 bg-transparent pt-20 pb-16 space-y-32">
        
        {/* ===== 2. قسم عني (About Me) ===== */}
        <section id="about" className="max-w-4xl mx-auto px-6 scroll-mt-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-medium">About Me</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6">My Journey as a Full-Stack Developer</h2>
            <p className="text-white/80 leading-relaxed text-lg mb-8 drop-shadow">
              Passionate developer with expertise in both front-end and back-end technologies. I build responsive, scalable web applications with clean code and modern frameworks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="text-xs text-white/50 block mb-1">الاسم</span>
                <span className="font-medium text-white">Mohammed Al-Hanani</span>
              </div>
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="text-xs text-white/50 block mb-1">البريد الإلكتروني</span>
                <span className="font-medium text-white text-sm truncate block">Mohammadalhnani@gmail.com</span>
              </div>
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="text-xs text-white/50 block mb-1">الخبرة</span>
                <span className="font-medium text-amber-400">2+ Years</span>
              </div>
              <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="text-xs text-white/50 block mb-1">العمل الحر</span>
                <span className="font-medium text-emerald-400">Available</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== 3. قسم السيرة الذاتية (Resume) ===== */}
        <section id="resume" className="max-w-4xl mx-auto px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-medium">My Resume</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Professional Journey & Technical Expertise</h2>
            <p className="text-white/80 mb-10 text-base drop-shadow">
              Mohammed Al-Hanani - Full Stack Developer specializing in Flutter and Laravel with 2+ years of experience.
            </p>
            
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-semibold text-amber-400">Flutter & Firebase Developer</h3>
                  <p className="text-xs text-white/60 mt-1">Sanaa, Yemen | GitHub: MohammedAlHanani</p>
                </div>
                <span className="text-xs font-mono bg-amber-400/10 text-amber-400 px-3 py-1 rounded-full w-fit border border-amber-400/20">
                  Jan 2022 - Present
                </span>
              </div>
              <p className="text-white/90 leading-relaxed">
                Developed 10+ cross-platform mobile applications using Flutter framework, providing robust UI/UX experiences and backend API connectivity.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ===== 4. قسم الخدمات (Services) ===== */}
        <section id="services" className="max-w-5xl mx-auto px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-medium">My Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-12">My Services</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg hover:border-amber-400/40 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-white">Mobile App Development</h3>
                <p className="text-white/80 text-sm leading-relaxed">Building cross-platform mobile applications using Flutter with high performance and smooth UI.</p>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg hover:border-amber-400/40 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-white">Web Development</h3>
                <p className="text-white/80 text-sm leading-relaxed">Creating responsive web applications using Laravel and modern front-end technologies.</p>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg hover:border-amber-400/40 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-white">Backend & APIs</h3>
                <p className="text-white/80 text-sm leading-relaxed">Developing robust backend systems, secure databases, and high-performance RESTful APIs.</p>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg hover:border-amber-400/40 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-white">Firebase Solutions</h3>
                <p className="text-white/80 text-sm leading-relaxed">Implementing advanced Firebase services including Realtime Database, Cloud Messaging, and Authentication.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== 5. قسم الأعمال السابقة (Portfolio / Works) ===== */}
        <section id="portfolio" className="max-w-5xl mx-auto px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-medium">My Work</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-12">Portfolio</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">تطبيق تتبع المواقع</h3>
                  <p className="text-amber-400 text-xs font-mono mb-3">Location Tracking App</p>
                  <p className="text-white/80 text-sm">تطبيق مخصص لتتبع المواقع الجغرافية بكفاءة عالية.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60 font-mono">
                  Flutter, Google Maps API
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">نظام إدارة الأساطيل</h3>
                  <p className="text-amber-400 text-xs font-mono mb-3">Fleet Management System</p>
                  <p className="text-white/80 text-sm">نظام متكامل لإدارة وتحليل حركة الأساطيل والمركبات.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60 font-mono">
                  Laravel, MySQL, JavaScript
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">نظام مصادقة Firebase</h3>
                  <p className="text-amber-400 text-xs font-mono mb-3">Firebase Auth System</p>
                  <p className="text-white/80 text-sm">نظام أمان وتسجيل دخول سريع وآمن للمستخدمين.</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60 font-mono">
                  Flutter, Firebase Auth
                </div>
              </div>
            </div>

            {/* دعوة لزيارة لينكد إن */}
            <div className="p-8 rounded-2xl bg-black/50 backdrop-blur-md border border-amber-400/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="text-xl font-bold mb-2">المزيد من المشاريع والإنجازات</h3>
                <p className="text-white/80 text-sm max-w-xl">
                  لديّ المزيد من المشاريع الاحترافية والإنجازات التي أنجزتها. أدعوك لزيارة ملفي الشخصي على LinkedIn لمشاهدة مجموعة كاملة من أعمالي وخبراتي.
                </p>
              </div>
              <a
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors whitespace-nowrap shadow-lg shadow-amber-400/20"
              >
                تصفح مشاريعي على LinkedIn
              </a>
            </div>
          </motion.div>
        </section>

        {/* ===== 6. قسم شهادات التوصية (Testimonials) ===== */}
        <section id="testimonials" className="max-w-4xl mx-auto px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-medium">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-12">ماذا قالوا عن عملي</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg relative">
                <span className="text-4xl text-amber-400/30 absolute top-4 left-6 font-serif">“</span>
                <p className="text-white/90 text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;محمد الحناني كان من أبرز طلاب الكلية تميزاً في مجال تطوير البرمجيات.&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-semibold text-white">د. فرحان الجابري</h4>
                  <p className="text-xs text-amber-400 mt-0.5">عميد كلية GIC</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg relative">
                <span className="text-4xl text-amber-400/30 absolute top-4 left-6 font-serif">“</span>
                <p className="text-white/90 text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;خلال تقييمنا لمشروع محمد الحناني، لاحظنا تميزاً غير عادي في جودة الكود والتصميم.&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-semibold text-white">م. مهند المشرقي</h4>
                  <p className="text-xs text-amber-400 mt-0.5">خبير أنظمة معلومات - عضو لجنة المناقشة</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== 7. قسم اتصل بي (Contact) ===== */}
        <section id="contact" className="max-w-4xl mx-auto px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-medium">Contact</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">تواصل معي لبدء مشروعك القادم</h2>
            <p className="text-white/80 mb-12 drop-shadow">سواء كنت بحاجة إلى تطبيق موبايل أو موقع إلكتروني، تواصل معي الآن وسنبدأ العمل مباشرة.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* معلومات الاتصال */}
              <div className="space-y-6 md:col-span-1 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg h-fit">
                <div>
                  <span className="text-xs text-white/50 block mb-1">العنوان</span>
                  <p className="text-white/90 text-sm">Yemen, Sanaa, Airport Road</p>
                </div>
                <div>
                  <span className="text-xs text-white/50 block mb-1">الهاتف</span>
                  <p className="text-white/90 text-sm font-mono">+967 711 441 780</p>
                </div>
                <div>
                  <span className="text-xs text-white/50 block mb-1">البريد الإلكتروني</span>
                  <p className="text-white/90 text-sm font-mono">mohammedalhnani2004@gmail.com</p>
                </div>
              </div>

              {/* نموذج الاتصال */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormStatus(true);
                  setTimeout(() => setFormStatus(false), 4000);
                }} 
                className="md:col-span-2 space-y-4 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="اسمك"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="الموضوع"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
                <textarea
                  rows={4}
                  placeholder="رسالتك"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                >
                  إرسال الرسالة
                </button>
                {formStatus && (
                  <p className="text-emerald-400 text-xs text-center mt-2">✓ تم أرسال رسالتك بنجاح، شكراً لتواصلك!</p>
                )}
              </form>
            </div>
          </motion.div>
        </section>

        {/* ===== 8. التذييل (Footer) ===== */}
        <footer className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center bg-transparent">
          <div className="flex flex-col items-center space-y-6">
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Mohammed Al-Hanani
            </h2>
            <p className="text-white/80 text-sm italic sm:text-base">
              Full-Stack Web Developer | Building digital solutions that matter
            </p>

            {/* أيقونات التواصل الاجتماعي الدائرية بالسماوي */}
            <div className="flex items-center justify-center gap-4 py-2">
              <a 
                href="https://wa.me/967711441780" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#00f0ff] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#00f0ff]/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/MohammedAlHanani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#00f0ff] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#00f0ff]/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#00f0ff] text-black flex items-blank justify-center hover:scale-110 transition-transform shadow-lg shadow-[#00f0ff]/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.582 9 4.75V8z"/>
                </svg>
              </a>
            </div>

            <p className="text-xs text-white/40 pt-4 border-t border-white/10 w-full">
              © {new Date().getFullYear()} Mohammed Al-Hanani. All rights reserved.
            </p>

          </div>
        </footer>

      </div>
    </main>
  );
}