import { Helmet } from 'react-helmet-async';
import { PERSONAL_INFO } from './data/portfolioData';
import { Layout } from './layouts/Layout';

import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { Works } from './sections/Works';
import { Timeline } from './sections/Timeline';
import { Skills } from './sections/Skills';
// import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';

function App() {
  return (
    <>
      <Helmet>
        <title>{PERSONAL_INFO.name} | Full Stack Engineer & AI/ML Developer</title>
        <meta name="description" content={PERSONAL_INFO.bio} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`${PERSONAL_INFO.name} | Full Stack Developer & AI/ML Engineer`} />
        <meta property="og:description" content={PERSONAL_INFO.bio} />
        <meta property="og:site_name" content={`${PERSONAL_INFO.name} Portfolio`} />
        
        {/* JSON-LD Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": PERSONAL_INFO.name,
            "jobTitle": "Full Stack Engineer & AI/ML Developer",
            "url": "https://shileshmavchi.com",
            "email": PERSONAL_INFO.email,
            "telephone": PERSONAL_INFO.phone,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Nashik",
              "addressRegion": "Maharashtra",
              "addressCountry": "India"
            },
            "sameAs": [
              PERSONAL_INFO.linkedin,
              PERSONAL_INFO.github
            ]
          })}
        </script>
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Works/Projects Section */}
        <Works />

        {/* Journey/Timeline Section (Experience, Education, Certifications) */}
        <Timeline />

        {/* Skills Section */}
        <Skills />

        {/* Testimonials Carousel Section - Hidden for now */}
        {/* <Testimonials /> */}

        {/* Contact Form & Info Section */}
        <Contact />
      </Layout>
    </>
  );
}

export default App;
