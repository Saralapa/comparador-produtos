import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// pega os nomes dos produtos que estao aparecendo na lista
function nomesNaTela() {
  return screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
}

describe('busca e filtro', () => {
  it('mostra os 16 produtos no comeco', () => {
    render(<App />)
    expect(nomesNaTela()).toHaveLength(16)
  })

  it('busca pelo nome', async () => {
    render(<App />)
    await userEvent.type(screen.getByPlaceholderText('Buscar pelo nome...'), 'zeta')
    expect(nomesNaTela()).toEqual(['Celular Zeta A3', 'Celular Zeta A1'])
  })

  it('busca com espaco e letra maiuscula tambem funciona', async () => {
    render(<App />)
    await userEvent.type(screen.getByPlaceholderText('Buscar pelo nome...'), '  GAMER ')
    expect(nomesNaTela()).toHaveLength(2)
  })

  it('filtra so os notebooks', async () => {
    render(<App />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'notebook')
    const nomes = nomesNaTela()
    expect(nomes).toHaveLength(8)
    expect(nomes.every((nome) => nome.startsWith('Notebook'))).toBe(true)
  })

  it('junta busca e categoria', async () => {
    render(<App />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'celular')
    await userEvent.type(screen.getByPlaceholderText('Buscar pelo nome...'), 'pro')
    expect(nomesNaTela()).toEqual(['Celular X12 Pro'])
  })
})
