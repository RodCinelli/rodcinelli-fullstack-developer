'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Registrar o erro para análise posterior
    console.error('Erro da aplicação:', error)
  }, [error])

  return (
    <div className="error-container" style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '1rem', color: '#4B0082' }}>Oops! Algo deu errado</h2>
      <p style={{ marginBottom: '2rem' }}>
        Encontramos um problema ao carregar esta página. Por favor, tente novamente.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#6A5ACD',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Tentar novamente
      </button>
    </div>
  )
} 