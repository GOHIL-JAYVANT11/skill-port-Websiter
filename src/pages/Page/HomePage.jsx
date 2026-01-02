import React from 'react'
import Header from '../../Components/Home/Header';
import HeroSection from '../../Components/Home/HeroSection';
import StatsSection from '../../Components/Home/StatsSection';
import CategoriesSection from '../../Components/Home/CategoriesSection';
import FeaturedJobsSection from '../../Components/Home/FeaturedJobsSection';
import EcosystemSection from '../../Components/Home/EcosystemSection';
import FeaturesSection from '../../Components/Home/FeaturesSection';
import HowItWorksSection from '../../Components/Home/HowItWorksSection';
import TestimonialsSection from '../../Components/Home/TestimonialsSection';
import RecruiterCTASection from '../../Components/Home/RecruiterCTASection';
import Footer from '../../Components/Home/Footer';



const HomePage = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <CategoriesSection />
        <FeaturedJobsSection />
        <EcosystemSection />
        <FeaturesSection />
        <HowItWorksSection /> 
        <TestimonialsSection /> 
        <RecruiterCTASection /> 
      </main>
      <Footer />
    </div>
  )
}

export default HomePage