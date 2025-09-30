
import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import FeaturesOverview from '../component/FeaturesOverview'
import AiTools from '../component/AiTools'
import Testimonials from '../component/Testimonial'
import Pricing from '../component/Pricing'
import Footer from '../component/Footer'
import React, { useEffect, useState } from 'react';


function Home() {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const testimonialSections = document.getElementsByClassName('testimonial-section');
      if (testimonialSections.length > 0) {
        const rect = testimonialSections[0].getBoundingClientRect();
        setShowNavbar(rect.bottom > 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showNavbar && <Navbar />}
  <Hero />
  <FeaturesOverview />
  <AiTools />
      <Testimonials />
      <Pricing />
      <Footer />
    </>
  );
}

export default Home