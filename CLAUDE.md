# CLAUDE.md - Eddy Portfolio Project Guide

## Build Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines
- **TypeScript**: Use strict typing with proper interfaces/types
- **Components**: Functional components with explicit prop types
- **Imports**: Group imports: React/Next.js, then external libraries, then local modules
- **Naming**: 
  - PascalCase for components and types
  - camelCase for variables and functions
  - Use descriptive, semantic names
- **Formatting**: Use proper indentation (2 spaces) and meaningful line breaks
- **CSS**: Use Tailwind with consistent class ordering (layout → typography → visual)
- **Fonts**: Use Geist Sans for regular text and Geist Mono for code/monospace

## Project Structure
- Next.js App Router pattern
- Use path aliases (`@/*`) for imports
- Keep components small and focused on a single responsibility
- Handle errors explicitly with proper user feedback