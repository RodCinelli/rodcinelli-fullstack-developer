'use client'

import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { FaArrowDown, FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa'
import Image from 'next/image'

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.hero};
  padding: 0 2rem;
  padding-top: 4rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    justify-content: flex-start;
    padding-top: 9rem;
  }
  
  @media (max-width: 520px) {
    padding: 0 1rem;
    padding-top: 8rem;
  }
`

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  margin-top: 3rem;
  z-index: 2;
  padding-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
    padding-bottom: 1rem;
    margin-top: 0;
  }
  
  @media (max-width: 520px) {
    gap: 1.5rem;
    padding-bottom: 0.5rem;
  }
`

const HeroContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding-right: 2rem;
  
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding-right: 0;
  }
`

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #fff;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 320px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1.2rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 520px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 370px) {
    font-size: 0.95rem;
    margin-bottom: 1.8rem;
  }
`

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    max-width: 100%;
    margin: 0 auto;
  }
  
  @media (max-width: 520px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
  
  @media (max-width: 370px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`

const PrimaryButton = styled(motion.a)`
  background: #fff;
  color: #4B0082;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px solid #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: transparent;
    color: #fff;
    border-color: #fff;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.4rem;
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
  }
  
  @media (max-width: 520px) {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
`

const SecondaryButton = styled(motion.a)`
  background: transparent;
  color: #fff;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px solid #fff;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.4rem;
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
  }
  
  @media (max-width: 520px) {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
`

const TertiaryButton = styled(motion.a)`
  background: transparent;
  color: #fff;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px dashed rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid #fff;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.4rem;
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
    grid-column: 1 / -1;
  }
  
  @media (max-width: 520px) {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
`

const SocialLinks = styled(motion.div)`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    position: relative;
    left: auto;
    top: auto;
    bottom: auto;
    transform: none;
    flex-direction: row;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 6rem;
    gap: 3rem;
  }
  
  @media (max-width: 520px) {
    margin-top: 1.5rem;
    margin-bottom: 5rem;
    gap: 2.5rem;
  }
`

const SocialLink = styled(motion.a)`
  color: white;
  font-size: 2rem;
  transition: all 0.3s ease;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.3));
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
    transform: translateY(-3px);
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.4));
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: none;
  }
  
  @media (max-width: 520px) {
    display: none;
  }
`

// Container simplificado da foto
const PhotoContainer = styled(motion.div)`
  flex: 0.8;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    width: 80%;
    max-width: 350px;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  
  @media (max-width: 520px) {
    width: 85%;
    max-width: 300px;
    margin-bottom: 0.5rem;
  }
`

// Adicionar efeito de gradiente animado para o fundo do Hero
const HeroGradientBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: linear-gradient(
    135deg,
    rgba(75, 0, 130, 0.9) 0%,
    rgba(138, 43, 226, 0.8) 50%,
    rgba(75, 0, 130, 0.9) 100%
  );
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  
  @keyframes gradientAnimation {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
`

// Atualizar o PhotoFrame para ter animações mais elaboradas
const PhotoFrame = styled(motion.div)`
  position: relative;
  width: 380px;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.3);
  margin: 0 auto;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    z-index: -1;
    background: linear-gradient(
      315deg,
      rgba(155, 106, 235, 0.8),
      rgba(75, 0, 130, 0.5),
      rgba(155, 106, 235, 0.8)
    );
    background-size: 200% 200%;
    animation: borderGlow 8s linear infinite;
    filter: blur(15px);
    border-radius: 20px;
    opacity: 0.7;
  }
  
  @keyframes borderGlow {
    0% { background-position: 0% 0% }
    50% { background-position: 100% 100% }
    100% { background-position: 0% 0% }
  }
  
  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
  }
  
  @media (max-width: 520px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 370px) {
    width: 220px;
    height: 220px;
  }
`

// Atualizar o NameHighlight para ter um efeito mais elaborado
const NameHighlight = styled(motion.span)`
  position: relative;
  display: inline-block;
  color: white;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(
      90deg,
      rgba(155, 106, 235, 0.4) 0%,
      rgba(155, 106, 235, 0.8) 50%,
      rgba(155, 106, 235, 0.4) 100%
    );
    z-index: -1;
    border-radius: 4px;
  }
`

// BackgroundCircle com animação
const BackgroundCircle = styled(motion.div)<{ size: string; top: string; left: string; opacity: number }>`
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
  left: ${({ left }) => left};
  opacity: ${({ opacity }) => opacity};
  z-index: 1;
  filter: blur(8px);
`

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  
  // Efeito de movimento do mouse para a foto
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!photoRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Calcular a posição relativa do mouse (-1 a 1)
      const x = (clientX / innerWidth) * 2 - 1
      const y = (clientY / innerHeight) * 2 - 1
      
      // Aplicar um leve movimento 3D baseado na posição do mouse
      photoRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale3d(1.02, 1.02, 1.02)`
    }
    
    // Adicionar apenas em dispositivos desktop
    const isMobile = window.innerWidth <= 768
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    
    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])
  
  const handleScrollClick = () => {
    const nextSection = document.getElementById('about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  // Círculos de fundo com propriedades de animação
  const backgroundCircles = [
    { size: '300px', top: '20%', left: '10%', opacity: 0.1, delay: 0.3, duration: 35 },
    { size: '200px', top: '60%', left: '80%', opacity: 0.1, delay: 0.5, duration: 40 },
    { size: '150px', top: '10%', left: '70%', opacity: 0.1, delay: 0.2, duration: 30 },
    { size: '100px', top: '30%', left: '60%', opacity: 0.05, delay: 0.7, duration: 25 },
    { size: '80px', top: '70%', left: '20%', opacity: 0.05, delay: 0.4, duration: 20 },
    { size: '50px', top: '40%', left: '30%', opacity: 0.05, delay: 0.6, duration: 15 },
  ]
  
  // Sequenciação das animações
  const staggerDelay = 0.15
  
  const titleAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: staggerDelay * 1,
      }
    }
  }
  
  const nameAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: staggerDelay * 2,
      }
    }
  }
  
  const highlightAnimation = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        delay: staggerDelay * 3,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
  
  const subtitleAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: staggerDelay * 4,
      }
    }
  }
  
  const descriptionAnimation = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: staggerDelay * 5,
      }
    }
  }
  
  const buttonsAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: staggerDelay * 6,
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }
  
  const buttonItemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }
  
  const photoAnimation = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: staggerDelay * 2,
        duration: 0.8
      }
    }
  }
  
  const socialAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: staggerDelay * 7,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }
  
  const socialItemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20
      }
    }
  }
  
  const scrollAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: staggerDelay * 9,
        duration: 0.5
      }
    }
  }
  
  // Animação para os círculos de fundo
  const circleAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: { delay: number }) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: custom.delay,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  }

  return (
    <HeroSection id="home" ref={containerRef}>
      <HeroGradientBackground 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Círculos de fundo animados */}
      {backgroundCircles.map((circle, index) => (
        <BackgroundCircle
          key={index}
          size={circle.size}
          top={circle.top}
          left={circle.left}
          opacity={circle.opacity}
          custom={{ delay: circle.delay }}
          variants={circleAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          drag
          dragConstraints={containerRef}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
        />
      ))}
      
      <HeroContainer>
        <HeroContent
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Title
            variants={titleAnimation}
          >
            Olá, sou{" "}
            <NameHighlight
              variants={nameAnimation}
            >
              Rodrigo Cinelli
              <motion.span
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  height: 8,
                  background: "rgba(155, 106, 235, 0.7)",
                  borderRadius: 4,
                  zIndex: -1
                }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: staggerDelay * 3, duration: 0.6, ease: "easeOut" }}
              />
            </NameHighlight>
          </Title>
          
          <Subtitle
            variants={subtitleAnimation}
          >
            Desenvolvedor Full-Stack
          </Subtitle>
          
          <Description
            variants={descriptionAnimation}
          >
            Bem vindo ao meu portfólio! Agora pegue um café e venha curtir um pouco do meu trabalho.
          </Description>
          
          <ButtonsContainer
            variants={buttonsAnimation}
          >
            <PrimaryButton
              href="#projects"
              variants={buttonItemAnimation}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'transparent', 
                color: 'white',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Projetos
            </PrimaryButton>
            
            <SecondaryButton
              href="#contact"
              variants={buttonItemAnimation}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Entre em Contato
            </SecondaryButton>
            
            <TertiaryButton
              href="/assets/documents/cv_rodrigo_cinelli.pdf"
              download="CV_Rodrigo_Cinelli.pdf"
              variants={buttonItemAnimation}
              whileHover={{ 
                scale: 1.05,
                borderStyle: 'solid',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download Currículo"
            >
              <FaFileDownload style={{ fontSize: '0.9rem' }} /> Download CV
            </TertiaryButton>
          </ButtonsContainer>
          
          <SocialLinks
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={socialAnimation}
            className="social-links-mobile"
          >
            <SocialLink 
              href="https://github.com/RodCinelli" 
              target="_blank"
              rel="noopener noreferrer"
              variants={socialItemAnimation}
              whileHover={{ 
                scale: 1.2,
                y: -5,
                filter: 'drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.5))',
                transition: { duration: 0.2 }
              }}
              aria-label="GitHub"
            >
              <FaGithub />
            </SocialLink>
            
            <SocialLink 
              href="https://www.linkedin.com/in/rodrigo-cinelli" 
              target="_blank"
              rel="noopener noreferrer"
              variants={socialItemAnimation}
              whileHover={{ 
                scale: 1.2,
                y: -5,
                filter: 'drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.5))',
                transition: { duration: 0.2 }
              }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </HeroContent>
        
        <PhotoContainer
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={photoAnimation}
        >
          <PhotoFrame
            ref={photoRef}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
          >
            <Image 
              src="/assets/vectors/profile.jpg"
              alt="Rodrigo Cinelli - Desenvolvedor Full-Stack"
              fill
              style={{ 
                objectFit: 'cover',
                borderRadius: '12px'
              }}
              sizes="(max-width: 768px) 300px, 380px"
              priority
            />
          </PhotoFrame>
        </PhotoContainer>
      </HeroContainer>
      
      <ScrollIndicator
        onClick={handleScrollClick}
        variants={scrollAnimation}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="scroll-indicator"
      >
        <motion.span
          style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}
          className="scroll-text"
        >
          Rolar para baixo
        </motion.span>
        <motion.div
          animate={{ 
            y: [0, 8, 0], 
            opacity: [0.7, 1, 0.7] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.5,
            ease: "easeInOut" 
          }}
          className="scroll-arrow"
        >
          <FaArrowDown />
        </motion.div>
      </ScrollIndicator>
    </HeroSection>
  )
}
