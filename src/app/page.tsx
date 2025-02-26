'use client'

/* next-dynamic-once render=dynamic */
import dynamicImport from 'next/dynamic'

// Componentes de layout
const Navbar = dynamicImport(() => import('../components/layout/Navbar'), { ssr: false })
const Footer = dynamicImport(() => import('../components/layout/Footer'), { ssr: false })

// Componentes de seção
const Hero = dynamicImport(() => import('../components/sections/Hero'), { ssr: false })
const About = dynamicImport(() => import('../components/sections/About'), { ssr: false })
const Skills = dynamicImport(() => import('../components/sections/Skills'), { ssr: false })
const Projects = dynamicImport(() => import('../components/sections/Projects'), { ssr: false })
const Experience = dynamicImport(() => import('../components/sections/Experience'), { ssr: false })
const Contact = dynamicImport(() => import('../components/sections/Contact'), { ssr: false })

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
