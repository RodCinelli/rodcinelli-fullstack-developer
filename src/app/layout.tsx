import { Inter, Roboto_Mono } from "next/font/google";
import StyledComponentsRegistry from '../lib/registry'
import { ThemeContainer } from '../components/providers/ThemeContainer'
import { metadata } from './metadata'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export { metadata }

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeContainer>
            {children}
          </ThemeContainer>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
