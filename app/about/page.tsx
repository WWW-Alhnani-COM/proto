import type { Metadata } from "next";

const SITE_URL = "https://alhanani.vercel.app";
const PROFILE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "من هو محمد عبدالرووف الحناني؟ | مهندس برمجيات يمني",
  description:
    "الملف المهني لمحمد عبدالرووف الحناني (Muhammad Abdulraoof Al-Hanani)، مهندس برمجيات ومطوّر Full-Stack من اليمن، يعمل على تطبيقات الويب والأنظمة المؤسسية وواجهات API والحلول الرقمية.",
  alternates: { canonical: PROFILE_URL },
  openGraph: {
    title: "محمد عبدالرووف الحناني | مهندس برمجيات ومطوّر Full-Stack",
    description:
      "السيرة المهنية والمهارات والمشاريع والحسابات الرسمية لمحمد عبدالرووف الحناني، مهندس برمجيات يمني.",
    url: PROFILE_URL,
    siteName: "Mohammed Al-Hanani",
    locale: "ar_YE",
    type: "profile",
  },
};

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "url": PROFILE_URL,
  "name": "الملف المهني لمحمد عبدالرووف الحناني",
  "mainEntity": {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    "name": "محمد عبدالرووف الحناني",
    "alternateName": [
      "محمد الحناني",
      "الحناني",
      "محمد عبدالرووف",
      "Mohammed Al-Hanani",
      "Muhammad Al-Hanani",
      "Muhammad Abdulraoof Al-Hanani",
      "Muhammad Abdulraoof Saif Al-Hanani"
    ],
    "url": SITE_URL,
    "image": `${SITE_URL}/img/og-image.jpg`,
    "description":
      "مهندس برمجيات ومطوّر Full-Stack من اليمن، يطوّر تطبيقات الويب والأنظمة المؤسسية والحلول الرقمية.",
    "jobTitle": ["مهندس برمجيات", "Full-Stack Software Engineer", "Full-Stack Web Developer"],
    "nationality": {
      "@type": "Country",
      "name": "Yemen"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sana'a",
      "addressCountry": "YE"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "GIC University"
    },
    "knowsAbout": [
      "Full-Stack Web Development",
      "C#",
      ".NET",
      "ASP.NET Core",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "Node.js",
      "Laravel",
      "PHP",
      "Flutter",
      "REST APIs",
      "Microservices",
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "CI/CD",
      "ERP Systems",
      "CRM Systems",
      "Business Automation"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/muhammad-al-hanani-5a5a50373",
      "https://github.com/WWW-Alhnani-COM"
    ]
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-16 text-white sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <article className="mx-auto max-w-3xl">
        <nav className="mb-10 text-sm text-white/60">
          <a href="/" className="transition hover:text-white">الرئيسية</a>
          <span className="mx-2">/</span>
          <span>الملف المهني</span>
        </nav>

        <header className="mb-10 border-b border-white/15 pb-8">
          <p className="mb-3 text-sm font-medium tracking-wide text-amber-300">
            الملف المهني الرسمي
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-5xl">
            محمد عبدالرووف الحناني
          </h1>
          <p className="text-xl text-white/80">
            Muhammad Abdulraoof Al-Hanani
          </p>
          <p className="mt-5 max-w-2xl leading-8 text-white/70">
            مهندس برمجيات ومطوّر Full-Stack من اليمن، متخصص في بناء تطبيقات الويب
            والأنظمة المؤسسية وواجهات البرمجة والحلول الرقمية للأعمال.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">نبذة مهنية</h2>
          <p className="leading-8 text-white/75">
            يعمل محمد الحناني على تصميم وتطوير حلول برمجية متكاملة، بدءًا من
            الواجهات وتجربة المستخدم، مرورًا بالخدمات الخلفية وقواعد البيانات،
            وصولًا إلى التكاملات وعمليات النشر. تشمل مجالات عمله أنظمة إدارة
            المؤسسات (ERP)، وإدارة علاقات العملاء (CRM)، والأنظمة المحاسبية
            والإدارية، ومنصات التجارة الإلكترونية والتعليم والخدمات الرقمية.
          </p>
          <p className="mt-4 leading-8 text-white/75">
            تشمل التقنيات التي يستخدمها بحسب متطلبات المشروع C# و.NET وASP.NET
            Core وJavaScript وTypeScript وReact وNext.js وAngular وNode.js و
            Laravel وFlutter وقواعد البيانات SQL وPostgreSQL وMongoDB، إلى جانب
            Docker وأدوات التكامل والنشر المستمر.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">التعليم والخبرة</h2>
          <ul className="list-disc space-y-3 ps-6 leading-8 text-white/75">
            <li>بكالوريوس تقنية المعلومات، GIC University، صنعاء، اليمن (2022).</li>
            <li>خبرة مهنية تزيد على أربع سنوات في تطوير البرمجيات وفق السيرة المهنية.</li>
            <li>خبرة في بناء تطبيقات ومنصات وأنظمة أعمال لمجالات متعددة.</li>
            <li>حصل مشروع التخرج على المركز الأول على مستوى الكلية وفق السيرة المهنية.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">المشاريع ومجالات العمل</h2>
          <p className="leading-8 text-white/75">
            يتضمن معرض الأعمال مشاريع في المحاسبة السحابية، والتجارة الإلكترونية،
            والتعليم الإلكتروني، والعقارات، وإدارة المطاعم، والخدمات اللوجستية،
            والتطبيقات الرقمية. تتوفر تفاصيل المشاريع وروابطها من الصفحة الرئيسية.
          </p>
          <a href="/" className="mt-4 inline-flex text-amber-300 underline underline-offset-4 hover:text-amber-200">
            استعراض معرض الأعمال
          </a>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">الحسابات المهنية الرسمية</h2>
          <ul className="space-y-3 text-white/75">
            <li>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/muhammad-al-hanani-5a5a50373"
                rel="me"
                className="text-amber-300 underline underline-offset-4"
              >
                الملف المهني لمحمد الحناني
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/WWW-Alhnani-COM"
                rel="me"
                className="text-amber-300 underline underline-offset-4"
              >
                مستودعات ومشاريع البرمجة
              </a>
            </li>
            <li>
              Portfolio:{" "}
              <a href={SITE_URL} className="text-amber-300 underline underline-offset-4">
                alhanani.vercel.app
              </a>
            </li>
          </ul>
        </section>

        <section className="border-t border-white/15 pt-8">
          <h2 className="mb-4 text-2xl font-semibold">للتواصل والتعاون</h2>
          <p className="leading-8 text-white/75">
            للاستفسارات المهنية أو طلب تطوير موقع أو تطبيق أو نظام أعمال، يمكن
            التواصل عبر الروابط المهنية المنشورة في الموقع.
          </p>
          <a href="/" className="mt-5 inline-flex rounded-full border border-white/25 px-5 py-3 transition hover:bg-white hover:text-black">
            العودة إلى الموقع
          </a>
        </section>
      </article>
    </main>
  );
}
