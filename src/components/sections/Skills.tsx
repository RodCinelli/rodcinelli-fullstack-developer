'use client'

import { useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { FaPython, FaJs, FaNodeJs, FaReact, FaDocker, FaGitAlt, FaBrain } from 'react-icons/fa'
import { SiTypescript, SiDjango, SiPostgresql } from 'react-icons/si'

const SkillsSection = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'radial-gradient(circle at top right, rgba(75, 0, 130, 0.1), #F8F8FF 70%)' 
      : 'radial-gradient(circle at top right, rgba(75, 0, 130, 0.3), #151515 70%)'
  };
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.1)' 
      : 'rgba(255, 255, 255, 0.05)'
  };
  border-bottom: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.1)' 
      : 'rgba(255, 255, 255, 0.05)'
  };
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 35%;
    height: 50%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'radial-gradient(circle, rgba(75, 0, 130, 0.05) 0%, rgba(255, 255, 255, 0) 70%)'
        : 'radial-gradient(circle, rgba(75, 0, 130, 0.15) 0%, rgba(0, 0, 0, 0) 70%)'
    };
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -5%;
    width: 25%;
    height: 40%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'radial-gradient(circle, rgba(75, 0, 130, 0.05) 0%, rgba(255, 255, 255, 0) 70%)'
        : 'radial-gradient(circle, rgba(75, 0, 130, 0.15) 0%, rgba(0, 0, 0, 0) 70%)'
    };
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
  }

  /* Elementos decorativos adicionais */
  &:before, &:after {
    box-shadow: 0 0 100px rgba(75, 0, 130, 0.08);
  }

  /* Padrão de pontos decorativos */
  background-image: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? 'radial-gradient(rgba(75, 0, 130, 0.02) 1px, transparent 1px)'
      : 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)'
  };
  background-size: 20px 20px;
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 2;
  
  /* Centraliza o último item quando está sozinho na linha */
  & > *:last-child:nth-child(3n-2) {
    grid-column: 2;
  }
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    
    /* Reseta a centralização em telas médias */
    & > *:last-child:nth-child(3n-2) {
      grid-column: auto;
    }
    
    /* Centraliza o último item em telas médias quando está sozinho na linha */
    & > *:last-child:nth-child(odd) {
      grid-column: 1 / span 2;
      justify-self: center;
      max-width: 350px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    
    & > *:last-child:nth-child(odd) {
      grid-column: 1 / span 2;
      justify-self: center;
      max-width: 330px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    
    /* Remove a centralização em telas móveis */
    & > *:last-child:nth-child(odd),
    & > *:last-child:nth-child(3n-2) {
      grid-column: auto;
      justify-self: auto;
      max-width: none;
    }
  }
`

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(30, 30, 30, 0.8)'
  };
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(75, 0, 130, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  height: 100%;
  backdrop-filter: blur(5px);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.color || '#9370DB'};
  }
`

const SkillIconWrapper = styled(motion.div)`
  width: 65px;
  height: 65px;
  border-radius: 20px;
  background: ${props => props.color || '#9370DB'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.2rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: ${props => props.color || '#9370DB'};
    opacity: 0.2;
    border-radius: 24px;
    z-index: -1;
  }
`

const SkillName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0.4rem 0;
  color: ${({ theme }) => theme.colors.text};
`

const SkillDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: 1.2rem;
  flex-grow: 1;
`

const SkillLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.8rem;
`

const LevelDot = styled.div<{ active: boolean; color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? props.color : 'rgba(0, 0, 0, 0.1)'};
  margin: 0 4px;
  transition: all 0.3s ease;
`

const PercentageText = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.color || '#9370DB'};
  margin-top: 0.8rem;
  display: block;
`

interface SkillCardProps {
  name: string;
  percentage: number;
  icon: JSX.Element;
  color: string;
  description: string;
  index: number;
  inView: boolean;
}

const skillDescriptions = {
  'Python': 'Desenvolvimento de aplicações e automações com Python.',
  'Inteligência Artificial': 'Modelos ML/NLP e integração com APIs de IA.',
  'JavaScript': 'Desenvolvimento front/back-end com JS moderno.',
  'TypeScript': 'Aplicações robustas com tipagem estática.',
  'Node.js': 'APIs RESTful e aplicações servidor.',
  'React': 'Interfaces interativas com React e Next.js.',
  'Django': 'Aplicações web full-stack com Django.',
  'Docker': 'Containerização para deployment escalável.',
  'Git': 'Controle de versão e colaboração em equipe.',
  'PostgreSQL': 'Banco de dados relacional para aplicações robustas e escaláveis.'
}

const SkillCardComponent = ({ name, percentage, icon, color, description, index, inView }: SkillCardProps) => {
  const dotCount = 5;
  const activeDots = Math.round(percentage / (100 / dotCount));

  return (
    <SkillCard
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10, 
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
      }}
      color={color}
    >
      <SkillIconWrapper 
        color={color}
        whileHover={{ 
          rotate: [0, -5, 5, -5, 0],
          scale: 1.1,
        }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </SkillIconWrapper>
      <SkillName>{name}</SkillName>
      <SkillDescription>{description}</SkillDescription>
      <SkillLevel>
        {[...Array(dotCount)].map((_, i) => (
          <LevelDot 
            key={i} 
            active={i < activeDots} 
            color={color}
            as={motion.div}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 + 0.3 }}
          />
        ))}
      </SkillLevel>
      <PercentageText 
        color={color}
        as={motion.span}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
      >
        {percentage}%
      </PercentageText>
    </SkillCard>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const skills = [
    { 
      name: 'Python', 
      percentage: 90, 
      icon: <FaPython />, 
      color: '#306998' 
    },
    { 
      name: 'Inteligência Artificial', 
      percentage: 95, 
      icon: <FaBrain />, 
      color: '#9C27B0' 
    },
    { 
      name: 'JavaScript', 
      percentage: 90, 
      icon: <FaJs />, 
      color: '#F7DF1E', 
    },
    { 
      name: 'TypeScript', 
      percentage: 90, 
      icon: <SiTypescript />, 
      color: '#3178C6' 
    },
    { 
      name: 'Node.js', 
      percentage: 90, 
      icon: <FaNodeJs />, 
      color: '#339933' 
    },
    { 
      name: 'React', 
      percentage: 90, 
      icon: <FaReact />, 
      color: '#61DAFB' 
    },
    { 
      name: 'Django', 
      percentage: 85, 
      icon: <SiDjango />, 
      color: '#092E20' 
    },
    { 
      name: 'Docker', 
      percentage: 85, 
      icon: <FaDocker />, 
      color: '#2496ED' 
    },
    { 
      name: 'PostgreSQL', 
      percentage: 90, 
      icon: <SiPostgresql />, 
      color: '#336791' 
    },
    { 
      name: 'Git', 
      percentage: 95, 
      icon: <FaGitAlt />, 
      color: '#F05032' 
    }
  ]

  return (
    <SkillsSection id="skills" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <span>Minhas</span> <span style={{ color: '#8A2BE2' }}>Skills</span>
      </SectionTitle>
      
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCardComponent 
            key={skill.name}
            name={skill.name}
            percentage={skill.percentage}
            icon={skill.icon}
            color={skill.color}
            description={skillDescriptions[skill.name as keyof typeof skillDescriptions] || ''}
            index={index}
            inView={isInView}
          />
        ))}
      </SkillsGrid>
    </SkillsSection>
  )
} 