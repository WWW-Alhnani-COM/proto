"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import ProfileCard from '../components/ProfileCard';
import LogoLoop from '../components/LogoLoop';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiFlutter,
  SiLaravel,
  SiFirebase,
  SiMysql,
  SiGit,
  SiGithub,
  SiVercel,
  SiDocker
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { FaSun, FaMoon } from 'react-icons/fa';
import CountUp from "@/components/CountUp";
import PixelTransition from "@/components/PixelTransition";
import ElectricBorder from '@/components/ElectricBorder';
import '@/components/ElectricBorder.css';

// ===== بيانات مشاريعك =====
const projects = [
  {
    id: 1,
    name: 'عطر أوسما',
    title: 'Osma Perfume',
    handle: 'osma-perfume',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a12.jpg',
    iconUrl: '/img/a12.jpg',
    miniAvatarUrl: '/img/a12.jpg',
    link: 'https://osma-perfume.vercel.app',
    description: 'عطر فاخر بتصميم عصري وتجربة تسوق أنيقة.'
  },
  {
    id: 2,
    name: 'ACCMA للحسابات السحابية',
    title: 'ACCMA Cloud Accounting',
    handle: 'accmah',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a.jpg',
    iconUrl: '/img/a.jpg',
    miniAvatarUrl: '/img/a.jpg',
    link: 'https://accmah.com',
    description: 'منصة محاسبة سحابية متكاملة للشركات والمؤسسات.'
  },
  {
    id: 3,
    name: 'نظام إدارة الشحن',
    title: 'Shipping Management System',
    handle: 'shipping-system',
    status: 'قيد التطوير',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a2.jpg',
    iconUrl: '/img/a2.jpg',
    miniAvatarUrl: '/img/a2.jpg',
    link: '#',
    description: 'نظام متقدم لإدارة عمليات الشحن والتوصيل.'
  },
  {
    id: 4,
    name: 'أكاديمية ZealEra',
    title: 'ZealEra Academy',
    handle: 'zealera',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a7.jpg',
    iconUrl: '/img/a7.jpg',
    miniAvatarUrl: '/img/a7.jpg',
    link: 'https://esraazealera.com',
    description: 'تعليم مبتكر للطلاب والمعلمين بمناهج تفاعلية.'
  },
  {
    id: 5,
    name: 'مفتاحك',
    title: 'Moftaahk',
    handle: 'moftaahk',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a11.jpg',
    iconUrl: '/img/a11.jpg',
    miniAvatarUrl: '/img/a11.jpg',
    link: 'https://moftaahk.com',
    description: 'حلول رقمية ذكية لإدارة المفاتيح والوصول.'
  },
  {
    id: 7,
    name: 'موقع Shuhnaty',
    title: 'Shuhnaty',
    handle: 'shuhnaty',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a10.jpg',
    iconUrl: '/img/a10.jpg',
    miniAvatarUrl: '/img/a10.jpg',
    link: 'https://shuhnaty.vercel.app',
    description: 'منصة شحن متكاملة لتتبع الطرود والخدمات اللوجستية.'
  },
  {
    id: 8,
    name: 'إسلامي — التطبيق الإسلامي',
    title: 'Islamy App',
    handle: 'islamy-web',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a5.jpg',
    iconUrl: '/img/a5.jpg',
    miniAvatarUrl: '/img/a5.jpg',
    link: 'https://islamy-web.vercel.app',
    description: 'تطبيق إسلامي شامل: أذكار، قرآن، مواقيت الصلاة.'
  },
  {
    id: 9,
    name: 'منصة Lernerra',
    title: 'Lernerra Platform',
    handle: 'lernerra',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a7.jpg',
    iconUrl: '/img/a7.jpg',
    miniAvatarUrl: '/img/a7.jpg',
    link: 'https://lernerra-platform.vercel.app',
    description: 'منصة التعلم والتطوير المهني للمدربين والمتعلمين.'
  },
  {
    id: 10,
    name: 'شركة مداد العقارية',
    title: 'Midad Real Estate',
    handle: 'midad2',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a1.jpg',
    iconUrl: '/img/a1.jpg',
    miniAvatarUrl: '/img/a1.jpg',
    link: 'https://midad2-pi.vercel.app',
    description: 'بوابة عقارية متكاملة للبيع والإيجار والاستشارات.'
  },
  {
    id: 11,
    name: 'Lahnui',
    title: 'Lahnui',
    handle: 'lahnui',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a6.jpg',
    iconUrl: '/img/a6.jpg',
    miniAvatarUrl: '/img/a6.jpg',
    link: 'https://lahnui.vercel.app',
    description: 'عالم من الإلهام والأفكار الجديدة في قالب عصري.'
  },
  {
    id: 12,
    name: 'Mohamed Saad',
    title: 'Mohamed Saad',
    handle: 'mohamed-saad',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a9.jpg',
    iconUrl: '/img/a9.jpg',
    miniAvatarUrl: '/img/a9.jpg',
    link: 'https://mohamed-saad.com',
    description: 'شغف يتجسّد — موقع شخصي للمبدع محمد سعد.'
  },
  {
    id: 13,
    name: 'منصة Etrain',
    title: 'Etrain Education',
    handle: 'etrain',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a4.jpg',
    iconUrl: '/img/a4.jpg',
    miniAvatarUrl: '/img/a4.jpg',
    link: 'https://etrain-nine.vercel.app',
    description: 'منصة تعليمية متكاملة للتعليم التفاعلي عن بُعد.'
  },
  {
    id: 14,
    name: 'GroFit Wear',
    title: 'GroFit Wear',
    handle: 'grofit-wear',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a8.jpg',
    iconUrl: '/img/a8.jpg',
    miniAvatarUrl: '/img/a8.jpg',
    link: 'https://grofit-wear.com',
    description: 'ارتدِ النشاط، عِش اللياقة — ملابس رياضية عصرية.'
  },
  {
    id: 15,
    name: 'نظام إدارة المطاعم Episys',
    title: 'Episys Restaurant',
    handle: 'episys',
    status: 'مكتمل',
    contactText: 'عرض المشروع',
    avatarUrl: '/img/a3.jpg',
    iconUrl: '/img/a3.jpg',
    miniAvatarUrl: '/img/a3.jpg',
    link: 'https://episys.vercel.app',
    description: 'نظام إدارة المطاعم والطلب الذكي (Episys).'
  }
];

// ===== بيانات التقنيات والمهارات =====
const techLogos = [
  { 
    node: <SiReact className="text-[#61DAFB]" />, 
    title: "React", 
    href: "https://react.dev",
    ariaLabel: "React JS"
  },
  { 
    node: <SiNextdotjs className="text-white dark:text-white" />, 
    title: "Next.js", 
    href: "https://nextjs.org",
    ariaLabel: "Next.js"
  },
  { 
    node: <SiTypescript className="text-[#3178C6]" />, 
    title: "TypeScript", 
    href: "https://www.typescriptlang.org",
    ariaLabel: "TypeScript"
  },
  { 
    node: <SiTailwindcss className="text-[#06B6D4]" />, 
    title: "Tailwind CSS", 
    href: "https://tailwindcss.com",
    ariaLabel: "Tailwind CSS"
  },
  { 
    node: <SiFlutter className="text-[#02569B]" />, 
    title: "Flutter", 
    href: "https://flutter.dev",
    ariaLabel: "Flutter"
  },
  { 
    node: <SiLaravel className="text-[#FF2D20]" />, 
    title: "Laravel", 
    href: "https://laravel.com",
    ariaLabel: "Laravel"
  },
  { 
    node: <SiFirebase className="text-[#FFCA28]" />, 
    title: "Firebase", 
    href: "https://firebase.google.com",
    ariaLabel: "Firebase"
  },
  { 
    node: <SiMysql className="text-[#4479A1]" />, 
    title: "MySQL", 
    href: "https://mysql.com",
    ariaLabel: "MySQL"
  },
  { 
    node: <SiGit className="text-[#F05032]" />, 
    title: "Git", 
    href: "https://git-scm.com",
    ariaLabel: "Git"
  },
  { 
    node: <SiGithub className="text-white dark:text-white" />, 
    title: "GitHub", 
    href: "https://github.com",
    ariaLabel: "GitHub"
  },
  { 
    node: <SiVercel className="text-white dark:text-white" />, 
    title: "Vercel", 
    href: "https://vercel.com",
    ariaLabel: "Vercel"
  },
  { 
    node: <SiDocker className="text-[#2496ED]" />, 
    title: "Docker", 
    href: "https://docker.com",
    ariaLabel: "Docker"
  },
  { 
    node: <FaAws className="text-[#FF9900]" />, 
    title: "AWS", 
    href: "https://aws.amazon.com",
    ariaLabel: "AWS"
  },
];

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
    end: 0.20,
  },
  {
    id: 1,
    title: "التميز والخبرة",
    subtitle: "تطوير تطبيقات وتصميم حلول برمجية بمعايير عالمية",
    align: "left" as const,
    start: 0.18,
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
    end: 0.80,
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
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);

  // ===== نصوص ثابتة لتأثير الكتابة =====
  const FULL_NAME = "Mohammed Al-Hanani";
  const FULL_TITLE = "Full-Stack Web Developer | مهندس برمجيات";

  const [showTyping, setShowTyping] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [typedTitle, setTypedTitle] = useState("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // مؤشرات الكتابة باستخدام useRef لتجنب مشاكل الإغلاق
  const nameIndexRef = useRef(0);
  const titleIndexRef = useRef(0);

  // مرجع لتخزين النصوص النهائية لمنع undefined
  const finalNameRef = useRef("");
  const finalTitleRef = useRef("");

  // إحداثيات مؤشر الفأرة لتتبع البقعة الكاشفة
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isInsideHero, setIsInsideHero] = useState(false);

  // حالة نموذج الاتصال
  const [formStatus, setFormStatus] = useState(false);
  
  // حالة القائمة المنبثقة للجوال (Mobile Menu)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // حالة عرض المشاريع (للجوال)
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ===== حالة الثيم (داكن/نهاري) =====
  const [isDark, setIsDark] = useState(true); // ← التغيير: true بدلاً من false لجعل الثيم الليلي افتراضياً

  // تأثير تبديل الثيم
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const framePaths = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, index) => getFramePath(index)),
    []
  );

  // كشف حجم الشاشة
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ===== تحسين معالجة السكرول =====
  useEffect(() => {
    const updateScrollProgress = () => {
      const heroScrollDistance = window.innerHeight * 3;
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / heroScrollDistance));
      progressRef.current = nextProgress;
      setScrollProgress(nextProgress);
    };

    // تحديث فوري
    updateScrollProgress();

    let frameId = 0;
    const handleScroll = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      frameId = window.requestAnimationFrame(updateScrollProgress);
    };

    // استخدام passive: true لتحسين الأداء
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // ===== تحميل الصور بشكل متوازي مع تحميل جميع الإطارات فوراً =====
  useEffect(() => {
    let cancelled = false;
    const loadedFrames: HTMLImageElement[] = new Array(framePaths.length);
    let completed = 0;

    const loadImage = (path: string, index: number) => {
      const image = new window.Image();
      image.loading = "eager";
      image.onload = () => {
        if (cancelled) return;
        loadedFrames[index] = image;
        completed += 1;
        
        setFrames([...loadedFrames]);
        
        if (index === 0) {
          setIsFirstFrameReady(true);
          setIsLoaded(true);
        }
        
        if (completed >= 8 && !isLoaded) {
          setIsLoaded(true);
        }
        
        if (completed === framePaths.length) {
          setIsLoaded(true);
        }
      };
      image.onerror = () => {
        if (cancelled) return;
        completed += 1;
        if (completed >= 8 && !isLoaded) {
          setIsLoaded(true);
        }
      };
      image.src = path;
    };

    framePaths.forEach((path, index) => {
      loadImage(path, index);
    });

    const timer = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [framePaths, isLoaded]);

  // ===== تأثير الكتابة =====
  useEffect(() => {
    if (isLoaded && scrollProgress === 0) {
      setShowTyping(true);
    } else {
      setShowTyping(false);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    }
  }, [isLoaded, scrollProgress]);

  useEffect(() => {
    if (!showTyping) {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      return;
    }

    if (nameIndexRef.current === 0 && titleIndexRef.current === 0) {
      setTypedName("");
      setTypedTitle("");
      finalNameRef.current = "";
      finalTitleRef.current = "";
    }

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      const nameDone = nameIndexRef.current >= FULL_NAME.length;
      const titleDone = titleIndexRef.current >= FULL_TITLE.length;

      if (nameDone && titleDone) {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        return;
      }

      if (!nameDone) {
        const char = FULL_NAME[nameIndexRef.current] || "";
        setTypedName((prev) => prev + char);
        finalNameRef.current += char;
        nameIndexRef.current += 1;
      } else if (!titleDone) {
        const char = FULL_TITLE[titleIndexRef.current] || "";
        setTypedTitle((prev) => prev + char);
        finalTitleRef.current += char;
        titleIndexRef.current += 1;
      }
    }, 80);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [showTyping]);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.documentElement.style.overflowY = "auto";
  }, []);

// ===== Canvas لرسم الإطارات مع عرض الإطار الأول افتراضياً =====
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const draw = () => {
    // التأكد من وجود إطارات
    if (!frames.length) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // اختيار الإطار بناءً على scrollProgress، لكن إذا كان 0 نستخدم الإطار الأول
    let frameIndex = 0;
    if (scrollProgress > 0) {
      frameIndex = Math.min(frames.length - 1, Math.max(0, Math.round(scrollProgress * (frames.length - 1))));
    }
    
    const image = frames[frameIndex];
    
    let finalImage = image;
    let finalIndex = frameIndex;
    let attempts = 0;
    while (!finalImage && attempts < frames.length) {
      finalIndex = (finalIndex + 1) % frames.length;
      finalImage = frames[finalIndex];
      attempts++;
    }
    
    if (!finalImage) return;

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

    const naturalAspect = finalImage.naturalWidth / finalImage.naturalHeight;
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

    context.drawImage(finalImage, offsetX, offsetY, drawWidth, drawHeight);
  };

  draw();

  const handleResize = () => draw();
  window.addEventListener('resize', handleResize);

  let rafId: number | null = null;
  const drawSmooth = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(draw);
  };

  const timeoutId = setTimeout(drawSmooth, 0);

  return () => {
    window.removeEventListener('resize', handleResize);
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    clearTimeout(timeoutId);
  };
}, [frames, scrollProgress]); 


  const isHeroFinished = scrollProgress >= 1;

  const handleProjectClick = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      console.log('Internal route:', link);
    }
  };

  const displayedProjects = isMobile && !showAllProjects 
    ? projects.slice(0, 6) 
    : projects;

  // عرض النصوص النهائية أو النص المكتوب، مع منع undefined
  const displayName = typedName || finalNameRef.current || FULL_NAME;
  const displayTitle = typedTitle || finalTitleRef.current || FULL_TITLE;

  return (
    <main className="relative bg-white dark:bg-[#020202] text-black dark:text-white selection:bg-amber-400/20 selection:text-white font-sans transition-colors duration-300">
      
      {/* ===== الهيدر ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/10 px-4 sm:px-6 py-2[...]
          
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold text-base sm:text-lg shadow-lg shadow-amber-400/20 group-hover:scal[...]
              M
            </div>
            <span className="font-bold tracking-tight text-black dark:text-white group-hover:text-amber-400 transition-colors text-xs sm:text-sm md:text-base">
              <span className="hidden xs:inline">Mohammed Al-Hanani</span>
              <span className="xs:hidden">M. Hanani</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-black/80 dark:text-white/80">
            <a href="#about" className="hover:text-amber-400 transition-colors">عني</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">الخدمات</a>
            <a href="#portfolio" className="hover:text-amber-400 transition-colors">الأعمال</a>
            <a href="#technologies" className="hover:text-amber-400 transition-colors">التقنيات</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 transition-all flex[...]
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </button>
            <a
              href="#contact"
              className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-xl bg-amber-400 text-black font-semibold text-xs lg:text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              اتصل بي
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto mt-2 rounded-2xl bg-white/90 dark:bg-black/90 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 md:hid[...]
          >
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-black/80 dark:text-white/80 hover:text-amber-400 transition-colors py-2 border-b border-black/10 dark:border-white/10 text-sm"
            >
              عني
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-black/80 dark:text-white/80 hover:text-amber-400 transition-colors py-2 border-b border-black/10 dark:border-white/10 text-sm"
            >
              الخدمات
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-black/80 dark:text-white/80 hover:text-amber-400 transition-colors py-2 border-b border-black/10 dark:border-white/10 text-sm"
            >
              الأعمال
            </a>
            <a 
              href="#technologies" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-black/80 dark:text-white/80 hover:text-amber-400 transition-colors py-2 border-b border-black/10 dark:border-white/10 text-sm"
            >
              التقنيات
            </a>
            <button
              onClick={() => {
                setIsDark(!isDark);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-black/5 dark:bg-white/10 text-black/80 dark:text-white/80 hover:text-amber-400 transition-colors text-sm font-medium flex items-center justify-c[...]
            >
              {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              {isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
            </button>
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

      {/* ===== الخلفية الثابتة ===== */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-white dark:bg-[#020202] transition-colors duration-300">
        <canvas ref={canvasRef} className="h-full w-full opacity-60" />
        <div className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-md border border-white/10 dark:border-white/5 pointer-events-none transition-all duration-300" />
        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white dark:bg-[#020202] backdrop-blur-md transition-colors duration-300">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-black/10 dark:border-white/10 border-t-amber-400" />
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-black/50 dark:text-white/50">جاري تحميل المعرض</p>
                <p className="mt-2 text-base font-medium text-black/90 dark:text-white/90">استعد لاكتشاف أعمال Mohammed Al-Hanani</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== تأثير الكتابة (يظهر بعد التحميل وقبل التمرير) ===== */}
        {showTyping && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/80 dark:bg-[#020202]/80 backdrop-blur-sm transition-colors duration-300 pointer-events-none">
            <div className="text-center max-w-3xl px-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-snug tracking-tight text-amber-400 drop-shadow-md mb-4 min-h-[6rem] font-serif">
  {displayName}
  {displayName.length < FULL_NAME.length && <span className="animate-pulse text-amber-400">|</span>}
</h1>
              <p className="text-base sm:text-xl md:text-3xl font-light leading-snug tracking-wide text-black dark:text-white drop-shadow-lg min-h-[4rem]">
                {displayTitle}
                {displayTitle.length < FULL_TITLE.length && displayName.length >= FULL_NAME.length && <span className="animate-pulse text-amber-400">|</span>}
              </p>
              
            </div>
          </div>
        )}
      </div>

      {/* ===== قسم الهيرو ===== */}
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
        <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-x-0 top-16 sm:top-24 flex justify-center px-4 sm:px-6 text-center">
            <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] text-black/60 dark:text-white/60 drop-shadow transition-colors duration-300">
              {isHeroFinished ? "✨ مرحباً بك في موقعي الرسمي" : "اسحب للأسفل لاستكشاف الإبداع"}
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
                className={`absolute max-w-[18rem] sm:max-w-[22rem] md:max-w-[28rem] px-4 sm:px-6 ${
                  block.align === "left"
                    ? "left-4 sm:left-6 md:left-16 top-1/2 -translate-y-1/2 text-left"
                    : block.align === "right"
                      ? "right-4 sm:right-6 md:right-16 top-1/2 -translate-y-1/2 text-right"
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
                    className="mb-1 sm:mb-2 text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.45em] text-amber-400 drop-shadow-md font-medium"
                    animate={{ letterSpacing: inRange ? "0.45em" : "0.2em" }}
                    transition={{ duration: 0.3 }}
                  >
                    {block.title}
                  </motion.p>
                  <motion.h2 
                    className="text-base sm:text-xl md:text-3xl font-bold leading-snug tracking-tight text-black dark:text-white drop-shadow-lg transition-colors duration-300"
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
        
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-black/40 dark:text-white/40 text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-colors duration-300"
          >
            {isHeroFinished ? "✓ تم" : "مرر للأسفل"}
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-black/20 dark:border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-black/40 dark:bg-white/40 animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* ===== المحتوى الرئيسي ===== */}
      <div className="relative z-10 bg-transparent pt-16 sm:pt-20 pb-12 sm:pb-16 space-y-24 sm:space-y-32">
        
        {/* ===== قسم عني ===== */}
        <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <span className="w-8 sm:w-10 h-0.5 bg-amber-400"></span>
              <span className="text-amber-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">About Me</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 sm:mb-6 text-black dark:text-white transition-colors duration-300">
              مطور برمجيات <span className="text-amber-400">شغوف</span> بحل المشكلات
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
              
              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-amber-400/10 to-amber-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity du[...]
                  
                  <div className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-sm p-2 transition-colors duration-300[...]
                    <PixelTransition
                      firstContent={
                        <img
                          src="/img/profile-img.jpg"
                          alt="Mohammed Al-Hanani"
                          loading="lazy"
                          decoding="async"
                          style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover",
                            display: "block"
                          }}
                          onError={(e) => {
                            e.currentTarget.src = 'https://ui-avatars.com/api/?name=Mohammed+Al-Hanani&size=400&background=F59E0B&color=fff&bold=true';
                          }}
                        />
                      }
                      secondContent={
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                            backgroundColor: "#0a0a0a",
                            backgroundImage: "radial-gradient(circle at center, #1a1a2e 0%, #0a0a0a 100%)",
                            padding: "20px"
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <p style={{ 
                              fontWeight: 700, 
                              fontSize: "1.5rem", 
                              color: "#F59E0B",
                              marginBottom: "8px"
                            }}>
                              مرحباً!
                            </p>
                            <p style={{ 
                              fontSize: "0.8rem", 
                              color: "#ffffff",
                              opacity: 0.8,
                              maxWidth: "200px"
                            }}>
                              محمد الحناني
                            </p>
                            <div style={{
                              width: "40px",
                              height: "2px",
                              backgroundColor: "#F59E0B",
                              margin: "12px auto",
                              borderRadius: "2px"
                            }} />
                            <p style={{ 
                              fontSize: "0.7rem", 
                              color: "#ffffff",
                              opacity: 0.5
                            }}>
                              Full-Stack Developer
                            </p>
                          </div>
                        </div>
                      }
                      gridSize={12}
                      pixelColor="#F59E0B"
                      animationStepDuration={0.5}
                      once={false}
                      aspectRatio="75%"
                      className="w-full"
                      style={{
                        width: "100%",
                        borderRadius: "12px",
                        border: "none",
                        backgroundColor: "transparent"
                      }}
                    />
                    
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-amber-400/30 rounded-xl px-3 py-1.5 sm:px-4 sm:py[...]
                      <span className="block text-xl sm:text-2xl font-bold text-amber-400">4+</span>
                      <span className="text-[8px] sm:text-[10px] text-black/60 dark:text-white/60 uppercase tracking-wider">سنوات خبرة</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-1 sm:mb-2 transition-colors duration-300">
                    Mohammed Al-Hanani
                  </h3>
                  <p className="text-amber-400 text-xs sm:text-sm font-medium">
                    Full-Stack Developer | مهندس برمجيات
                  </p>
                </div>
                
                <p className="text-black/70 dark:text-white/80 leading-relaxed text-sm sm:text-base transition-colors duration-300">
                  مطور برمجيات شغوف بتطوير حلول تقنية مبتكرة وفعالة. أمتلك خبرة في بناء 
                  تطبيقات الويب والموبايل باستخدام أحدث التقنيات، مع التركيز على جودة الكود 
                  وتجربة المستخدم. أسعى دائماً لتقديم قيمة مضافة لعملائي من خلال حلول برمجية 
                  احترافية تلبي احتياجاتهم وتتجاوز توقعاتهم.
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="p-2 sm:p-3 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:border-amber-400/30 transition-a[...]
                    <span className="text-[7px] sm:text-[8px] text-black/40 dark:text-white/40 uppercase tracking-wider block mb-0.5">الاسم</span>
                    <span className="font-medium text-black dark:text-white text-[10px] sm:text-xs">Mohammed Al-Hanani</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:border-amber-400/30 transition-a[...]
                    <span className="text-[7px] sm:text-[8px] text-black/40 dark:text-white/40 uppercase tracking-wider block mb-0.5">البريد الإلكتروني</span>
                    <span className="font-medium text-black dark:text-white text-[10px] sm:text-xs truncate block">Mohammadalhnani@gmail.com</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:border-amber-400/30 transition-a[...]
                    <span className="text-[7px] sm:text-[8px] text-black/40 dark:text-white/40 uppercase tracking-wider block mb-0.5">المكان</span>
                    <span className="font-medium text-black dark:text-white text-[10px] sm:text-xs">Yemen, Sanaa</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:border-amber-400/30 transition-a[...]
                    <span className="text-[7px] sm:text-[8px] text-black/40 dark:text-white/40 uppercase tracking-wider block mb-0.5">الخبرة</span>
                    <span className="font-medium text-amber-400 text-[10px] sm:text-xs">4+ سنوات</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-400/5 to-transparent border border-amber-400/10">
                  <p className="text-black/60 dark:text-white/70 text-xs sm:text-sm leading-relaxed italic transition-colors duration-300">
                    "أؤمن بأن التكنولوجيا الجيدة يجب أن تكون بسيطة وسهلة الاستخدام، 
                    ولذلك أركز على تقديم حلول برمجية تجمع بين القوة والجمال."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== قسم الخدمات ===== */}
        <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <span className="w-8 sm:w-10 h-0.5 bg-amber-400"></span>
              <span className="text-amber-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">My Expertise</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2 sm:mb-4 text-black dark:text-white transition-colors duration-300">الخدمات التقنية المتكامل�[...]
