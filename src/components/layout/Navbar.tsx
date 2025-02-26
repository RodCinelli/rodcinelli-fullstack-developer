'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSun, FaMoon, FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../providers/ThemeContainer'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  label: string
  delay: number
}

const NavbarContainer = styled(motion.nav)<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  background: ${({ isScrolled, theme }) => 
    isScrolled 
      ? theme.colors.background === '#F8F8FF' 
        ? 'rgba(248, 248, 255, 0.95)' 
        : 'rgba(18, 18, 18, 0.95)' 
      : theme.colors.background === '#F8F8FF'
        ? 'rgba(75, 0, 130, 0.8)'
        : 'rgba(25, 25, 25, 0.8)'
  };
  backdrop-filter: ${({ isScrolled }) => isScrolled ? 'blur(10px)' : 'blur(5px)'};
  box-shadow: ${({ isScrolled }) => isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
`

const Logo = styled(motion.div)<{ isScrolled?: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme, isScrolled }) => theme.colors.background === '#F8F8FF' 
    ? isScrolled ? '#4B0082' : '#FFFFFF'
    : isScrolled ? theme.colors.primary : '#FFFFFF'
  };
  cursor: pointer;
  transition: color 0.3s ease;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const MobileMenu = styled(motion.div)<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 90;
  padding: 6rem 2rem 2rem;
  justify-content: space-between;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF' 
        ? 'radial-gradient(circle at 90% 10%, rgba(75, 0, 130, 0.1), transparent 40%)'
        : 'radial-gradient(circle at 90% 10%, rgba(155, 106, 235, 0.1), transparent 40%)'
    };
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => 
      theme.colors.background === '#F8F8FF' 
        ? 'radial-gradient(circle at 10% 90%, rgba(75, 0, 130, 0.08), transparent 40%)'
        : 'radial-gradient(circle at 10% 90%, rgba(155, 106, 235, 0.08), transparent 40%)'
    };
    z-index: -1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  margin-top: 2rem;
`

const MobileNavLink = styled(motion.a)<{ isActive?: boolean }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme, isActive }) => isActive 
    ? theme.colors.primary 
    : theme.colors.text
  };
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  position: relative;
  transition: all 0.4s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: ${({ isActive }) => isActive ? '40%' : '0'};
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    transform: translateX(-50%);
    transition: width 0.4s ease;
    border-radius: 4px;
  }
  
  &:hover {
    transform: translateY(-3px);
    
    &::after {
      width: 40%;
    }
  }
`

const MobileDivider = styled.div`
  width: 60px;
  height: 4px;
  background: ${({ theme }) => 
    theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.3)' 
      : 'rgba(155, 106, 235, 0.3)'
  };
  border-radius: 4px;
  margin: 1.5rem 0;
  transition: all 0.3s ease;
  
  animation: pulse 3s infinite alternate;
  
  @keyframes pulse {
    from { opacity: 0.7; width: 60px; }
    to { opacity: 1; width: 70px; }
  }
`

const MobileSocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 1.5rem;
  padding: 1rem;
  width: 100%;
`

const MobileSocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  transition: all 0.4s ease;
  
  svg {
    filter: ${({ theme }) => theme.colors.background === '#F8F8FF' 
      ? 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.3))' 
      : 'drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.3))'
    };
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-5px) scale(1.1);
  }
`

const MobileFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  padding-bottom: 3rem;
`

const MobileMenuButton = styled(motion.button)<{ isScrolled?: boolean }>`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`

const NavLinkItem = ({ href, label, delay, isScrolled }: NavLinkProps & { isScrolled?: boolean }) => {
  return (
    <NavLink 
      href={href} 
      isScrolled={isScrolled}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
    >
      {label}
    </NavLink>
  )
}

const ThemeToggleButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.background === '#F8F8FF' 
    ? 'rgba(75, 0, 130, 0.1)' 
    : 'rgba(155, 106, 235, 0.1)'
  };
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
  transition: all 0.4s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  svg {
    filter: ${({ theme }) => theme.colors.background === '#F8F8FF' 
      ? 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.5))' 
      : 'drop-shadow(0px 0px 1px rgba(255, 255, 255, 0.5))'
    };
  }
  
  &:hover {
    transform: rotate(30deg);
    background: ${({ theme }) => theme.colors.background === '#F8F8FF' 
      ? 'rgba(75, 0, 130, 0.2)' 
      : 'rgba(155, 106, 235, 0.2)'
    };
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  }
`

const NavLink = styled(motion.a)<{ isScrolled?: boolean }>`
  font-weight: 500;
  color: ${({ theme, isScrolled }) => theme.colors.background === '#F8F8FF' 
    ? isScrolled ? '#4B0082' : '#FFFFFF'
    : isScrolled ? theme.colors.text : '#FFFFFF'
  };
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme, isScrolled }) => theme.colors.background === '#F8F8FF' 
      ? isScrolled ? '#4B0082' : '#FFFFFF'
      : isScrolled ? theme.colors.primary : '#FFFFFF'
    };
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

const IconButton = styled(motion.button)<{ isScrolled?: boolean }>`
  background: none;
  border: none;
  color: ${({ theme, isScrolled }) => theme.colors.background === '#F8F8FF' 
    ? isScrolled ? '#4B0082' : '#FFFFFF'
    : isScrolled ? theme.colors.text : '#FFFFFF'
  };
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
`

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  const [previousOverflow, setPreviousOverflow] = useState<string>('')
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Determina a seção ativa com base no scroll
      const scrollPosition = window.scrollY + 100; // Adiciona offset para detectar melhor

      // Obtém todas as seções
      const sections = [
        'home',
        'about',
        'skills',
        'projects',
        'experience',
        'contact'
      ];

      // Encontra a seção ativa
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Chama uma vez para definir a seção inicial
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const computedBodyStyle = window.getComputedStyle(document.body);
      setPreviousOverflow(computedBodyStyle.overflow || 'auto');
      
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px'
    } else {
      setTimeout(() => {
        document.body.style.overflow = previousOverflow || 'auto';
        document.body.style.paddingRight = '0px';
      }, 500);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }
  }, [isOpen, previousOverflow])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { href: '#about', label: 'Sobre', delay: 1 },
    { href: '#skills', label: 'Habilidades', delay: 2 },
    { href: '#projects', label: 'Projetos', delay: 3 },
    { href: '#experience', label: 'Experiência', delay: 4 },
    { href: '#contact', label: 'Contato', delay: 5 },
  ]

  const isActive = (href: string) => {
    // Remove o # e compara com a seção ativa
    const section = href.replace('#', '');
    return section === activeSection;
  }

  const scrollToTop = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <NavbarContainer 
        isScrolled={isScrolled}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo
          isScrolled={isScrolled}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          onClick={scrollToTop}
        >
          Rodrigo Cinelli
        </Logo>

        <NavLinks>
          {navLinks.map((link) => (
            <NavLinkItem 
              key={link.href} 
              href={link.href} 
              label={link.label} 
              delay={link.delay}
              isScrolled={isScrolled}
            />
          ))}
          
          <IconButton 
            isScrolled={isScrolled}
            onClick={toggleTheme}
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            aria-label={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
        </NavLinks>

        <MobileMenuButton 
          isScrolled={isScrolled}
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </NavbarContainer>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu 
            isOpen={isOpen}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <MobileNavLinks>
              {navLinks.map((link, index) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  isActive={isActive(link.href)}
                  onClick={toggleMenu}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </MobileNavLink>
              ))}
            </MobileNavLinks>
            
            <MobileFooter>
              <MobileDivider />
              
              <ThemeToggleButton
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: navLinks.length * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                aria-label={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </ThemeToggleButton>
              
              <MobileDivider />
              
              <MobileSocialLinks
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: navLinks.length * 0.1 + 0.2,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <MobileSocialLink
                  href="https://github.com/RodCinelli"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub"
                >
                  <FaGithub />
                </MobileSocialLink>
                
                <MobileSocialLink
                  href="https://www.linkedin.com/in/rodrigo-cinelli"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </MobileSocialLink>
              </MobileSocialLinks>
            </MobileFooter>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  )
}
