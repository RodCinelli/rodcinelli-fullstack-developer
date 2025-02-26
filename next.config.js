/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Desabilitar a geração estática
  output: 'standalone', // Preferido para Vercel
  experimental: {
    // Remover runtime nodejs que não é válido
  },
  // Configurar a flag para informar o Next.js para não renderizar estaticamente
  env: {
    NEXT_DISABLE_STATICS: 'true',
    NEXT_FORCE_DYNAMIC: 'true',
  }
}

module.exports = nextConfig 