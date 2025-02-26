'use client'

import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaCode, FaAward } from 'react-icons/fa'

interface ExperienceItem {
  id: number
  title: string
  company: string
  period: string
  description: string
  type: 'work' | 'education' | 'project' | 'award'
}

const ExperienceSection = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'linear-gradient(270deg, rgba(75, 0, 130, 0.1) 0%, #F8F8FF 100%)' 
      : 'linear-gradient(270deg, rgba(75, 0, 130, 0.25) 0%, #151515 100%)'
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
  border-bottom: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.1)' 
      : 'rgba(255, 255, 255, 0.05)'
  };
  
  /* Forma geométrica decorativa no topo */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 5%;
    width: 40%;
    height: 20%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'linear-gradient(135deg, rgba(75, 0, 130, 0.03) 0%, rgba(255, 255, 255, 0) 60%)'
        : 'linear-gradient(135deg, rgba(75, 0, 130, 0.15) 0%, rgba(0, 0, 0, 0) 60%)'
    };
    transform: skewY(-5deg);
    pointer-events: none;
    z-index: 1;
  }
  
  /* Forma geométrica decorativa no fundo */
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 5%;
    width: 40%;
    height: 20%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'linear-gradient(135deg, rgba(75, 0, 130, 0.03) 0%, rgba(255, 255, 255, 0) 60%)'
        : 'linear-gradient(135deg, rgba(75, 0, 130, 0.15) 0%, rgba(0, 0, 0, 0) 60%)'
    };
    transform: skewY(5deg);
    pointer-events: none;
    z-index: 1;
  }
  
  /* Círculo decorativo superior direito usando uma classe dentro da seção */
  &::before, &::after {
    box-shadow: 0 0 50px rgba(75, 0, 130, 0.05);
  }
  
  /* Usando um pseudoelemento adicional para criar o círculo decorativo */
  &:hover::before {
    box-shadow: 0 0 80px rgba(75, 0, 130, 0.1);
    transition: box-shadow 0.5s ease;
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

const TimelineContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'linear-gradient(to bottom, rgba(75, 0, 130, 0.1), rgba(138, 43, 226, 0.3), rgba(75, 0, 130, 0.1))'
        : 'linear-gradient(to bottom, rgba(75, 0, 130, 0.2), rgba(138, 43, 226, 0.4), rgba(75, 0, 130, 0.2))'
    };
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(75, 0, 130, 0.1);
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 22px;
    }
  }
`

const TimelineItem = styled(motion.div)<{ isEven: boolean }>`
  display: flex;
  justify-content: ${({ isEven }) => isEven ? 'flex-start' : 'flex-end'};
  padding-bottom: 4rem;
  width: 100%;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-end;
    padding-left: 40px;
  }
  
  &:last-child {
    padding-bottom: 0;
  }
`

const TimelineContent = styled(motion.div)`
  width: calc(50% - 40px);
  position: relative;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? theme.colors.card
      : 'rgba(30, 30, 30, 0.8)'
  };
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? '0 8px 20px rgba(0, 0, 0, 0.1)'
      : '0 8px 25px rgba(75, 0, 130, 0.15)'
  };
  border: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? '1px solid rgba(0, 0, 0, 0.05)'
      : 'none'
  };
  backdrop-filter: blur(5px);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc(100% - 40px);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 24px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)'
        : 'linear-gradient(135deg, #333333 0%, #222222 100%)'
    };
    border: 3px solid ${({ theme }) => theme.colors.primary};
    z-index: 1;
    box-shadow: 0 0 10px rgba(75, 0, 130, 0.2);
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: none; /* Ocultar o círculo em modo responsivo */
    }
  }
`

const TimelineContentLeft = styled(TimelineContent)`
  &:before {
    right: -51px;
  }
`

const TimelineContentRight = styled(TimelineContent)`
  &:before {
    left: -51px;
  }
`

const TimelineIcon = styled.div<{ type: 'work' | 'education' | 'project' | 'award' }>`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  background: ${({ type, theme }) => {
    switch (type) {
      case 'work':
        return 'linear-gradient(135deg, #4B0082 0%, #8A2BE2 100%)'; // Indigo to BlueViolet gradient
      case 'education':
        return 'linear-gradient(135deg, #6A5ACD 0%, #9370DB 100%)'; // SlateBlue to MediumPurple gradient
      case 'project':
        return 'linear-gradient(135deg, #9370DB 0%, #BA55D3 100%)'; // MediumPurple to MediumOrchid gradient
      case 'award':
        return 'linear-gradient(135deg, #7B68EE 0%, #9932CC 100%)'; // MediumSlateBlue to DarkOrchid gradient
      default:
        return theme.colors.primary;
    }
  }};
  box-shadow: 0 10px 20px rgba(75, 0, 130, 0.2);
  transition: all 0.3s ease;
  transform: scale(1);
  z-index: 10;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 25px rgba(75, 0, 130, 0.3);
  }
  
  /* Efeito de brilho sutil */
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: inherit;
    filter: blur(10px);
    opacity: 0.5;
    border-radius: 50%;
    z-index: -1;
  }
  
  svg {
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 50px;
    height: 50px;
    font-size: 1.4rem;
  }
`

const TimelineIconLeft = styled(TimelineIcon)`
  right: -85px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: auto;
    left: -85px; /* Ajustado para alinhar com a linha do timeline em 22px */
  }
`

const TimelineIconRight = styled(TimelineIcon)`
  left: -85px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: -85px; /* Ajustado para alinhar com a linha do timeline em 22px */
  }
`

const ItemTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const ItemCompany = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
`

const ItemPeriod = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  display: block;
  margin-bottom: 1rem;
`

const ItemDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

// Elemento decorativo adicional
const DecorativeCircle = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
  width: 200px;
  height: 200px;
  border: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? 'rgba(75, 0, 130, 0.05)'
      : 'rgba(75, 0, 130, 0.1)'
  };
  border-radius: 50%;
  opacity: 0.5;
  pointer-events: none;
`

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Desenvolvedor Full-stack Freelancer",
      company: "Restaurante Recanto das Massas",
      period: "Outubro de 2024 - Novembro de 2024",
      description: "Desenvolvi uma solução completa de automação de atendimento ao cliente via WhatsApp utilizando inteligência artificial. O sistema gerencia todo o fluxo de atendimento, desde a apresentação inicial do cardápio até a finalização do pedido. Implementei a arquitetura backend com Node.js e JavaScript, integrando a API oficial da OpenAI (ChatGPT) com fine-tuning da inteligência artificial personalizada para as necessidades específicas do restaurante. Configurei um sistema de geração de relatórios em formato de planilhas, possibilitando análises de dados para desenvolvimento de estratégias comerciais eficazes. Utilizei WhatsApp-Web.js para automação da comunicação, SQLite3 para persistência de dados dos clientes, Node-Cron para agendamento de tarefas e Qrcode-Terminal para geração de QR codes no terminal, possibilitando a integração automática com a conta comercial do WhatsApp. A solução foi hospedada em uma VPS com data center em Nova York, garantindo disponibilidade 24/7. O projeto reduziu os custos operacionais em até 60%, permitindo que a equipe focasse em atividades estratégicas enquanto o sistema proporcionava uma experiência de atendimento personalizada e eficiente aos clientes, resultando em maior satisfação e aumento nas vendas.",
      type: "work"
    },
    {
      id: 2,
      title: "Superior em Análise e Desenvolvimento de Sistemas",
      company: "Uniamérica",
      period: "Fevereiro de 2025 - Agosto de 2027",
      description: "Formação abrangente em desenvolvimento de software e soluções computacionais. Estou adquirindo competências em linguagens de programação populares como Python, JavaScript e Java, além de frameworks modernos para desenvolvimento web e mobile. O curso está me proporcionando conhecimentos em bancos de dados, arquitetura de software, cloud computing e cibersegurança. Estou desenvolvendo habilidades em metodologias ágeis (Scrum, Kanban), gerenciamento de projetos e integração de sistemas. O programa também aborda fundamentos de IA e machine learning, com foco no desenvolvimento de soluções tecnológicas inovadoras. As disciplinas práticas estão me capacitando em análise de requisitos, UX/UI, e implementação de sistemas escaláveis, com ênfase em pensamento crítico, trabalho em equipe e adaptabilidade para os desafios do mercado atual.",
      type: "education"
    },
    {
      id: 3,
      title: "Desenvolvedor Full-Stack Python",
      company: "EBAC - Escola Britânica de Artes Criativas e Tecnologia",
      period: "Abril de 2023 - Fevereiro de 2025",
      description: "Formação intensiva e completa em ecossistema Python e tecnologias web modernas. Dominei Django e Django REST Framework para desenvolvimento de APIs e aplicações backend robustas. Aprofundei conhecimentos em frontend com React.js, React Native, Next.js e Vue.js, além de JavaScript/TypeScript avançado. Trabalhei com bancos de dados relacionais (PostgreSQL em diversas aplicações, MySQL, SQL) e não-relacionais (MongoDB), implementando soluções full-stack com Docker. Desenvolvi projetos com foco em UX/UI, aplicando princípios de design centrado no usuário e testes de usabilidade. Implementei pipelines de CI/CD para automação de testes e deploy contínuo. Utilizei Gulp.js para automação de tarefas, Git/GitHub para versionamento, e técnicas de PWA para experiências offline. Adquiri habilidades em Linux, utilizando-o de forma abrangente no backend, e Tailwind CSS para estilização eficiente. Experiência prática com arquitetura de aplicações, aprendizado de máquina, modelos SaaS e estratégias de otimização de performance.",
      type: "education"
    },
    {
      id: 4,
      title: "Técnico em TI e Desenvolvimento de Software",
      company: "Senac RJ",
      period: "Agosto de 2022 - Fevereiro de 2024",
      description: "Formação técnica abrangente com ênfase em desenvolvimento web full-stack e infraestrutura de TI. Aprendi linguagens como JavaScript, TypeScript, PHP, Java e frameworks modernos como Angular e Ionic. Adquiri forte base em bancos de dados (MySQL, SQL), estruturas de dados e controle de versão com GitHub. Trabalhei com sistemas operacionais Linux (incluindo Red Hat) e desenvolvi competências em redes de computadores. Participei de projetos práticos aplicando metodologias de qualidade de software, desenvolvimento de aplicações responsivas com HTML5, CSS e Bootstrap, além de soluções mobile e integração com Firebase.",
      type: "education"
    }
  ]
  
  const getIcon = (type: 'work' | 'education' | 'project' | 'award') => {
    switch (type) {
      case 'work':
        return <FaBriefcase style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />;
      case 'education':
        return <FaGraduationCap style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />;
      case 'project':
        return <FaCode style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />;
      case 'award':
        return <FaAward style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />;
      default:
        return <FaBriefcase style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />;
    }
  }
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  }
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <ExperienceSection id="experience" ref={ref}>
      <DecorativeCircle />
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <span>Experiência</span> <span style={{ color: '#8A2BE2' }}>e Conhecimento</span>
      </SectionTitle>
      
      <TimelineContainer>
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          const ContentComponent = isEven ? TimelineContentLeft : TimelineContentRight;
          const IconComponent = isEven ? TimelineIconLeft : TimelineIconRight;
          
          return (
            <TimelineItem 
              key={exp.id} 
              isEven={isEven}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={isInView 
                ? { opacity: 1, x: 0 } 
                : { opacity: 0, x: isEven ? -50 : 50 }
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ContentComponent
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <IconComponent type={exp.type}>
                  {getIcon(exp.type)}
                </IconComponent>
                <ItemTitle>{exp.title}</ItemTitle>
                <ItemCompany>{exp.company}</ItemCompany>
                <ItemPeriod>{exp.period}</ItemPeriod>
                <ItemDescription>{exp.description}</ItemDescription>
              </ContentComponent>
            </TimelineItem>
          )
        })}
      </TimelineContainer>
    </ExperienceSection>
  )
} 