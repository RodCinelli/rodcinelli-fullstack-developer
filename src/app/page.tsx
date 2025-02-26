'use client'

import dynamic from 'next/dynamic'

// Componentes de layout
const Navbar = dynamic(() => import('../components/layout/Navbar'), { ssr: false })
const Footer = dynamic(() => import('../components/layout/Footer'), { ssr: false })

// Componentes de seção
const Hero = dynamic(() => import('../components/sections/Hero'), { ssr: false })
const About = dynamic(() => import('../components/sections/About'), { ssr: false })
const Skills = dynamic(() => import('../components/sections/Skills'), { ssr: false })
const Projects = dynamic(() => import('../components/sections/Projects'), { ssr: false })
const Experience = dynamic(() => import('../components/sections/Experience'), { ssr: false })
const Contact = dynamic(() => import('../components/sections/Contact'), { ssr: false })

// Desativa a renderização estática para esta página
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

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
