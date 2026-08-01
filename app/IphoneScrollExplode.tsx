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
  const [isDark, setIsDark] = useState(false);

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
      // 🔥 التغيير هنا: تحميل جميع الإطارات فوراً (eager) بدلاً من lazy
      image.loading = "eager";
      image.onload = () => {
        if (cancelled) return;
        loadedFrames[index] = image;
        completed += 1;
        
        // تحديث الحالة تدريجياً
        setFrames([...loadedFrames]);
        
        // إظهار المحتوى عند تحميل أول إطار
        if (index === 0) {
          setIsFirstFrameReady(true);
          setIsLoaded(true);
        }
        
        // إظهار المحتوى عند تحميل 8 إطارات
        if (completed >= 8 && !isLoaded) {
          setIsLoaded(true);
        }
        
        // اكتمال جميع الصور
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

    // تحميل الصور بشكل متوازي
    framePaths.forEach((path, index) => {
      loadImage(path, index);
    });

    // مهلة أمان: إظهار المحتوى بعد 1.5 ثانية حتى لو لم تكتمل الصور
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

  // ===== تأثير الكتابة (نصوص ثابتة) =====
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
      setTypedName("");
      setTypedTitle("");
      return;
    }

    let nameIndex = 0;
    let titleIndex = 0;

    // إعادة تعيين النصوص
    setTypedName("");
    setTypedTitle("");

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      if (nameIndex < FULL_NAME.length) {
        setTypedName(prev => prev + FULL_NAME[nameIndex]);
        nameIndex++;
      } else if (titleIndex < FULL_TITLE.length) {
        setTypedTitle(prev => prev + FULL_TITLE[titleIndex]);
        titleIndex++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
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

// ===== Canvas لرسم الإطارات =====
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const draw = () => {
    // إذا لم توجد إطارات، امسح الشاشة
    if (!frames.length) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // حساب الإطار المطلوب بناءً على التمرير
    const frameIndex = Math.min(frames.length - 1, Math.max(0, Math.round(scrollProgress * (frames.length - 1))));
    const image = frames[frameIndex];
    
    // إذا لم تكن الصورة محملة، ابحث عن أقرب صورة
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

  // رسم فوري
  draw();

  // إعادة الرسم عند تغيير حجم الشاشة
  const handleResize = () => draw();
  window.addEventListener('resize', handleResize);

  // إعادة الرسم عند تغيير الإطارات أو التمرير
  // استخدام requestAnimationFrame لتجنب الرسم المتكرر
  let rafId: number | null = null;
  const drawSmooth = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(draw);
  };

  // مراقبة تغييرات scrollProgress و frames
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

  // دالة للتعامل مع النقر على زر المشروع
  const handleProjectClick = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      console.log('Internal route:', link);
    }
  };

  // تحديد عدد المشاريع المعروضة
  const displayedProjects = isMobile && !showAllProjects 
    ? projects.slice(0, 6) 
    : projects;

  return (
    <main className="relative bg-white dark:bg-[#020202] text-black dark:text-white selection:bg-amber-400/20 selection:text-white font-sans transition-colors duration-300">
      
      {/* ===== الهيدر الاحترافي (Navbar) ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/10 px-4 sm:px-6 py-2 sm:py-3 shadow-2xl transition-colors duration-300">
          
          {/* الشعار / الاسم */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold text-base sm:text-lg shadow-lg shadow-amber-400/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-bold tracking-tight text-black dark:text-white group-hover:text-amber-400 transition-colors text-xs sm:text-sm md:text-base">
              <span className="hidden xs:inline">Mohammed Al-Hanani</span>
              <span className="xs:hidden">M. Hanani</span>
            </span>
          </a>

          {/* روابط التنقل للشاشات الكبيرة */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-black/80 dark:text-white/80">
            <a href="#about" className="hover:text-amber-400 transition-colors">عني</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">الخدمات</a>
            <a href="#portfolio" className="hover:text-amber-400 transition-colors">الأعمال</a>
            <a href="#technologies" className="hover:text-amber-400 transition-colors">التقنيات</a>
          </nav>

          {/* زر تبديل الثيم + زر اتصل بي */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 transition-all flex items-center justify-center text-black/80 dark:text-white/80 hover:text-amber-400 dark:hover:text-amber-400"
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

          {/* زر القائمة للجوال */}
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

        {/* القائمة المنسدلة للجوال */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto mt-2 rounded-2xl bg-white/90 dark:bg-black/90 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 md:hidden shadow-2xl text-center"
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
            {/* زر تبديل الثيم في القائمة */}
            <button
              onClick={() => {
                setIsDark(!isDark);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-black/5 dark:bg-white/10 text-black/80 dark:text-white/80 hover:text-amber-400 transition-colors text-sm font-medium flex items-center justify-center gap-2"
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
        {/* Loading - يظهر فقط في البداية */}
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
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-snug tracking-tight text-amber-400 drop-shadow-md mb-4 min-h-[6rem] font-serif">
                {typedName}
                {typedName.length < FULL_NAME.length && <span className="animate-pulse text-amber-400">|</span>}
              </h1>
              <p className="text-base sm:text-xl md:text-3xl font-light leading-snug tracking-wide text-black dark:text-white drop-shadow-lg min-h-[4rem]">
                {typedTitle}
                {typedTitle.length < FULL_TITLE.length && typedName.length >= FULL_NAME.length && <span className="animate-pulse text-amber-400">|</span>}
              </p>
              <p className="text-xs text-black/40 dark:text-white/40 mt-6 animate-pulse">
                {typedName.length >= FULL_NAME.length && typedTitle.length >= FULL_TITLE.length ? '✓ جاهز' : '... يكتب'}
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
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-amber-400/10 to-amber-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-sm p-2 transition-colors duration-300">
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
                    
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-amber-400/30 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-xl z-10 transition-colors duration-300">
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
                  <div className="p-2 sm:p-3 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:border-amber-400/30 transition-all duration-300">
                    <span className="text-[7px] sm:text-[8px] text-black/40 dark:text-white/40 uppercase tracking-wider block mb-0.5">الاسم</span>
                    <span className="font-medium text-black dark:text-white text-[10px] sm:text-xs">Mohammed Al-Hanani</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:border-amber-400/30 transition-all duration-300">
                    <span className="text-[7px] sm:text-[8px] text-black/40 dark:text-white/40 uppercase tracking-wider block mb-0.5">البريد الإلكتروني</span>
                    <span className="font-medium text-black dark:text-white text-[10px] sm:text-xs truncate block">Mohammadalhnani@gmail.com</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:border-amber-400/30 transition-all duration-300">
                    <span className="text-[7px] sm:text-[8px] text-black/40 dark:text-white/40 uppercase tracking-wider block mb-0.5">المكان</span>
                    <span className="font-medium text-black dark:text-white text-[10px] sm:text-xs">Yemen, Sanaa</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:border-amber-400/30 transition-all duration-300">
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
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2 sm:mb-4 text-black dark:text-white transition-colors duration-300">الخدمات التقنية المتكاملة</h2>
            <p className="text-black/70 dark:text-white/80 mb-8 sm:mb-12 text-sm sm:text-base drop-shadow max-w-3xl transition-colors duration-300">
              أقدم حلولاً برمجية شاملة تغطي كامل دورة حياة التطوير، من الواجهات الأمامية إلى البنية التحتية السحابية
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              <ElectricBorder
                color="#F59E0B"
                speed={1.2}
                chaos={0.13}
                borderRadius={16}
                className="transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="p-4 sm:p-6 bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-[16px] min-h-[180px] sm:min-h-[220px] transition-colors duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-black dark:text-white transition-colors duration-300">تطوير الواجهات الأمامية</h3>
                      <p className="text-black/70 dark:text-white/80 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                        بناء واجهات مستخدم تفاعلية وسريعة باستخدام <span className="text-amber-400/80">React.js</span>، 
                        <span className="text-amber-400/80"> Angular</span>، 
                        <span className="text-amber-400/80"> Bootstrap</span>، 
                        <span className="text-amber-400/80"> JavaScript</span> و 
                        <span className="text-amber-400/80"> TypeScript</span>.
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">React</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">Angular</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">TypeScript</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

              <ElectricBorder
                color="#F59E0B"
                speed={1.2}
                chaos={0.13}
                borderRadius={16}
                className="transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="p-4 sm:p-6 bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-[16px] min-h-[180px] sm:min-h-[220px] transition-colors duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-black dark:text-white transition-colors duration-300">تطوير الخلفية والـ APIs</h3>
                      <p className="text-black/70 dark:text-white/80 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                        تصميم وتطوير أنظمة خلفية قوية وآمنة باستخدام <span className="text-amber-400/80">.NET Core</span>، 
                        <span className="text-amber-400/80"> Node.js</span> و 
                        <span className="text-amber-400/80"> Laravel</span>.
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">.NET Core</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">Node.js</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">Laravel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

              <ElectricBorder
                color="#F59E0B"
                speed={1.2}
                chaos={0.13}
                borderRadius={16}
                className="transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="p-4 sm:p-6 bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-[16px] min-h-[180px] sm:min-h-[220px] transition-colors duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-black dark:text-white transition-colors duration-300">تطبيقات الموبايل</h3>
                      <p className="text-black/70 dark:text-white/80 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                        تطوير تطبيقات متعددة المنصات <span className="text-amber-400/80">(Cross-Platform)</span> باستخدام 
                        <span className="text-amber-400/80"> Flutter</span>.
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">Flutter</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">Java</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">Python</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

              <ElectricBorder
                color="#F59E0B"
                speed={1.2}
                chaos={0.13}
                borderRadius={16}
                className="transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="p-4 sm:p-6 bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-[16px] min-h-[180px] sm:min-h-[220px] transition-colors duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-black dark:text-white transition-colors duration-300">قواعد البيانات والسحابة</h3>
                      <p className="text-black/70 dark:text-white/80 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                        إدارة قواعد البيانات ونشر التطبيقات على منصات سحابية مثل <span className="text-amber-400/80">AWS</span> و 
                        <span className="text-amber-400/80"> Azure</span>.
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">Docker</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">AWS</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-400/10 text-amber-400/70 border border-amber-400/20">Azure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-8 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-black/5 dark:border-white/5 transition-colors duration-300"
            >
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-bold text-amber-400">
                  <CountUp from={0} to={4} duration={2} separator="" className="count-up-text" />+
                </span>
                <span className="text-[8px] sm:text-[10px] text-black/40 dark:text-white/40 uppercase tracking-wider mt-1 block">سنوات خبرة</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-bold text-amber-400">
                  <CountUp from={0} to={123} duration={2.5} separator="" className="count-up-text" />+
                </span>
                <span className="text-[8px] sm:text-[10px] text-black/40 dark:text-white/40 uppercase tracking-wider mt-1 block">مشروع منجز</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-bold text-amber-400">
                  <CountUp from={0} to={200} duration={2.5} separator="" className="count-up-text" />+
                </span>
                <span className="text-[8px] sm:text-[10px] text-black/40 dark:text-white/40 uppercase tracking-wider mt-1 block">عميل سعيد</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-bold text-amber-400">24/7</span>
                <span className="text-[8px] sm:text-[10px] text-black/40 dark:text-white/40 uppercase tracking-wider mt-1 block">دعم فني</span>
              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* ===== قسم المشاريع (Portfolio) ===== */}
        <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <span className="w-8 sm:w-10 h-0.5 bg-amber-400"></span>
              <span className="text-amber-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">My Work</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-black dark:text-white transition-colors duration-300">
                  <span className="block sm:inline">Portfolio</span>
                  <span className="block sm:inline text-amber-400"> — مشاريعي</span>
                </h2>
              </div>
              <p className="text-black/70 dark:text-white/80 text-sm sm:text-base drop-shadow max-w-2xl transition-colors duration-300">
                {isMobile ? 'أحدث المشاريع' : 'استكشف مجموعة من مشاريعي المتميزة'}
              </p>
            </div>

            {/* شبكة البطاقات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex justify-center w-full"
                >
                  <ProfileCard
                    name={project.name}
                    title={project.title}
                    handle={project.handle}
                    status={project.status}
                    contactText={project.contactText}
                    avatarUrl={project.avatarUrl}
                    iconUrl={project.iconUrl}
                    miniAvatarUrl={project.miniAvatarUrl}
                    showUserInfo={true}
                    enableTilt={!isMobile}
                    enableMobileTilt={true}
                    behindGlowEnabled={true}
                    behindGlowColor="rgba(255, 215, 0, 0.2)"
                    innerGradient="linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 50%, #d4d4d4 100%)"
                    onContactClick={() => handleProjectClick(project.link)}
                    className="w-full max-w-[320px] sm:max-w-sm md:max-w-md mx-auto"
                  />
                </motion.div>
              ))}
            </div>

            {/* زر عرض المزيد للجوال */}
            {isMobile && projects.length > 6 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex justify-center"
              >
                <button 
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="px-6 py-3 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 hover:bg-amber-400/20 transition-colors text-sm font-medium"
                >
                  {showAllProjects ? 'عرض أقل' : 'عرض جميع المشاريع'}
                </button>
              </motion.div>
            )}

            {/* دعوة لزيارة لينكد إن */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-black/50 backdrop-blur-md border border-amber-400/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl transition-colors duration-300"
            >
              <div>
                <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 text-black dark:text-white transition-colors duration-300">المزيد من المشاريع والإنجازات</h3>
                <p className="text-black/70 dark:text-white/80 text-xs sm:text-sm max-w-xl transition-colors duration-300">
                  لديّ المزيد من المشاريع الاحترافية. أدعوك لزيارة ملفي الشخصي على LinkedIn.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/mohammed-al-hanani-942809278/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors whitespace-nowrap shadow-lg shadow-amber-400/20 text-sm sm:text-base"
              >
                تصفح المشاريع
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== قسم التقنيات ===== */}
        <section id="technologies" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <span className="w-8 sm:w-10 h-0.5 bg-amber-400"></span>
              <span className="text-amber-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">Technologies</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2 sm:mb-4 text-black dark:text-white transition-colors duration-300">التقنيات التي أستخدمها</h2>
            <p className="text-black/70 dark:text-white/80 mb-8 sm:mb-10 text-sm sm:text-base drop-shadow transition-colors duration-300">
              مجموعة من أحدث التقنيات والأدوات التي أعمل بها لتطوير حلول برمجية متكاملة
            </p>

            <div className="relative w-full bg-white/20 dark:bg-black/20 rounded-2xl p-4 sm:p-8 backdrop-blur-sm border border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-300">
              <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }}>
                <LogoLoop
                  logos={techLogos}
                  speed={80}
                  direction="left"
                  logoHeight={isMobile ? 35 : 50}
                  gap={isMobile ? 30 : 50}
                  hoverSpeed={20}
                  scaleOnHover
                  fadeOut
                  fadeOutColor={isDark ? "#020202" : "#ffffff"}
                  ariaLabel="التقنيات والمهارات"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== قسم اتصل بي ===== */}
        <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <span className="w-8 sm:w-10 h-0.5 bg-amber-400"></span>
              <span className="text-amber-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">Contact</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-2 sm:mb-4 text-black dark:text-white transition-colors duration-300">تواصل معي لبدء مشروعك القادم</h2>
            <p className="text-black/70 dark:text-white/80 mb-8 sm:mb-12 drop-shadow text-sm sm:text-base transition-colors duration-300">
              سواء كنت بحاجة إلى تطبيق موبايل أو موقع إلكتروني، تواصل معي الآن وسنبدأ العمل مباشرة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              <div className="space-y-4 sm:space-y-6 md:col-span-1 p-4 sm:p-6 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg h-fit transition-colors duration-300">
                <div>
                  <span className="text-[10px] sm:text-xs text-black/50 dark:text-white/50 block mb-1">العنوان</span>
                  <p className="text-black/90 dark:text-white/90 text-xs sm:text-sm">Yemen, Sanaa, Airport Road</p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-black/50 dark:text-white/50 block mb-1">الهاتف</span>
                  <p className="text-black/90 dark:text-white/90 text-xs sm:text-sm font-mono">+967 711 441 780</p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-black/50 dark:text-white/50 block mb-1">البريد الإلكتروني</span>
                  <p className="text-black/90 dark:text-white/90 text-xs sm:text-sm font-mono break-all">mohammedalhnani2004@gmail.com</p>
                </div>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormStatus(true);
                  setTimeout(() => setFormStatus(false), 4000);
                }} 
                className="md:col-span-2 space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg transition-colors duration-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative">
                    <label className="block text-[10px] sm:text-xs text-black/40 dark:text-white/40 mb-1.5">اسمك</label>
                    <input
                      type="text"
                      placeholder="أدخل اسمك"
                      required
                      className="w-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3.5 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-[10px] sm:text-xs text-black/40 dark:text-white/40 mb-1.5">بريدك الإلكتروني</label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      required
                      className="w-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3.5 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] sm:text-xs text-black/40 dark:text-white/40 mb-1.5">الموضوع</label>
                  <input
                    type="text"
                    placeholder="ما هو موضوع رسالتك؟"
                    required
                    className="w-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3.5 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="relative">
                  <label className="block text-[10px] sm:text-xs text-black/40 dark:text-white/40 mb-1.5">رسالتك</label>
                  <textarea
                    rows={4}
                    placeholder="اكتب رسالتك هنا..."
                    required
                    className="w-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3.5 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 sm:py-4 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 text-sm sm:text-base"
                >
                  إرسال الرسالة
                </button>

                {formStatus && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 text-xs sm:text-sm text-center mt-2"
                  >
                    ✓ تم إرسال رسالتك بنجاح، شكراً لتواصلك!
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </section>

        {/* ===== التذييل ===== */}
        <footer className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-12 text-center bg-transparent">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white transition-colors duration-300">
              Mohammed Al-Hanani
            </h2>
            <p className="text-black/70 dark:text-white/80 text-xs sm:text-sm italic transition-colors duration-300">
              Full-Stack Web Developer | Building digital solutions that matter
            </p>

            <div className="flex items-center justify-center gap-3 sm:gap-4 py-2">
              <a 
                href="https://wa.me/967711441780" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00f0ff] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#00f0ff]/20"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/MohammedAlHanani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00f0ff] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#00f0ff]/20"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00f0ff] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#00f0ff]/20"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.582 9 4.75V8z"/>
                </svg>
              </a>
            </div>

            <p className="text-[10px] sm:text-xs text-black/40 dark:text-white/40 pt-4 border-t border-black/10 dark:border-white/10 w-full transition-colors duration-300">
              © {new Date().getFullYear()} Mohammed Al-Hanani. All rights reserved.
            </p>

          </div>
        </footer>

      </div>
    </main>
  );
        }
