'use client'

import { useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt, FaTimes, FaImages, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  gallery?: string[]
  tags: string[]
  githubUrl: string
  liveUrl: string
  features: string[]
}

const ProjectsSection = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'linear-gradient(180deg, #F8F8FF 0%, rgba(75, 0, 130, 0.12) 100%)' 
      : 'linear-gradient(180deg, #151515 0%, rgba(75, 0, 130, 0.28) 100%)'
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
  border-image: linear-gradient(to right, rgba(75, 0, 130, 0.2), transparent, rgba(75, 0, 130, 0.2)) 1;
  
  /* Padrão de grade sutil */
  background-image: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? 'linear-gradient(rgba(75, 0, 130, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(75, 0, 130, 0.02) 1px, transparent 1px)'
      : 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)'
  };
  background-size: 20px 20px;
  
  &:before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 35%;
    height: 50%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'radial-gradient(circle, rgba(75, 0, 130, 0.07) 0%, rgba(255, 255, 255, 0) 70%)'
        : 'radial-gradient(circle, rgba(75, 0, 130, 0.25) 0%, rgba(0, 0, 0, 0) 70%)'
    };
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    filter: blur(40px);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 10%;
    left: -5%;
    width: 25%;
    height: 40%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'radial-gradient(circle, rgba(75, 0, 130, 0.05) 0%, rgba(255, 255, 255, 0) 70%)'
        : 'radial-gradient(circle, rgba(75, 0, 130, 0.2) 0%, rgba(0, 0, 0, 0) 70%)'
    };
    border-radius: 50%;
    pointer-events: none;
    filter: blur(30px);
    z-index: 1;
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
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors.primary} 0%, 
      rgba(138, 43, 226, 0.7) 100%
    );
    transform: translateX(-50%);
    border-radius: 2px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`

const SectionDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
    max-width: 600px;
    margin-bottom: 3rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.95rem;
    max-width: 100%;
    margin-bottom: 2.5rem;
    padding: 0 1rem;
  }
`

const ProjectsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
  position: relative;
  z-index: 2;
`

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.3rem;
  }
`

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(30, 30, 30, 0.8)'
  };
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(75, 0, 130, 0.15);
  height: 100%;
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 450px;
    margin: 0 auto;
    width: 100%;
  }
`

const ProjectImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 70%,
      ${({ theme }) => theme.colors.background === '#F8F8FF' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 30, 30, 0.8)'}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  ${ProjectCard}:hover &:before {
    opacity: 1;
  }
  
  img {
    transition: transform 0.5s ease !important;
  }
  
  ${ProjectCard}:hover img {
    transform: scale(1.05);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 180px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 220px;
  }
`

const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
  margin-bottom: 1.2rem;
  flex: 1;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`

const Tag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.background === '#F8F8FF' ? '#4B0082' : theme.colors.primary};
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? 'rgba(75, 0, 130, 0.15)'
      : 'rgba(147, 112, 219, 0.15)'
  };
  transition: all 0.3s ease;
`

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 200px;
  }
`

const ModalBody = styled.div`
  padding: 2rem;
`

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const ModalDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`

const FeaturesTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
`

const FeatureItem = styled(motion.li)`
  padding: 0.8rem 0;
  border-bottom: 1px solid ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.1)' 
      : 'rgba(255, 255, 255, 0.05)'
  };
  display: flex;
  align-items: center;
  
  &:before {
    content: '•';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    margin-right: 0.8rem;
  }
`

const ModalActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  
  /* Estilos apenas para desktop e tablets */
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.6rem;
    margin-top: 1.5rem;
  }
`

const TopButtonsGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  justify-content: center;
  margin: 0 auto;
  
  /* Estilos apenas para desktop */
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
    margin: 0;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.6rem;
    justify-content: flex-start;
  }
`

const ActionButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
    gap: 0.8rem;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    line-height: 1.4;
    
    span {
      display: flex;
      flex-direction: column !important;
    }
  }
`

const PrimaryButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: white !important;
  box-shadow: 0 4px 10px rgba(75, 0, 130, 0.2);
  transition: all 0.3s ease;
  
  &:hover, &:focus {
    color: white !important;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    text-align: center;
    justify-content: center;
    
    svg {
      font-size: 0.9em;
    }
  }
`

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary} !important;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(75, 0, 130, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 1.2rem;
  max-width: 220px;
  margin: 0 auto;
  
  /* Ajuste apenas para desktop */
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 0;
  }
  
  &:hover, &:focus {
    box-shadow: 0 8px 20px rgba(75, 0, 130, 0.25);
    transform: scale(1.05);
    color: ${({ theme }) => theme.colors.primary} !important;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 100%;
    font-size: 0.9rem;
    padding: 0.7rem 0.8rem;
    text-align: center;
    justify-content: center;
    
    svg {
      font-size: 0.9em;
    }
  }
`

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.9);
  }
`

const GalleryOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GalleryContent = styled(motion.div)`
  position: relative;
  width: 90%;
  height: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const GalleryImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 65%;
  }
`

const GalleryImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1000px;
  max-height: 600px;
  
  img {
    object-fit: contain !important;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-height: 400px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-height: 300px;
  }
`

const GalleryNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.85);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.9);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 35px;
    height: 35px;
  }
`

const PrevButton = styled(GalleryNavButton)`
  left: 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: 10px;
  }
`

const NextButton = styled(GalleryNavButton)`
  right: 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 10px;
  }
`

const GalleryCloseButton = styled(CloseButton)`
  top: 20px;
  right: 20px;
  z-index: 20;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.9);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 10px;
    right: 10px;
  }
`

const GalleryCounter = styled.div`
  position: absolute;
  bottom: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 10px;
    padding: 5px 10px;
    font-size: 0.8rem;
  }
`

const GalleryThumbnails = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  overflow-x: auto;
  padding: 10px 0;
  width: 100%;
  max-width: 1000px;
  
  &::-webkit-scrollbar {
    height: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 10px;
    gap: 5px;
  }
`

const GalleryThumbnail = styled(motion.div)<{ isActive: boolean }>`
  position: relative;
  width: 80px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.isActive ? '#8A2BE2' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 70px;
    height: 50px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 60px;
    height: 40px;
  }
`

const TertiaryButton = styled(ActionButton)`
  background: #E83E8C; /* Cor rosa (hot pink) */
  color: white !important;
  font-size: 1rem;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 10px rgba(232, 62, 140, 0.2);
  transition: all 0.3s ease;
  border-radius: 50px;
  font-weight: 600;
  border: none !important;
  outline: none !important;
  
  &:hover, &:focus {
    box-shadow: 0 8px 20px rgba(232, 62, 140, 0.35);
    transform: scale(1.05);
    border: none !important;
    outline: none !important;
    color: white !important;
  }
  
  svg {
    font-size: 1em;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
    letter-spacing: 0.3px;
    text-align: center;
    justify-content: center;
    
    svg {
      font-size: 0.9em;
    }
  }
`

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showGallery, setShowGallery] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Automação Recanto das Massas",
      description: "Bot de atendimento inteligente para restaurante utilizando integração com WhatsApp e API da OpenAI.",
      longDescription: "Esta automação foi desenvolvida exclusivamente para gerenciar de forma completa o atendimento ao cliente do restaurante, cobrindo todas as etapas, desde a apresentação inicial e a exibição do cardápio até a finalização do pedido. O bot utiliza a API oficial da OpenAI (ChatGPT) e é totalmente customizável, permitindo que o contratante defina o nível de inteligência artificial a ser utilizado. Além disso, o bot recebe um Fine-Tuning (treinamento específico) e humanizado para lidar com todas as necessidades do negócio, garantindo uma interação personalizada e eficiente.\n\nO bot também é capaz de enviar relatórios em formatos como planilhas, facilitando o controle e a análise de dados para o negócio, fornecendo informações valiosas para desenvolvimento de estratégias eficazes. Esta solução reduz o custo operacional em até 60%, permitindo que a equipe foque no que realmente importa enquanto a interação com os clientes é realizada pela automação.\n\nDesenvolvido em JavaScript com Node.js para o backend, utiliza bibliotecas como Whatsapp-Web.js para integração com WhatsApp, SQLite3 para armazenamento de dados dos clientes, Node-Cron para agendamento de tarefas e Qrcode-Terminal para geração de QR Codes. O bot foi hospedado em uma VPS com data center em Nova York, garantindo disponibilidade 24 horas por dia.",
      image: "/assets/projects/projeto1/automação_recanto_das_massas.jpg",
      gallery: [
        "/assets/projects/projeto1/automação_recanto_das_massas.jpg",
        "/assets/projects/projeto1/codigo_recanto.jpg",
        "/assets/projects/projeto1/qrcode_recanto.jpg"
      ],
      tags: ["JavaScript", "Node.js", "OpenAI API", "WhatsApp Web.js", "SQLite3"],
      githubUrl: "https://github.com/RodCinelli/meu-bot-whatsapp",
      liveUrl: "https://www.youtube.com/watch?v=zl7RMxKg5jA",
      features: [
        "Integração completa com WhatsApp para atendimento automatizado",
        "Utilização da API da OpenAI com fine-tuning personalizado",
        "Sistema de apresentação do cardápio e finalização de pedidos",
        "Armazenamento de dados de clientes com SQLite3",
        "Agendamento de tarefas com Node-Cron",
        "Geração de relatórios em formato de planilhas",
        "Hospedagem em VPS com disponibilidade 24/7",
        "Redução de custos operacionais em até 60%"
      ]
    },
    {
      id: 2,
      title: "Gerenciador de Tarefas",
      description: "Aplicativo desktop leve e eficiente para organização de tarefas e envio de lembretes por e-mail, funcionando 100% offline.",
      longDescription: "O Gerenciador de Tarefas é um programa vitalício, super leve e que não requer conexão com a internet. Ele facilita a organização e o acompanhamento de tarefas, permitindo que o usuário adicione, visualize, edite, exclua e gerencie suas tarefas de forma eficiente. Além disso, ajuda a aumentar a produtividade e a evitar o esquecimento de compromissos importantes, enviando lembretes por e-mail aos usuários.\n\nO sistema apresenta uma interface intuitiva onde as tarefas são automaticamente coloridas de acordo com seu status: tarefas marcadas como 'importante' aparecem em vermelho, 'pendente' em laranja e 'concluída' em verde. O aplicativo também implementa funcionalidades práticas como auto-formatação de datas e horas, permitindo que o usuário digite apenas os números sem se preocupar com a formatação correta.\n\nO diferencial deste gerenciador é seu sistema proativo de lembretes, que notifica o usuário via e-mail quando tarefas estão se aproximando do prazo final ou já estão atrasadas. Ao iniciar o aplicativo, ele realiza uma varredura nas tarefas e envia notificações automáticas para tarefas que estão a um dia, uma hora ou menos do prazo definido. Cada e-mail inclui detalhes como nome da tarefa, prazo final e tipo de lembrete.\n\nDesenvolvido com Python e utilizando Tkinter para a interface gráfica, o aplicativo armazena todos os dados localmente com SQLite3, garantindo privacidade e funcionamento offline. O sistema também inclui um servidor SMTP configurável para o envio dos lembretes por e-mail.",
      image: "/assets/projects/projeto2/lista_tarefas.png",
      gallery: [
        "/assets/projects/projeto2/lista_tarefas.png",
        "/assets/projects/projeto2/editar_tarefas.png",
        "/assets/projects/projeto2/excluir_tarefas.png",
        "/assets/projects/projeto2/alerta1.png",
        "/assets/projects/projeto2/alerta2.png",
        "/assets/projects/projeto2/alerta3.png"
      ],
      tags: ["Python", "Tkinter", "SQLite3", "SMTP", "Desktop"],
      githubUrl: "https://github.com/RodCinelli/Executavel-Gerenciador-de-Tarefas",
      liveUrl: "https://www.vintepila.com.br/servicos/outros-servicos-programacao/eu-vou-criar-um-gerenciador-de-tarefas-personalizado/",
      features: [
        "Adicionar, visualizar, editar e excluir tarefas com interface colorida por status",
        "Pesquisa rápida por ID ou palavra-chave para localização de tarefas",
        "Auto-formatação de datas (29042024 → 29/04/2024) e horas (1700 → 17:00 PM)",
        "Sistema proativo de lembretes por e-mail (1 dia, 1 hora ou menos do prazo)",
        "Coloração automática de tarefas por status (importante, pendente, concluída)",
        "Funcionamento 100% offline com armazenamento local em SQLite",
        "Definição automática de horários padrão quando não especificados",
        "Reset completo do sistema com limpeza de tarefas e reinicialização de IDs"
      ]
    },
    {
      id: 3,
      title: "Twitter Clone",
      description: "Um clone moderno do Twitter desenvolvido com Django, oferecendo uma experiência de usuário fluida e interativa.",
      longDescription: "Este projeto é uma recriação moderna do Twitter que utiliza Django para o backend, oferecendo uma experiência de usuário fluida com atualizações em tempo real. O sistema inclui funcionalidades completas de autenticação (registro, login, recuperação de senha), um feed interativo com tweets limitados a 280 caracteres e carregamento automático de novos conteúdos.\n\nO clone implementa todas as interações sociais esperadas, como um sistema de likes com animação de coração, contadores em tempo real, e funcionalidade de follow para outros usuários. A busca em tempo real permite encontrar conteúdos de tweets com resultados que se atualizam dinamicamente conforme o usuário digita, tudo em uma interface responsiva.\n\nO design é meticulosamente criado para ser consistente com o Twitter original, incluindo sidebars interativas, menu hamburguer para dispositivos móveis, e animações suaves para transições. Trending Topics e notificações visuais enriquecem a experiência do usuário.\n\nNo frontend, o projeto utiliza HTML5 e CSS3 com marcação semântica e estilizações modernas, JavaScript ES6+ para manipulação dinâmica da interface, Bootstrap 5 para layouts responsivos, HTMX para interações assíncronas e Alpine.js para gerenciamento leve de estado. O backend é construído com Django, Django AllAuth para autenticação, e PostgreSQL como banco de dados, seguindo práticas modernas de desenvolvimento e implantação usando Docker e Poetry.",
      image: "/assets/projects/projeto3/login.png",
      gallery: [
        "/assets/projects/projeto3/login.png",
        "/assets/projects/projeto3/cadastro.png",
        "/assets/projects/projeto3/senha.png",
        "/assets/projects/projeto3/tela.png"
      ],
      tags: ["Django", "JavaScript", "HTMX", "Alpine.js", "Bootstrap 5", "PostgreSQL"],
      githubUrl: "https://github.com/RodCinelli/twitterclone",
      liveUrl: "https://twitterclone-production-1f3e.up.railway.app/login/?next=/",
      features: [
        "Sistema completo de autenticação com registro, login e recuperação de senha",
        "Feed interativo com tweets limitados a 280 caracteres e atualizações em tempo real",
        "Sistema de likes com animação de coração e contador em tempo real",
        "Funcionalidade de follow para outros usuários com notificações visuais",
        "Busca em tempo real com resultados atualizados dinamicamente",
        "Design responsivo com layout de três colunas para desktop e menu hamburguer para mobile",
        "Atualizações em tempo real usando HTMX sem necessidade de recarregar a página",
        "Containerização com Docker & Docker Compose para consistência entre ambientes"
      ]
    },
    {
      id: 4,
      title: "Agenda Local",
      description: "Aplicativo móvel para visualização e compra de ingressos para eventos na cidade do Rio de Janeiro com sistema de assinatura.",
      longDescription: "O Agenda Local é um aplicativo móvel intuitivo que apresenta aos usuários uma variedade de eventos que ocorrem na cidade do Rio de Janeiro. Desenvolvido como projeto final avaliativo da graduação Tecnólogo em T.I e Desenvolvimento de Software ministrado pelo Senac RJ - Barra da Tijuca, o aplicativo oferece uma experiência completa para os amantes de eventos da cidade maravilhosa.\n\nO aplicativo foi desenvolvido empregando o framework Ionic e a plataforma Angular para a interface do usuário, garantindo uma experiência fluida e responsiva. O código foi escrito em TypeScript, uma linguagem de programação que estende JavaScript, adicionando tipagem estática e outros recursos que melhoram a qualidade e manutenibilidade do código. Para o back-end, foi utilizado o Firebase, uma plataforma da Google que oferece soluções como banco de dados em nuvem (Firestore) e autenticação de usuários, facilitando o gerenciamento de logins e o armazenamento de dados.\n\nUma das funcionalidades mais destacadas é o sistema de assinatura Premium, que permite aos usuários pagar uma mensalidade de R$ 30,00 para obter descontos vantajosos em diferentes tipos de eventos. Esta funcionalidade foi implementada com um sistema seguro de pagamento integrado, proporcionando uma experiência confiável ao usuário. Além disso, a implementação da autenticação com o Google garante um processo de login simplificado e seguro.\n\nO design do aplicativo foi pensado para proporcionar uma navegação intuitiva, permitindo que os usuários encontrem facilmente eventos de seu interesse e realizem todo o processo de compra de ingressos de forma simplificada, seja diretamente pelo aplicativo ou redirecionando para o site oficial do evento.",
      image: "/assets/projects/projeto4/tela_inicial.png",
      gallery: [
        "/assets/projects/projeto4/tela_inicial.png",
        "/assets/projects/projeto4/eventos.png",
        "/assets/projects/projeto4/checkout.png",
        "/assets/projects/projeto4/perfil.png",
        "/assets/projects/projeto4/pagamento1.png",
        "/assets/projects/projeto4/pagamento2.png"
      ],
      tags: ["Ionic", "Angular", "TypeScript", "Firebase", "Firestore"],
      githubUrl: "https://github.com/RodCinelli/Projeto-Final-Agenda-Local",
      liveUrl: "https://projeto-final-agenda-local.vercel.app/tabs/tab1",
      features: [
        "Visualização detalhada de eventos na cidade do Rio de Janeiro com filtros por categoria e data",
        "Sistema de compra de ingressos integrado diretamente no aplicativo",
        "Assinatura Premium mensal (R$ 30,00) com descontos exclusivos em eventos",
        "Autenticação via Google para uma experiência de login simplificada e segura",
        "Armazenamento de dados em tempo real com Firebase e Firestore Database",
        "Interface intuitiva desenvolvida com Ionic e Angular para uma experiência otimizada",
        "Redirecionamento para sites oficiais dos eventos para informações adicionais",
        "Design responsivo adaptado para diferentes tamanhos de tela e dispositivos móveis"
      ]
    },
    {
      id: 5,
      title: "eFood Plataforma de Delivery",
      description: "Aplicação web de delivery de comida desenvolvida em React com gerenciamento de carrinho e checkout completo.",
      longDescription: "O eFood é uma aplicação web desenvolvida como projeto final do curso de Front End da EBAC, demonstrando a aplicação prática de conceitos fundamentais do desenvolvimento front-end com React. Esta plataforma de delivery permite aos usuários visualizar restaurantes disponíveis, explorar seus cardápios, adicionar itens ao carrinho e finalizar pedidos com um processo completo de checkout.\n\nA aplicação foi construída com React e TypeScript, aproveitando o poder da tipagem estática para criar um código mais robusto e seguro. Para o gerenciamento de estado global da aplicação, foi implementado o Redux Toolkit, que simplifica o processo de atualização e acesso aos dados em toda a plataforma. A navegação entre as diferentes páginas da aplicação é gerenciada pelo React Router, enquanto a estilização é feita com Styled Components, permitindo escrever CSS diretamente nos componentes React.\n\nO gerenciamento de formulários foi implementado com Formik e Yup, proporcionando uma solução completa para criação e validação de formulários complexos, como os de entrega e pagamento. As requisições à API são gerenciadas pelo RTK Query, uma extensão do Redux Toolkit que simplifica o processo de busca, cache e atualização de dados.\n\nO projeto se integra com uma API fake que fornece dados sobre restaurantes, cardápios e permite o processamento de pedidos, simulando um ambiente real de e-commerce. A experiência do usuário foi uma prioridade no desenvolvimento, com foco em uma navegação intuitiva e um processo de checkout transparente e amigável.",
      image: "/assets/projects/projeto5/tela_inicial.png",
      gallery: [
        "/assets/projects/projeto5/tela_inicial.png",
        "/assets/projects/projeto5/restaurantes.png",
        "/assets/projects/projeto5/compras.png",
        "/assets/projects/projeto5/checkout.png",
        "/assets/projects/projeto5/entrega.png"
      ],
      tags: ["React", "TypeScript", "Redux Toolkit", "Styled Components", "RTK Query"],
      githubUrl: "https://github.com/RodCinelli/Projeto-Final-Ebac-Efood",
      liveUrl: "https://projeto-final-ebac-efood.vercel.app/",
      features: [
        "Listagem de restaurantes com filtragem por categorias culinárias",
        "Visualização detalhada de cardápios específicos de cada restaurante",
        "Carrinho de compras com gerenciamento completo de itens e quantidades",
        "Sistema de checkout com formulários para entrega e pagamento",
        "Validação de dados de formulário em tempo real com feedback visual",
        "Integração com API para busca de restaurantes e processamento de pedidos",
        "Interface responsiva adaptada para diferentes dispositivos e tamanhos de tela",
        "Armazenamento local de estado do carrinho para persistência entre sessões"
      ]
    },
    {
      id: 6,
      title: "Bella Cucina Restaurante",
      description: "Site responsivo para um restaurante italiano com seções de apresentação, cardápio interativo e formulário de contato.",
      longDescription: "Bella Cucina é um site para um restaurante italiano, desenvolvido como parte do Projeto 3 da EBAC (Escola Britânica de Artes Criativas & Tecnologia). O projeto consiste em um site responsivo para divulgar o restaurante, exibir seu cardápio e permitir contato com os clientes.\n\nO site apresenta diversas seções integradas que proporcionam uma experiência completa aos visitantes: uma página inicial com uma introdução ao restaurante utilizando um carrossel de imagens e textos descritivos que transmitem a essência do local; uma seção de especialidades que destaca os pratos e bebidas que são diferenciais da casa; um cardápio detalhado e interativo organizado por categorias (bebidas, massas, pizzas e sobremesas); e um formulário de contato para que os clientes possam enviar mensagens e fazer reservas.\n\nO design do site foi cuidadosamente pensado para se adaptar a diferentes tamanhos de tela, garantindo uma experiência consistente tanto em dispositivos desktop quanto em tablets e smartphones. A navegação foi otimizada com recursos como rolagem suave entre seções e um menu mobile que facilita o acesso em dispositivos menores.\n\nO projeto foi desenvolvido utilizando HTML5 para a estruturao do conteúdo, CSS3 para a estilização dos elementos, JavaScript para adicionar interatividade e funcionalidades dinâmicas, e Bootstrap 5 como framework principal para garantir responsividade e consistência visual. Também foram utilizados os Bootstrap Icons para adicionar elementos visuais elegantes à interface.",
      image: "/assets/projects/projeto6/tela_inicial.png",
      gallery: [
        "/assets/projects/projeto6/tela_inicial.png",
        "/assets/projects/projeto6/sobre.png",
        "/assets/projects/projeto6/especialidades.png",
        "/assets/projects/projeto6/cardapio.png",
        "/assets/projects/projeto6/fale_conosco.png"
      ],
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Responsivo"],
      githubUrl: "https://github.com/RodCinelli/Projeto-3-Ebac-Restaurante-Italiano",
      liveUrl: "https://projeto-3-ebac-restaurante-italiano.vercel.app/",
      features: [
        "Design responsivo adaptado para desktop, tablet e dispositivos móveis",
        "Navegação com rolagem suave entre as seções do site",
        "Carrossel de imagens destacando o ambiente do restaurante",
        "Cardápio interativo com sistema de abas para categorias de produtos",
        "Formulário de contato para envio de mensagens via email",
        "Menu mobile otimizado para navegação em dispositivos menores",
        "Layout estruturado com Bootstrap 5 para garantir consistência visual",
        "Interface elegante que transmite a identidade de um autêntico restaurante italiano"
      ]
    },
  ]
  
  const handleOpenModal = (project: Project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }
  
  const handleCloseModal = () => {
    setSelectedProject(null)
    setShowGallery(false)
    document.body.style.overflow = 'auto'
  }
  
  const handleOpenGallery = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex(0)
    setShowGallery(true)
  }
  
  const handleCloseGallery = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowGallery(false)
  }
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedProject?.gallery) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedProject.gallery!.length - 1 : prev - 1
      )
    }
  }
  
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedProject?.gallery) {
      setCurrentImageIndex(prev => 
        prev === selectedProject.gallery!.length - 1 ? 0 : prev + 1
      )
    }
  }
  
  const handleThumbnailClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex(index)
  }
  
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsImageExpanded(!isImageExpanded)
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
  
  const modalAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }
  
  const overlayAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    }
  }
  
  const featureAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <ProjectsSection id="projects" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        Meus <span style={{ color: '#8A2BE2' }}>Projetos</span>
      </SectionTitle>
      
      <SectionDescription
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Aqui estão alguns dos projetos que desenvolvi. Cada um representa um desafio único
        e demonstra minhas habilidades em diferentes tecnologias e soluções criativas.
      </SectionDescription>
      
      <ProjectsContainer>
        <ProjectsGrid
          variants={containerAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              variants={itemAnimation}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' 
              }}
              onClick={() => handleOpenModal(project)}
            >
              <ProjectImageWrapper>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </ProjectImageWrapper>
              
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <TagsContainer>
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContainer>
      
      <AnimatePresence>
        {selectedProject && (
          <ModalOverlay
            variants={overlayAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseModal}
          >
            <ModalContent
              variants={modalAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton 
                onClick={handleCloseModal}
                aria-label="Fechar"
              >
                <FaTimes />
              </CloseButton>
              
              <ModalHeader>
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </ModalHeader>
              
              <ModalBody>
                <ModalTitle>{selectedProject.title}</ModalTitle>
                <ModalDescription>{selectedProject.longDescription}</ModalDescription>
                
                <FeaturesTitle>Principais Funcionalidades</FeaturesTitle>
                <FeaturesList>
                  {selectedProject.features.map((feature, index) => (
                    <FeatureItem
                      key={index}
                      variants={featureAnimation}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      {feature}
                    </FeatureItem>
                  ))}
                </FeaturesList>
                
                <ModalActions>
                  <TopButtonsGroup>
                    {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                      <TertiaryButton
                        as="button"
                        onClick={handleOpenGallery}
                        aria-label="Ver Galeria"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 8px 20px rgba(232, 62, 140, 0.35)',
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{ 
                          gap: '0.8rem',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FaImages style={{ marginRight: '0' }} /> 
                        <span style={{ 
                          display: 'flex', 
                          flexDirection: 'row',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: 'white !important'
                        }}>
                          Ver Galeria
                        </span>
                      </TertiaryButton>
                    )}
                    
                    <PrimaryButton
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: '0 8px 20px rgba(75, 0, 130, 0.35)',
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{ 
                        gap: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <FaExternalLinkAlt style={{ marginRight: '0' }} /> 
                      <span style={{ 
                        display: 'flex', 
                        flexDirection: 'row',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: 'white !important'
                      }}>
                        Ver Projeto
                      </span>
                    </PrimaryButton>
                  </TopButtonsGroup>
                  
                  <SecondaryButton
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: '0 8px 20px rgba(75, 0, 130, 0.25)',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      gap: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4B0082'
                    }}
                  >
                    <FaGithub style={{ marginRight: '0' }} /> 
                    <span style={{ 
                      display: 'flex', 
                      flexDirection: 'row',
                      alignItems: 'center',
                      textAlign: 'center',
                      color: '#4B0082 !important'
                    }}>
                      Ver Código
                    </span>
                  </SecondaryButton>
                </ModalActions>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
        
        {selectedProject && showGallery && (
          <GalleryOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseGallery}
          >
            <GalleryContent
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <GalleryCloseButton 
                onClick={handleCloseGallery}
                aria-label="Fechar Galeria"
              >
                <FaTimes />
              </GalleryCloseButton>
              
              <GalleryImageContainer
                style={{
                  cursor: 'zoom-in',
                  height: isImageExpanded ? '95%' : '80%',
                  maxWidth: isImageExpanded ? '95%' : '100%',
                  transition: 'all 0.3s ease'
                }}
              >
                {!isImageExpanded && selectedProject.gallery && selectedProject.gallery.length > 1 && (
                  <>
                    <PrevButton 
                      onClick={handlePrevImage}
                      aria-label="Imagem Anterior"
                    >
                      <FaChevronLeft />
                    </PrevButton>
                    
                    <NextButton 
                      onClick={handleNextImage}
                      aria-label="Próxima Imagem"
                    >
                      <FaChevronRight />
                    </NextButton>
                  </>
                )}
                
                <GalleryImage
                  style={{ 
                    maxHeight: isImageExpanded ? '100%' : '600px',
                    cursor: isImageExpanded ? 'zoom-out' : 'zoom-in'
                  }}
                  onClick={handleImageClick}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%', height: '100%', position: 'relative' }}
                    >
                      <Image
                        src={selectedProject.gallery?.[currentImageIndex] || selectedProject.image}
                        alt={`${selectedProject.title} - Imagem ${currentImageIndex + 1}`}
                        fill
                        style={{ 
                          objectFit: isImageExpanded ? 'contain' : 'contain',
                        }}
                        sizes={isImageExpanded ? "100vw" : "(max-width: 768px) 100vw, 80vw"}
                        priority={currentImageIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </GalleryImage>
                
                {!isImageExpanded && selectedProject.gallery && selectedProject.gallery.length > 1 && (
                  <GalleryCounter>
                    {currentImageIndex + 1} / {selectedProject.gallery.length}
                  </GalleryCounter>
                )}
              </GalleryImageContainer>
              
              {!isImageExpanded && selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <GalleryThumbnails>
                  {selectedProject.gallery.map((image, index) => (
                    <GalleryThumbnail 
                      key={index}
                      isActive={index === currentImageIndex}
                      onClick={(e) => handleThumbnailClick(index, e)}
                    >
                      <Image
                        src={image}
                        alt={`Miniatura ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </GalleryThumbnail>
                  ))}
                </GalleryThumbnails>
              )}
            </GalleryContent>
          </GalleryOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  )
}
