import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Areas from "@/components/Areas";
import CtaBand from "@/components/CtaBand";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SwimmingLogo from "@/components/SwimmingLogo";
import { site, t, type Lang } from "@/data/site";

/** 한국어·영어 페이지가 공유하는 본문 */
export default function Page({ lang }: { lang: Lang }) {
  const d = t[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: d.name,
    alternateName: site.nameEn,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: d.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: d.footer.address,
      addressCountry: "KR",
    },
  };

  return (
    <>
      <a className="skip" href="#main">
        {d.skip}
      </a>

      <SwimmingLogo />

      <Nav lang={lang} />

      <main id="main">
        <Hero lang={lang} />
        <Works lang={lang} />
        <Areas lang={lang} />
        <CtaBand lang={lang} />
        <Team lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />
      <Reveal />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
