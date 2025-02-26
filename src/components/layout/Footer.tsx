'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaHeart, 
  FaArrowUp
} from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

const FooterContainer = styled.footer`
  position: relative;
  color: white;
  padding: 4rem 2rem 2rem;
  overflow: hidden;
`

const FooterGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(
    135deg,
    rgba(75, 0, 130, 0.95) 0%,
    rgba(138, 43, 226, 0.85) 50%,
    rgba(75, 0, 130, 0.95) 100%
  );
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  
  @keyframes gradientAnimation {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const FooterTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
  position: relative;
  text-align: center;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 80px;
  }
`

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const QuickLinkItem = styled.li`
  text-align: center;
`

const QuickLink = styled(motion.a)`
  color: white;
  opacity: 0.8;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  font-size: 1.05rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s ease;
  }
  
  &:hover {
    opacity: 1;
    transform: translateX(5px);
    
    &:after {
      width: 100%;
    }
  }
`

const SocialLinksGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-top: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    gap: 3rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 2.5rem;
  }
`

const SocialLink = styled(motion.a)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`

const SocialIconWrapper = styled(motion.div)`
  font-size: 2.5rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`

const SocialLabel = styled(motion.span)`
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  opacity: 0.8;
  transition: opacity 0.3s;
`

const IconBackground = styled(motion.div)`
  position: absolute;
  top: -30%;
  left: -30%;
  width: 160%;
  height: 160%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  filter: blur(8px);
`

const FooterBottom = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  padding-bottom: 0rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`

const Copyright = styled.p`
  opacity: 0.9;
  font-size: 1rem;
  margin-top: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const HeartIcon = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ff6b6b;
  margin: 0 0.3rem;
`

const ScrollToTop = styled(motion.button)`
  background: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 99;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
  
  &:hover {
    opacity: 1;
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
  }
  
  svg {
    font-size: 1.2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
  
  ${({ theme }) => theme.mode === 'dark' && `
    background: #2d2d2d;
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    
    &:hover {
      background: #3d3d3d;
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.6);
    }
  `}
`

// Círculos decorativos para o footer
const FooterDecorativeCircle = styled(motion.div)<{ size: string; top: string; right: string; opacity: number }>`
  position: absolute;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  opacity: ${({ opacity }) => opacity};
  z-index: 1;
  filter: blur(8px);
`

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear())
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  
  useEffect(() => {
    const checkScrollPosition = () => {
      // Verifica se a seção de contato existe no DOM
      const contactSection = document.getElementById('contact')
      
      if (contactSection) {
        // Obtém a posição do fim da seção de contato
        const contactSectionBottom = contactSection.offsetTop + contactSection.offsetHeight
        
        // Verifica se o usuário rolou além do fim da seção de contato
        // Subtraímos uma pequena margem (200px) para mostrar o botão um pouco antes do fim
        const scrollPosition = window.scrollY + window.innerHeight
        
        // Mostra o botão apenas quando o usuário chegar perto do fim da seção de contato
        setShowScrollToTop(scrollPosition >= contactSectionBottom - 200)
      }
    }
    
    // Adiciona o event listener
    window.addEventListener('scroll', checkScrollPosition)
    
    // Verifica a posição inicial
    checkScrollPosition()
    
    // Remove o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Decorative circles data
  const decorativeCircles = [
    { size: '200px', top: '10%', right: '5%', opacity: 0.05, delay: 0.3 },
    { size: '150px', top: '40%', right: '15%', opacity: 0.03, delay: 0.5 },
    { size: '120px', top: '70%', right: '10%', opacity: 0.04, delay: 0.2 },
  ]

  return (
    <FooterContainer>
      <FooterGradient />
      
      {/* Círculos decorativos */}
      {decorativeCircles.map((circle, index) => (
        <FooterDecorativeCircle
          key={index}
          size={circle.size}
          top={circle.top}
          right={circle.right}
          opacity={circle.opacity}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: circle.opacity, scale: 1 }}
          transition={{ delay: circle.delay, duration: 1 }}
        />
      ))}
      
      <AnimatePresence>
        {showScrollToTop && (
          <ScrollToTop
            onClick={handleScrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            aria-label="Rolar para o topo"
          >
            <FaArrowUp />
          </ScrollToTop>
        )}
      </AnimatePresence>
      
      <FooterContent>
        <FooterSection>
          <FooterTitle>Redes Sociais</FooterTitle>
          <SocialLinksGrid>
            <SocialLink 
              href="https://github.com/RodCinelli" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover="hover"
            >
              <IconBackground 
                style={{ background: "radial-gradient(circle, rgba(36, 41, 46, 0.8) 0%, rgba(36, 41, 46, 0.4) 50%, rgba(36, 41, 46, 0) 100%)" }}
                variants={{
                  hover: { opacity: 0.6, scale: 1.2 }
                }}
                transition={{ duration: 0.3 }}
              />
              <SocialIconWrapper
                style={{ color: "#f0f6fc" }}
                variants={{
                  hover: { y: -8, scale: 1.2 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FaGithub />
              </SocialIconWrapper>
              <SocialLabel
                variants={{
                  hover: { opacity: 1, y: 3 }
                }}
              >
                GitHub
              </SocialLabel>
            </SocialLink>
            
            <SocialLink 
              href="https://www.linkedin.com/in/rodrigo-cinelli" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover="hover"
            >
              <IconBackground 
                style={{ background: "radial-gradient(circle, rgba(10, 102, 194, 0.8) 0%, rgba(10, 102, 194, 0.4) 50%, rgba(10, 102, 194, 0) 100%)" }}
                variants={{
                  hover: { opacity: 0.6, scale: 1.2 }
                }}
                transition={{ duration: 0.3 }}
              />
              <SocialIconWrapper
                style={{ color: "#0a66c2" }}
                variants={{
                  hover: { y: -8, scale: 1.2 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FaLinkedin />
              </SocialIconWrapper>
              <SocialLabel
                variants={{
                  hover: { opacity: 1, y: 3 }
                }}
              >
                LinkedIn
              </SocialLabel>
            </SocialLink>
            
            <SocialLink 
              href="https://www.instagram.com/rod.cinelli/" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover="hover"
            >
              <IconBackground 
                style={{ background: "radial-gradient(circle, rgba(225, 48, 108, 0.8) 0%, rgba(225, 48, 108, 0.4) 50%, rgba(225, 48, 108, 0) 100%)" }}
                variants={{
                  hover: { opacity: 0.6, scale: 1.2 }
                }}
                transition={{ duration: 0.3 }}
              />
              <SocialIconWrapper
                style={{ color: "#e1306c" }}
                variants={{
                  hover: { y: -8, scale: 1.2 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FaInstagram />
              </SocialIconWrapper>
              <SocialLabel
                variants={{
                  hover: { opacity: 1, y: 3 }
                }}
              >
                Instagram
              </SocialLabel>
            </SocialLink>
            
            <SocialLink 
              href="mailto:rodcinelli@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover="hover"
            >
              <IconBackground 
                style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)" }}
                variants={{
                  hover: { opacity: 0.6, scale: 1.2 }
                }}
                transition={{ duration: 0.3 }}
              />
              <SocialIconWrapper
                style={{ color: "#FFFFFF" }}
                variants={{
                  hover: { y: -8, scale: 1.2 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <HiOutlineMail />
              </SocialIconWrapper>
              <SocialLabel
                variants={{
                  hover: { opacity: 1, y: 3 }
                }}
              >
                Email
              </SocialLabel>
            </SocialLink>
          </SocialLinksGrid>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Links Rápidos</FooterTitle>
          <QuickLinks>
            <QuickLinkItem>
              <QuickLink 
                href="#about"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Sobre Mim
              </QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink 
                href="#skills"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Habilidades
              </QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink 
                href="#projects"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Projetos
              </QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink 
                href="#experience"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Experiência
              </QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink 
                href="#contact"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Contato
              </QuickLink>
            </QuickLinkItem>
            <QuickLinkItem>
              <QuickLink 
                href="/assets/documents/cv_rodrigo_cinelli.pdf"
                target="_blank"
                download="CV_Rodrigo_Cinelli.pdf"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Download CV
              </QuickLink>
            </QuickLinkItem>
          </QuickLinks>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          &copy; {year} Rodrigo Cinelli. Todos os direitos reservados.
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  )
}
