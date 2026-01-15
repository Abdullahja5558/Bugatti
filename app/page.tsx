import CockpitSection from '@/components/home/CockpitSection'
import EngineeringSanctum from '@/components/home/EngineeringSanctum'
import HeritageSection from '@/components/home/HeritageSection'
import Hero from '@/components/home/hero'
import MotivationNote from '@/components/home/MotivationNote'
import Navbar from '@/components/home/Navbar'
import SignatureReveal from '@/components/home/SignatureReveal'
import VitesseSection from '@/components/home/VitesseSection'

import React from 'react'

const page = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <EngineeringSanctum/>
      <HeritageSection/>
      <VitesseSection/>
      <CockpitSection/>
      <MotivationNote/>
      <SignatureReveal/>
     
    </>
  )
}

export default page