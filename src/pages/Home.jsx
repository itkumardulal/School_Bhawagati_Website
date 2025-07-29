import React from 'react'
import Hero from '../component/Hero'
import Stats from '../component/Stats'
import News from '../component/News'
import Features from '../component/Features'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Message from '../component/Message'
import Contact from '../component/Contact'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <News />
      <Message/>
      <Contact/>
      <Footer />
    </>
  )
}

export default Home