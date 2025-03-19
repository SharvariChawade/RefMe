import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestPosts from './LatestPosts'
import Footer from './shared/Footer'
import useGetAllReferralPosts from '@/hooks/useGetAllReferralPosts'

function Home() {
  useGetAllReferralPosts();
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestPosts />
      <Footer />
    </div>    
  )
}

export default Home