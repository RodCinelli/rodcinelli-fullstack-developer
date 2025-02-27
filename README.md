# Portfólio - Rodrigo Cinelli | Desenvolvedor Full-Stack

Um portfólio profissional moderno e interativo, desenvolvido para apresentar meus projetos, habilidades e experiência como Desenvolvedor Full-Stack.

![Portfólio Screenshot](public/assets/vectors/preview.png)

## Sobre o Projeto

Este portfólio foi construído com foco em apresentar meu trabalho de forma elegante e profissional, demonstrando não apenas os projetos realizados, mas também as tecnologias que domino. O design moderno e as animações fluidas proporcionam uma experiência de usuário envolvente, com elementos interativos que destacam minhas habilidades técnicas.

O site conta com:
- Design responsivo para todos os dispositivos
- Tema claro/escuro personalizado
- Animações suaves usando Framer Motion
- Galeria de projetos interativa
- Seções organizadas para apresentação pessoal, habilidades, projetos e contato

## Tecnologias Utilizadas

### Frontend
- **Next.js 14** (App Router) - Framework React com renderização do lado do servidor
- **TypeScript** - Superset tipado de JavaScript
- **Styled Components** - CSS-in-JS para estilização de componentes
- **Framer Motion** - Biblioteca para animações fluidas
- **React Icons** - Conjunto de ícones populares para React

### UI/UX
- Design responsivo com Grid e Flexbox
- Sistema de temas (claro/escuro) personalizado
- Animações de scroll e interações
- Componentes modulares e reutilizáveis

### Ferramentas de Desenvolvimento
- ESLint - Linting de código
- Prettier - Formatação de código
- Git - Controle de versão

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Criar build de produção
npm run build

# Iniciar versão de produção
npm start
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

```
src/
├── app/                # Configuração do Next.js App Router
├── components/         # Componentes reutilizáveis
│   ├── layout/         # Componentes de layout (Navbar, Footer)
│   ├── providers/      # Provedores de contexto (Theme)
│   └── sections/       # Seções da página (Hero, About, Projects)
├── styles/             # Estilos globais e tema
└── lib/                # Utilidades e configurações
```

## Deployment

Este projeto está configurado para fácil deploy na [Vercel](https://vercel.com), a plataforma dos criadores do Next.js.

---

Desenvolvido por Rodrigo Cinelli - [LinkedIn](https://www.linkedin.com/in/rodrigo-cinelli) | [GitHub](https://github.com/RodCinelli)
