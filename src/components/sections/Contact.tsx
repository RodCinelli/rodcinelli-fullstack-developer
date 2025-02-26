'use client'

import { useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const ContactSection = styled.section`
  padding: 8rem 2rem;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'linear-gradient(315deg, #F8F8FF 0%, rgba(75, 0, 130, 0.15) 100%)' 
      : 'linear-gradient(315deg, #151515 0%, rgba(75, 0, 130, 0.3) 100%)'
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
  
  /* Padrão de hexágonos sutis */
  background-image: ${({ theme }) => 
    theme.colors.background === '#F8F8FF'
      ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v2.83L26.272 32.97l-1.414 1.414L0 8.685v2.83L22.97 37.314l-1.414 1.414L0 14.828v2.83L19.664 41.657l-1.414 1.414L0 20.972v2.83L16.364 46l-1.414 1.414L0 27.113v2.83L13.07 43.313l-1.414 1.414L0 33.256v2.83L9.77 46.042l-1.414 1.414L0 39.4v2.83L6.47 48.73l-1.414 1.414L0 45.54v2.83L3.17 51.428l-1.413 1.414L0 51.7v2.83l-.415-.415L0 54.544v2.83L54.627 60H60L0 0h.284zM60 5.656l-46.485 46.484 1.415 1.415L60 8.485v-2.83zm0 5.66L19.515 52.313l1.414 1.414L60 14.14v-2.83zm0 5.65L25.172 58.142l1.414 1.414L60 19.8v-2.83zm0 5.66L30.828 58.142l1.414 1.414L60 25.456v-2.83zM60 28.284L36.485 58.142l1.414 1.414L60 31.113v-2.83zm0 5.66L42.142 58.142l1.414 1.414L60 36.77v-2.83zm0 5.66L47.8 58.142l1.415 1.414L60 42.425v-2.83zm0 5.66L53.456 58.142l1.414 1.414L60 48.084v-2.83zm0 5.66L59.113 58.142 60 59.03v-2.83z' fill='%234b0082' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v2.83L26.272 32.97l-1.414 1.414L0 8.685v2.83L22.97 37.314l-1.414 1.414L0 14.828v2.83L19.664 41.657l-1.414 1.414L0 20.972v2.83L16.364 46l-1.414 1.414L0 27.113v2.83L13.07 43.313l-1.414 1.414L0 33.256v2.83L9.77 46.042l-1.414 1.414L0 39.4v2.83L6.47 48.73l-1.414 1.414L0 45.54v2.83L3.17 51.428l-1.413 1.414L0 51.7v2.83l-.415-.415L0 54.544v2.83L54.627 60H60L0 0h.284zM60 5.656l-46.485 46.484 1.415 1.415L60 8.485v-2.83zm0 5.66L19.515 52.313l1.414 1.414L60 14.14v-2.83zm0 5.65L25.172 58.142l1.414 1.414L60 19.8v-2.83zm0 5.66L30.828 58.142l1.414 1.414L60 25.456v-2.83zM60 28.284L36.485 58.142l1.414 1.414L60 31.113v-2.83zm0 5.66L42.142 58.142l1.414 1.414L60 36.77v-2.83zm0 5.66L47.8 58.142l1.415 1.414L60 42.425v-2.83zm0 5.66L53.456 58.142l1.414 1.414L60 48.084v-2.83zm0 5.66L59.113 58.142 60 59.03v-2.83z' fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`
  };
  
  &:before {
    content: '';
    position: absolute;
    top: -10%;
    right: -5%;
    width: 25%;
    height: 50%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF'
        ? 'radial-gradient(ellipse, rgba(75, 0, 130, 0.1) 0%, rgba(255, 255, 255, 0) 70%)'
        : 'radial-gradient(ellipse, rgba(75, 0, 130, 0.3) 0%, rgba(0, 0, 0, 0) 70%)'
    };
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: rotate(-15deg);
    pointer-events: none;
    z-index: 1;
    filter: blur(60px);
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
        ? 'radial-gradient(circle, rgba(75, 0, 130, 0.08) 0%, rgba(255, 255, 255, 0) 70%)'
        : 'radial-gradient(circle, rgba(75, 0, 130, 0.25) 0%, rgba(0, 0, 0, 0) 70%)'
    };
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: rotate(15deg);
    pointer-events: none;
    z-index: 1;
    filter: blur(50px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 6rem 1.5rem;
  }
`

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }
`

const SectionDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
  padding: 0 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
`

const ContactContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`

const ContactInfoCards = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    gap: 2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    align-items: center;
  }
`

const ContactInfoCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.6rem;
  width: 100%;
  max-width: 180px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    width: 100%;
  }
`

const ContactItemIcon = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  flex-shrink: 0;
  margin-bottom: 0.4rem;
  box-shadow: 0 8px 20px ${({ color }) => `${color}90`};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 55px;
    height: 55px;
    font-size: 1.5rem;
  }
`

const ContactItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ContactItemTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.colors.text};
`

const ContactItemText = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
`

const FormContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(30, 30, 30, 0.8)'
  };
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(75, 0, 130, 0.15);
  backdrop-filter: blur(5px);
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #4B0082, #8A2BE2, #9370DB);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`

const ContactForm = styled(motion.form)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const FormGroup = styled.div<{ fullWidth?: boolean }>`
  grid-column: ${({ fullWidth }) => fullWidth ? '1 / -1' : 'auto'};
  position: relative;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
`

const FormInput = styled(motion.input)<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 1px solid ${({ hasError, theme }) => 
    hasError 
      ? '#ff5252' 
      : theme.colors.background === '#F8F8FF' 
        ? 'rgba(75, 0, 130, 0.2)' 
        : 'rgba(255, 255, 255, 0.1)'
  };
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}30`};
  }
`

const FormTextarea = styled(motion.textarea)<{ hasError?: boolean }>`
  width: 100%;
  padding: 1rem 1.2rem;
  border: 1px solid ${({ hasError, theme }) => 
    hasError 
      ? '#ff5252' 
      : theme.colors.background === '#F8F8FF' 
        ? 'rgba(75, 0, 130, 0.2)' 
        : 'rgba(255, 255, 255, 0.1)'
  };
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  min-height: 150px;
  resize: vertical;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}30`};
  }
`

const ErrorText = styled(motion.span)`
  display: block;
  color: #ff5252;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  position: absolute;
`

const SubmitButtonContainer = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 1rem;
`

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #4B0082, #8A2BE2);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.9rem 2.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(75, 0, 130, 0.3);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
    transition: all 0.6s ease;
  }
  
  &:hover:before {
    left: 100%;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    
    &:before {
      display: none;
    }
  }
`

const SuccessMessage = styled(motion.div)`
  grid-column: 1 / -1;
  background: #66BB6A20;
  border-radius: 8px;
  color: #66BB6A;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
  text-align: center;
  
  svg {
    font-size: 1.2rem;
  }
`

const ErrorMessage = styled(motion.div)`
  grid-column: 1 / -1;
  background: #ff525220;
  border-radius: 8px;
  color: #ff5252;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
  text-align: center;
  
  svg {
    font-size: 1.2rem;
  }
`

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const formRef = useRef<HTMLFormElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Remove error for the specific field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof FormErrors]
        return newErrors
      })
    }
    
    // Clear general error message when user starts typing in any field
    if (submitError) {
      setSubmitError(null)
    }
  }
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let hasError = false
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
      hasError = true
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
      hasError = true
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
      hasError = true
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório'
      hasError = true
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória'
      hasError = true
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres'
      hasError = true
    }
    
    setErrors(newErrors)
    
    // Se houver erros, mostre a mensagem de erro geral
    if (hasError) {
      setSubmitError('Por favor, preencha corretamente todos os campos do formulário.')
      
      // Reset da mensagem de erro após 5 segundos
      setTimeout(() => {
        setSubmitError(null)
      }, 5000)
    }
    
    return !hasError
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Limpar erro anterior
    setSubmitError(null)
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Configurações do EmailJS
      const serviceId = 'service_k0cpacd'
      const templateId = 'template_72j2uou'
      const publicKey = 'LGuabGidxJ4i6xWQP'
      
      // Envio do email usando EmailJS
      emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey)
        .then((result) => {
          console.log('Email enviado com sucesso!', result.text)
          setIsSubmitting(false)
          setIsSubmitted(true)
          
          // Limpar o formulário após envio bem-sucedido
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          })
          
          // Reset do estado de sucesso após 5 segundos
          setTimeout(() => {
            setIsSubmitted(false)
          }, 5000)
        })
        .catch((error) => {
          console.error('Erro ao enviar o email:', error.text)
          setIsSubmitting(false)
          setSubmitError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.')
          
          // Reset da mensagem de erro após 5 segundos
          setTimeout(() => {
            setSubmitError(null)
          }, 5000)
        })
    }
  }
  
  const contactCards = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Localização',
      content: 'Rio de Janeiro, RJ',
      color: '#4B0082'
    },
    {
      icon: <FaEnvelope />,
      title: 'E-mail',
      content: 'rodcinelli@gmail.com',
      color: '#6A5ACD'
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Telefone',
      content: '+55 (21) 98322-0819',
      color: '#9370DB'
    }
  ]

  return (
    <ContactSection id="contact" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <span>Entre em</span> <span style={{ color: '#8A2BE2' }}>Contato</span>
      </SectionTitle>
      
      <SectionDescription
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Tem um projeto em mente ou quer conversar? Preencha o formulário abaixo 
        ou entre em contato através dos canais disponíveis.
      </SectionDescription>
      
      <ContactContainer>
        <ContactInfoCards
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          {contactCards.map((card, index) => (
            <ContactInfoCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <ContactItemIcon color={card.color}>
                {card.icon}
              </ContactItemIcon>
              <ContactItemContent>
                <ContactItemTitle>{card.title}</ContactItemTitle>
                <ContactItemText>{card.content}</ContactItemText>
              </ContactItemContent>
            </ContactInfoCard>
          ))}
        </ContactInfoCards>
        
        <FormContainer
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ContactForm 
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <FormInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                hasError={!!errors.name}
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
                placeholder="Seu nome"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <FormInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                hasError={!!errors.email}
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
                placeholder="seu.email@exemplo.com"
              />
            </FormGroup>
            
            <FormGroup fullWidth>
              <FormLabel htmlFor="subject">Assunto</FormLabel>
              <FormInput
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                hasError={!!errors.subject}
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
                placeholder="Assunto da mensagem"
              />
            </FormGroup>
            
            <FormGroup fullWidth>
              <FormLabel htmlFor="message">Mensagem</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                hasError={!!errors.message}
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
                placeholder="Digite sua mensagem aqui..."
              />
            </FormGroup>
            
            <SubmitButtonContainer>
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    <FaPaperPlane /> Enviar Mensagem
                  </>
                )}
              </SubmitButton>
            </SubmitButtonContainer>
            
            {submitError && (
              <ErrorMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FaExclamationTriangle /> {submitError}
              </ErrorMessage>
            )}
            
            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FaCheck /> Sua mensagem foi enviada com sucesso! Em breve entrarei em contato.
              </SuccessMessage>
            )}
          </ContactForm>
        </FormContainer>
      </ContactContainer>
    </ContactSection>
  )
} 