'use client'

import { lightTheme } from '../styles/theme'
import { ThemeProvider } from 'styled-components'

// HOC (Higher Order Component) para garantir tema padrão durante SSR
export default function withDefaultTheme<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithDefaultTheme(props: P) {
    // Renderiza o componente com tema padrão garantido
    return (
      <ThemeProvider theme={lightTheme}>
        <Component {...props} />
      </ThemeProvider>
    )
  }
} 