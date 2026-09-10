import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Areas from "@/components/Areas";
import CtaBand from "@/components/CtaBand";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.nameEn,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressCountry: "KR",
  },
};

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        본문 바로가기
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Works />
        <Areas />
        <CtaBand />
        <Team />
        <Contact />
      </main>

      <Footer />
      <Reveal />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
