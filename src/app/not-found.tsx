'use client'

import React from 'react'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h2>Página não encontrada</h2>
      <p>A página que você está procurando não existe.</p>
      <a 
        href="/"
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#6A5ACD',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none'
        }}
      >
        Voltar ao início
      </a>
    </div>
  )
} 