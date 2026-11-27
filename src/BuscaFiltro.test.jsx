import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// pega os nomes dos produtos que estao aparecendo na lista
function nomesNaTela() {
  return screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
}

describe('busca e filtro', () => {
  it('mostra todos os produtos no comeco', () => {
    render(<App />)
    expect(nomesNaTela()).toHaveLength(20)
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
    await userEvent.selectOptions(screen.getByLabelText('Categoria'), 'notebook')
    const nomes = nomesNaTela()
    expect(nomes).toHaveLength(9)
    expect(nomes.every((nome) => nome.startsWith('Notebook'))).toBe(true)
  })

  it('junta busca e categoria', async () => {
    render(<App />)
    await userEvent.selectOptions(screen.getByLabelText('Categoria'), 'celular')
    await userEvent.type(screen.getByPlaceholderText('Buscar pelo nome...'), 'pro')
    expect(nomesNaTela()).toEqual(['Celular X12 Pro'])
  })

  it('ordena pelo menor preco', async () => {
    render(<App />)
    await userEvent.selectOptions(screen.getByLabelText('Ordenar'), 'menor-preco')
    const nomes = nomesNaTela()
    expect(nomes[0]).toBe('Celular Lite 2')
    expect(nomes[nomes.length - 1]).toBe('Notebook Gamer G5')
  })

  it('ordena pelo maior preco so nos celulares', async () => {
    render(<App />)
    await userEvent.selectOptions(screen.getByLabelText('Categoria'), 'celular')
    await userEvent.selectOptions(screen.getByLabelText('Ordenar'), 'maior-preco')
    expect(nomesNaTela()[0]).toBe('Celular Prisma Max')
  })

  it('avisa quando nao acha nenhum produto', async () => {
    render(<App />)
    await userEvent.type(screen.getByPlaceholderText('Buscar pelo nome...'), 'tablet')
    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument()
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
  })
})
