import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('mostra o titulo da pagina', () => {
    render(<App />)
    expect(screen.getByText('Comparador de Produtos')).toBeInTheDocument()
  })

  it('mostra o espaco de anuncio', () => {
    render(<App />)
    expect(screen.getByText('Anúncio')).toBeInTheDocument()
  })
})
