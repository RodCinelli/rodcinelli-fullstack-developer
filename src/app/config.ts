// Configurações para desativar a renderização estática e forçar a renderização dinâmica
// Next.js irá usar estas exportações para configurar o comportamento de páginas e layouts

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

// Exportar também como nomes alternativos para uso com importação
export const dynamicConfig = {
  dynamic: 'force-dynamic',
  fetchCache: 'force-no-store',
  revalidate: 0
} 