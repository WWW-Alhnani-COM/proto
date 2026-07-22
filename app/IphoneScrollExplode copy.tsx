"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

// ===== تأكد من أن عدد الإطارات يتطابق مع عدد الصور لديك =====
const FRAME_COUNT = 61;

// ===== بيانات النصوص التي تظهر أثناء التمرير (داخل الهيرو فقط) =====
const textBlocks = [
  {
    id: 0,
    title: "محمد الحناني",
    subtitle: "Full-Stack Developer | مهندس برمجيات",
    align: "center" as const,
    start: 0,
    end: 0.3,
  },
  {
    id: 1,
    title: ".NET Core & Microservices",
    subtitle: "بناء أنظمة خلفية قوية باستخدام أحدث التقنيات",
    align: "left" as const,
    start: 0.23,
    end: 0.55,
  },
  {
    id: 2,
    title: "Flutter & Cross-Platform",
    subtitle: "تطبيقات موبايل وسطح مكتب بأداء استثنائي",
    align: "right" as const,
    start: 0.5,
    end: 0.8,
  },
  {
    id: 3,
    title: "حلول متكاملة",
    subtitle: "من الفكرة إلى الإنتاج بجودة احترافية",
    align: "center" as const,
    start: 0.8,
    end: 1,
  },
];

// ===== بيانات المعلومات الشخصية =====
const personalInfo = [
  { label: "الاسم", value: "محمد الحناني", mono: false },
  { label: "البريد", value: "Muhammadalhnani2004@gmail.com", mono: true },
  { label: "الهاتف", value: "+967 774 218 060", mono: true },
  { label: "الخبرة", value: "4+ سنوات", mono: false },
  { label: "العمل الحر", value: "متاح", mono: false },
  { label: "الموقع", value: "اليمن - صنعاء - خط المطار", mono: false },
];

// ===== بيانات الخدمات (مرتبة كطبقات النظام: واجهة ← خلفية ← تطبيقات ← بنية تحتية) =====
const services = [
  {
    icon: "🚀",
    title: "الواجهات الأمامية",
    description: "React.js، Angular، Bootstrap، JavaScript و TypeScript",
  },
  {
    icon: "⚙️",
    title: "الخلفية والـ APIs",
    description: ".NET Core، Node.js و Laravel مع تصميم Microservices",
  },
  {
    icon: "📱",
    title: "تطبيقات الموبايل وسطح المكتب",
    description: "Flutter و Java / Python",
  },
  {
    icon: "☁️",
    title: "قواعد البيانات والسحابة",
    description: "PostgreSQL، MongoDB، Redis، SQL Server، MySQL، Docker، Kubernetes، AWS و Azure",
  },
];

// ===== بيانات الإنجازات =====
const achievements = [
  {
    icon: "🏆",
    text: "الحصول على المركز الأول على مستوى الكلية لمشروع التخرج من جامعة GIC (2022)",
  },
  {
    icon: "📚",
    text: "إكمال مسارات متقدمة في .NET Core Microservices، Docker & Kubernetes، PostgreSQL، Node.js & React.js، Angular على Udemy",
  },
  {
    icon: "🏢",
    text: "المشاركة في تنفيذ منصات حكومية وخاصة في دول الخليج وشمال إفريقيا وغرب آسيا",
  },
];

// ===== بيانات البورتفوليو =====
// ملاحظة: ضع صور المشاريع داخل مجلد /public/portfolio بنفس أسماء الملفات أدناه.
const portfolio = [
  {
    title: "ميداد العقارية - Midad",
    stack: [".NET Core", "SQL Server", "Azure", "CI/CD", "Angular"],
    description: "لوحات تحليلية فورية لأكثر من 5 مليون متر مربع.",
    link: "https://midad2-pi.vercel.app",
    image: "/portfolio/midad.jpg",
  },
  {
    title: "ACCMA - المحاسبي السحابي",
    stack: [".NET Core", "PostgreSQL", "Microservices", "OAuth 2.0"],
    description: "نظام محاسبي ثنائي اللغة (عربي/إنجليزي).",
    link: "#",
    image: "/portfolio/accma.jpg",
  },
  {
    title: "Episys - إدارة المطاعم والمقاهي",
    stack: [".NET Core", "MongoDB", "Redis", "RabbitMQ", "Docker", "Kubernetes"],
    description: "تتبع الطلبات فورياً.",
    link: "https://episys.vercel.app",
    image: "/portfolio/episys.jpg",
  },
  {
    title: "YemenFleet - تتبع المركبات",
    stack: ["React.js", "Node.js", "MongoDB", "WebSockets", "Google Maps API"],
    description: "تتبع فوري للمركبات وتقارير الصيانة.",
    link: "https://www.yemenfleet.com",
    image: "/portfolio/yemenfleet.jpg",
  },
  {
    title: "Web Islamy - منصة إسلامية شاملة",
    stack: ["JavaScript", "APIs خارجية"],
    description: "قرآن وحديث مع مشغل صوتي ومواقيت صلاة.",
    link: "https://islamy-web.vercel.app",
    image: "/portfolio/islamy.jpg",
  },
  {
    title: "Tren E - منصة تعليمية",
    stack: ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
    description: "منصة تعليمية للأطفال والشباب.",
    link: "https://etrain-nine.vercel.app",
    image: "/portfolio/trene.jpg",
  },
];

// ===== دالة مسار الصور =====
function getFramePath(index: number) {
  return `/me/ffout${String(index + 1).padStart(3, "0")}.gif`;
}

// ===== إعدادات أنيميشن ظهور الأقسام أثناء التمرير =====
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const sectionViewport = { once: true, amount: 0.15 } as const;
const sectionTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] } as const;

// ===== الخط العلوي المضيء (العنصر التوقيعي المتكرر في كل بطاقة رئيسية) =====
const TOP_ACCENT =
  "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent";

// ===== عنوان قسم بأسلوب تعليق برمجي (// Label) - يعزز هوية "مهندس برمجيات" =====
function SectionEyebrow({ children }: { children: string }) {
  return (
    <span className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-amber-400/85">
      <span className="text-amber-400/45">//</span>
      {children}
    </span>
  );
}

// ===== حاوية البطاقة الزجاجية الموحّدة =====
function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      <span className={TOP_ACCENT} />
      {children}
    </div>
  );
}

// ===== بطاقة صورة مشروع مع ظهور تدريجي وبديل أنيق عند غياب الصورة =====
function PortfolioImage({ src, alt }: { src: string; alt: string }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      {status !== "error" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {status !== "loaded" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.04] to-transparent">
          {status === "loading" && (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-amber-400/70" />
          )}
          {status === "error" && <span className="text-2xl opacity-40">🖼️</span>}
        </div>
      )}
    </div>
  );
}

export default function IphoneScrollExplode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const framePaths = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, index) => getFramePath(index)),
    []
  );

  // ===== تزامن الخلفية مع التمرير =====
  // ملاحظة: التقدّم يُحسب بناءً على مسافة تمرير الهيرو نفسها (100vh + 70vh = 170vh،
  // نفس المسافة المحجوزة قبل ظهور المحتوى)، وليس على ارتفاع الصفحة الكامل.
  // هذا يضمن اكتمال النصوص والإطارات قبل أن يبدأ المحتوى بتغطية الخلفية، فلا تعود
  // النصوص تظهر خلف الأقسام بسبب طول الصفحة الكلي.
  useEffect(() => {
    const updateScrollProgress = () => {
      const heroScrollDistance = window.innerHeight * 1.7;
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

  // ===== تحميل الصور =====
  useEffect(() => {
    let cancelled = false;
    const loadedFrames: HTMLImageElement[] = [];
    let completed = 0;

    framePaths.forEach((path, index) => {
      const image = new window.Image();

      image.onload = () => {
        if (cancelled) return;
        loadedFrames[index] = image;
        completed += 1;
        if (completed === framePaths.length) {
          setFrames(loadedFrames);
          setIsLoaded(true);
        }
      };

      image.onerror = () => {
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

  // ===== إدارة overflow للجسم =====
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.documentElement.style.overflowY = "auto";
  }, []);

  // ===== رسم الصور على Canvas =====
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
    <main className="relative min-h-screen bg-[#030303] text-white selection:bg-amber-400/20 selection:text-white">
      {/* ===== الخلفية المتحركة (ثابتة في الخلف) ===== */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#030303]">
        <canvas ref={canvasRef} className="h-full w-full opacity-90" />

        {/* طبقة تدرج لدمج الخلفية بسلاسة مع المحتوى */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/40 to-[#030303]" />

        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#030303]/98 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-white/10 border-t-amber-400" />
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">جاري تحميل المعرض</p>
                <p className="mt-2 text-base font-medium text-white/90">استعد لاكتشاف أعمال محمد الحناني</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== النصوص العائمة فوق الخلفية ===== */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="absolute inset-x-0 top-10 flex justify-center px-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-white/40">
              {isHeroFinished ? "✨ مرحباً بك في موقعي" : "اسحب للأسفل لاستكشاف الإبداع"}
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
              ? progress < 0.2
                ? progress / 0.2
                : progress > 0.8
                  ? (1 - progress) / 0.2
                  : 1
              : 0;
            const offsetY = inRange ? 0 : 20;
            const translateX = block.align === "left" ? -20 : block.align === "right" ? 20 : 0;

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
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="mb-2 text-[11px] uppercase tracking-[0.45em] text-white/50">{block.title}</p>
                <h2 className="text-2xl font-semibold leading-snug tracking-tight text-white drop-shadow-md sm:text-4xl">
                  {block.subtitle}
                </h2>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== المحتوى (يظهر فوق الخلفية) ===== */}
      <div className="relative z-10 mt-[100vh]">
        <div className="h-[70vh]" />

        {/* ===== قسم "عني" ===== */}
        <motion.section
          className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 sm:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionVariants}
          transition={sectionTransition}
        >
          <GlassPanel className="p-8 sm:p-12">
            <SectionEyebrow>About</SectionEyebrow>
            <h2 className="text-2xl font-bold leading-relaxed tracking-tight text-white sm:text-3xl">
              مهندس برمجيات | مطور Full-Stack حاصل على المركز الأول على مستوى الكلية لمشروع التخرج.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70">
              أمتلك خبرة واسعة في تطوير تطبيقات الويب، الجوال، وسطح المكتب، مع التركيز على هندسة الأنظمة المصغرة
              Microservices، وعمليات السحاب باستخدام Docker و Kubernetes، إلى جانب قواعد البيانات المتقدمة. شغوف
              بتقديم كود نظيف وحلول برمجية عالية الأداء.
            </p>
          </GlassPanel>

          {/* ===== المعلومات الشخصية والسيرة الذاتية ===== */}
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <GlassPanel className="p-8">
              <SectionEyebrow>Personal Info</SectionEyebrow>
              <div className="grid gap-3 sm:grid-cols-2">
                {personalInfo.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-amber-400/25 hover:bg-white/[0.05]"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">{item.label}</p>
                    <p
                      className={`mt-1.5 truncate text-sm font-medium text-white/90 ${item.mono ? "font-mono tracking-tight" : ""}`}
                      dir={item.mono ? "ltr" : undefined}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-8">
              <SectionEyebrow>Resume</SectionEyebrow>
              <h3 className="text-xl font-bold text-white">مطور Full-Stack (متخصص بالباك إند)</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                تصميم وتطوير RESTful APIs و GraphQL APIs الآمنة، وتكامل أنظمة الدفع وإدارة الخدمات عبر وسيط الرسائل
                RabbitMQ.
              </p>

              <div className="relative mt-6 space-y-5 border-r-2 border-white/10 pr-5">
                <div className="relative">
                  <span className="absolute right-[-27px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#0f0f10] bg-amber-400" />
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400/80">
                    2022 — حتى الآن
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">Full Stack Developer</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    تطوير واختبار أكثر من 10 تطبيقات ويب وموبايل باستخدام .NET Core و Flutter.
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute right-[-27px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#0f0f10] bg-white/30" />
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">2022 — حتى الآن</p>
                  <p className="mt-1 text-sm font-semibold text-white">Independent Developer</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    تنفيذ حلول برمجية متكاملة لعملاء في مختلف دول المنطقة.
                  </p>
                </div>
              </div>
            </GlassPanel>
          </div>
        </motion.section>

        {/* ===== قسم الخدمات ===== */}
        <motion.section
          className="mx-auto max-w-6xl px-6 pb-16 sm:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionVariants}
          transition={sectionTransition}
        >
          <GlassPanel className="p-8 sm:p-12">
            <SectionEyebrow>Services</SectionEyebrow>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="group relative flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/25 hover:bg-white/[0.05]"
                >
                  <span className="absolute left-4 top-4 font-mono text-[10px] text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-xl transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-white">{service.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/65">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.section>

        {/* ===== قسم الإنجازات + البورتفوليو ===== */}
        <motion.section
          className="mx-auto max-w-6xl px-6 pb-16 sm:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionVariants}
          transition={sectionTransition}
        >
          <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassPanel className="p-8">
              <SectionEyebrow>Achievements</SectionEyebrow>
              <div className="space-y-4">
                {achievements.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-amber-400/25 hover:bg-white/[0.05]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-base">
                      {item.icon}
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">{item.text}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-8">
              <div className="flex items-baseline justify-between">
                <SectionEyebrow>Portfolio</SectionEyebrow>
                <span className="font-mono text-[11px] text-white/30">{portfolio.length} مشاريع</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {portfolio.map((project) => {
                  const isLive = Boolean(project.link) && project.link !== "#";
                  const visibleStack = project.stack.slice(0, 3);
                  const extraStackCount = project.stack.length - visibleStack.length;

                  return (
                    <div
                      key={project.title}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/25 hover:bg-white/[0.05]"
                    >
                      <div className="relative">
                        <PortfolioImage src={project.image} alt={project.title} />
                        <span
                          className={`absolute right-2.5 top-2.5 flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-medium backdrop-blur-md ${
                            isLive
                              ? "border-emerald-400/25 bg-emerald-950/50 text-emerald-300"
                              : "border-white/10 bg-black/50 text-white/45"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-400" : "bg-white/40"}`}
                          />
                          {isLive ? "منشور" : "قريباً"}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-4">
                        <h4 className="text-sm font-semibold leading-snug text-white transition-colors group-hover:text-amber-300">
                          {project.title}
                        </h4>
                        <p
                          className="mt-1.5 text-xs leading-relaxed text-white/60"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {project.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {visibleStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] tracking-tight text-white/55"
                            >
                              {tech}
                            </span>
                          ))}
                          {extraStackCount > 0 && (
                            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] tracking-tight text-white/35">
                              +{extraStackCount}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 border-t border-white/5 pt-3">
                          {isLive ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-amber-300"
                            >
                              زيارة المشروع
                              <span className="transition-transform group-hover:translate-x-[-3px]">←</span>
                            </a>
                          ) : (
                            <span className="text-[11px] uppercase tracking-[0.15em] text-white/25">
                              قيد النشر
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>
          </div>
        </motion.section>

        {/* ===== قسم التواصل ===== */}
        <motion.section
          className="mx-auto max-w-6xl px-6 pb-20 sm:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionVariants}
          transition={sectionTransition}
        >
          <GlassPanel className="p-8 sm:p-12">
            <SectionEyebrow>Contact</SectionEyebrow>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-3">
                {[
                  { icon: "📍", label: "العنوان", value: "اليمن - صنعاء - خط المطار", mono: false },
                  { icon: "📞", label: "الهاتف", value: "+967 774 218 060", mono: true },
                  { icon: "✉️", label: "البريد", value: "Muhammadalhnani2004@gmail.com", mono: true },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-base">
                      {row.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{row.label}</p>
                      <p
                        className={`truncate text-sm text-white/85 ${row.mono ? "font-mono" : ""}`}
                        dir={row.mono ? "ltr" : undefined}
                      >
                        {row.value}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 pt-2">
                  <a
                    href="https://linkedin.com/in/muhammad-al-hanani-5a5a50373"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition-all hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-200"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/WWW-Alhnani-COM"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition-all hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-200"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <form className="grid gap-3.5" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/30 focus:border-amber-400/50 focus:bg-white/[0.05]"
                  placeholder="الاسم"
                />
                <input
                  className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/30 focus:border-amber-400/50 focus:bg-white/[0.05]"
                  placeholder="البريد الإلكتروني"
                />
                <input
                  className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/30 focus:border-amber-400/50 focus:bg-white/[0.05]"
                  placeholder="الموضوع"
                />
                <textarea
                  className="min-h-[110px] resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/30 focus:border-amber-400/50 focus:bg-white/[0.05]"
                  placeholder="رسالتك"
                />
                <button
                  className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-amber-200 transition-all hover:border-amber-400/60 hover:bg-amber-400/20"
                  type="submit"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </GlassPanel>
        </motion.section>

        {/* ===== الفوتر ===== */}
        <footer className="relative overflow-hidden border-t border-white/10 bg-neutral-950/60 px-6 py-8 text-center text-xs text-white/40 backdrop-blur-lg">
          <span className={TOP_ACCENT} />
          <p>محمد الحناني - Full-Stack Developer | تحويل الأفكار إلى حلول رقمية مبتكرة</p>
          <p className="mt-1.5">© Copyright M.Al-Hanani. All Rights Reserved</p>
        </footer>
      </div>
    </main>
  );
}