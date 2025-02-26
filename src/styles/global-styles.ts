import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }
    @media (max-width: 720px) {
      font-size: 87.5%; // 14px
    }
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
  
  /* Estilização da barra de rolagem */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => 
      props.theme.mode === 'light'
        ? '#E8E8FF' 
        : '#1E1E1E'
    };
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => 
      props.theme.mode === 'light'
        ? '#9370DB' /* Cor clara para contraste com o footer */
        : '#D1C4E9' /* Cor escura para contraste com o footer */
    };
    border-radius: 6px;
    border: 2px solid ${props => 
      props.theme.mode === 'light'
        ? '#E8E8FF' 
        : '#1E1E1E'
    };
    
    &:hover {
      background: ${props => 
        props.theme.mode === 'light'
          ? '#7B68EE' /* Cor mais escura no hover para modo claro */
          : '#E6E6FA' /* Cor mais clara no hover para modo escuro */
      };
    }
  }
  
  /* Garantindo que a scrollbar tenha contraste com o footer */
  footer::-webkit-scrollbar-track {
    background: #1A1A1A;
  }
  
  footer::-webkit-scrollbar-thumb {
    background: #B8B8B8;
    
    &:hover {
      background: #D1D1D1;
    }
  }
  
  /* Remove o outline azul padrão em elementos focados */
  *:focus {
    outline: none;
  }
  
  /* Estilo para seleção de texto */
  ::selection {
    background: ${props => 
      props.theme.colors.background === '#F8F8FF' 
        ? 'rgba(75, 0, 130, 0.25)' 
        : 'rgba(147, 112, 219, 0.25)'
    };
    color: ${props => props.theme.colors.text};
  }
`