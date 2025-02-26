'use client'

import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { 
  FaCode, 
  FaServer, 
  FaMobileAlt, 
  FaDatabase, 
  FaBrain, 
  FaJs, 
  FaReact, 
  FaVuejs, 
  FaNodeJs, 
  FaPython, 
  FaCloudUploadAlt, 
  FaDocker, 
  FaGitAlt,
  FaAngular,
  FaPlay
} from 'react-icons/fa'
import { SiDjango, SiTypescript } from 'react-icons/si'

const AboutSection = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'linear-gradient(45deg, rgba(248, 248, 255, 1) 0%, rgba(75, 0, 130, 0.08) 100%)' 
      : 'linear-gradient(45deg, #151515 0%, rgba(75, 0, 130, 0.25) 100%)'
  };
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.1)' 
      : 'rgba(255, 255, 255, 0.05)'
  };
  border-image: linear-gradient(to right, transparent, rgba(75, 0, 130, 0.2), transparent) 1;
  
  /* Padrão de fundo sutil - triângulos abstratos */
  background-image: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234b0082' fill-opacity='0.02'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  };
  
  &:before {
    content: '';
    position: absolute;
    top: 10%;
    left: -10%;
    width: 30%;
    height: 45%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'radial-gradient(circle, rgba(75, 0, 130, 0.04) 0%, rgba(255, 255, 255, 0) 70%)'
        : 'radial-gradient(circle, rgba(75, 0, 130, 0.2) 0%, rgba(0, 0, 0, 0) 70%)'
    };
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    filter: blur(50px);
    opacity: 0.8;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 15%;
    right: -5%;
    width: 25%;
    height: 40%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'radial-gradient(circle, rgba(75, 0, 130, 0.03) 0%, rgba(255, 255, 255, 0) 70%)'
        : 'radial-gradient(circle, rgba(75, 0, 130, 0.15) 0%, rgba(0, 0, 0, 0) 70%)'
    };
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    filter: blur(40px);
    opacity: 0.9;
  }
  
  /* Círculos decorativos adicionais */
  &:before, &:after {
    box-shadow: 0 0 80px rgba(75, 0, 130, 0.05);
  }
`

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 5rem;
  text-align: center;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  z-index: 2;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    transform: translateX(-50%);
  }
`

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const ImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  aspect-ratio: 16 / 9;
  
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.1;
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.1;
    z-index: 1;
  }
  
  video, img, iframe {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    position: relative;
    z-index: 2;
  }
  
  iframe {
    border: none;
  }
`

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: ${({ theme }) => theme.colors.secondary};
  }
  
  svg {
    color: white;
    font-size: 2rem;
    margin-left: 6px; /* Slight adjustment to center the play icon visually */
  }
`

const AboutTextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  height: 100%;
`

const CompetenciesSection = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`

const CompetenciesTitle = styled(motion.h3)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 5rem;
  text-align: center;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  z-index: 2;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    transform: translateX(-50%);
  }
`

const CompetenciesContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.8rem;
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 0.7rem;
  }
`

const CompetencyItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
    gap: 0.6rem;
  }
`

const CompetencyIcon = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  flex-shrink: 0;
`

const CompetencyName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.85rem;
  }
`

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

// Adicionar elementos decorativos adicionais que serão inseridos no componente
const DecorativeElement = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? 'rgba(75, 0, 130, 0.04)'
      : 'rgba(75, 0, 130, 0.08)'
  };
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  top: 25%;
  right: 8%;
  transform: rotate(25deg);
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
`

const DecorativeStripe = styled.div`
  position: absolute;
  width: 15px;
  height: 40%;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? 'linear-gradient(to bottom, rgba(75, 0, 130, 0.01), rgba(75, 0, 130, 0.05), rgba(75, 0, 130, 0.01))'
      : 'linear-gradient(to bottom, rgba(75, 0, 130, 0.03), rgba(75, 0, 130, 0.1), rgba(75, 0, 130, 0.03))'
  };
  bottom: 10%;
  left: 15%;
  transform: rotate(20deg);
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
  border-radius: 10px;
`

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  // =============================================
  // IMPORTANTE: Substitua "SEU_VIDEO_ID" pelo ID real do seu vídeo no YouTube
  // Exemplo: se a URL do vídeo for https://www.youtube.com/watch?v=abc123xyz
  // Você deve usar: const youtubeVideoId = "abc123xyz"
  // =============================================
  const youtubeVideoId = "jJxkYRlcbYk"

  const competencies = [
    { name: 'HTML', icon: <FaCode />, color: '#E34F26' },
    { name: 'CSS', icon: <FaCode />, color: '#1572B6' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'React.js', icon: <FaReact />, color: '#61DAFB' },
    { name: 'Next.js', icon: <FaReact />, color: '#000000' },
    { name: 'Vue.js', icon: <FaVuejs />, color: '#4FC08D' },
    { name: 'Angular', icon: <FaAngular />, color: '#DD0031' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
    { name: 'Python', icon: <FaPython />, color: '#306998' },
    { name: 'Django', icon: <SiDjango />, color: '#092E20' },
    { name: 'Flask', icon: <FaCode />, color: '#000000' },
    { name: 'PHP', icon: <FaCode />, color: '#777BB3' },
    { name: 'Rest APIs', icon: <FaCloudUploadAlt />, color: '#FF5733' },
    { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
    { name: 'MySQL', icon: <FaDatabase />, color: '#4479A1' },
    { name: 'PostgreSQL', icon: <FaDatabase />, color: '#336791' },
    { name: 'SQL', icon: <FaDatabase />, color: '#336791' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
    { name: 'IA / Machine Learning', icon: <FaBrain />, color: '#9C27B0' }
  ]

  return (
    <AboutSection id="about" ref={ref}>
      <DecorativeElement />
      <DecorativeStripe />
      
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
      >
        <span>Sobre</span> <span style={{ color: '#8A2BE2' }}>Mim</span>
      </SectionTitle>

      <AboutContent>
        <MainContentGrid>
          <ImageContainer
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <iframe 
              src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
              title="Apresentação Rodrigo Cinelli"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </ImageContainer>

          <AboutTextContent
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AboutText>
              Desenvolvedor Full-Stack Python formado pela EBAC – Escola Britânica de Artes Criativas e Tecnologia,
              graduado como Técnico em Ti e Desenvolvimento de Software pela instituição de ensino Senac RJ e
              atualmente concluindo a graduação em Análise e Desenvolvimento de Sistemas na instituição de ensino
              Uniamérica. Profissional com perfil de adaptabilidade, criatividade e resolução de problemas. Possuo
              experiências em desenvolvimento de aplicações a nível Full-Stack, tratamento em lidar com inteligências
              artificiais e automações.
            </AboutText>
          </AboutTextContent>
        </MainContentGrid>

        <CompetenciesSection
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <CompetenciesTitle>
            <span>PRINCIPAIS</span> <span style={{ color: '#8A2BE2' }}>COMPETÊNCIAS</span>
          </CompetenciesTitle>

          <CompetenciesContainer
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {competencies.map((skill, index) => (
              <CompetencyItem 
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05, y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
              >
                <CompetencyIcon color={skill.color}>
                  {skill.icon}
                </CompetencyIcon>
                <CompetencyName>{skill.name}</CompetencyName>
              </CompetencyItem>
            ))}
          </CompetenciesContainer>
        </CompetenciesSection>
      </AboutContent>
    </AboutSection>
  )
}
