import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Esta função pode ser marcada como `async` se usar `await`
export function middleware(request: NextRequest) {
  // Força o Next.js a tratar cada solicitação como dinâmica
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-next-cache', 'no-store')
  requestHeaders.set('x-middleware-cache', 'no-store')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configuração para que o middleware seja executado em todas as rotas
export const config = {
  matcher: [
    // Combinar todas as páginas
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 