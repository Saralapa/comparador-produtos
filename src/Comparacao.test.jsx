import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// clica no botao "Comparar" dos primeiros produtos da lista
async function selecionar(quantidade) {
  for (let i = 0; i < quantidade; i++) {
    // sempre pega o primeiro, porque o que ja foi escolhido muda o texto do botao
    await userEvent.click(screen.getAllByRole('button', { name: 'Comparar' })[0])
  }
}

describe('comparacao', () => {
  it('nao mostra a tabela sem nenhum produto escolhido', () => {
    render(<App />)
    expect(screen.queryByText('Comparação')).not.toBeInTheDocument()
    expect(screen.getByText('Selecionados para comparar: 0 de 3')).toBeInTheDocument()
  })

  it('mostra a tabela depois de escolher 2 produtos', async () => {
    render(<App />)
    await selecionar(2)
    expect(screen.getByText('Comparação')).toBeInTheDocument()
    expect(screen.getByText('Selecionados para comparar: 2 de 3')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('nao deixa escolher mais de 3', async () => {
    render(<App />)
    await selecionar(4)
    expect(screen.getByText('Selecionados para comparar: 3 de 3')).toBeInTheDocument()
    expect(screen.getByText('Você só pode comparar até 3 produtos')).toBeInTheDocument()
  })

  it('remove um produto pela tabela', async () => {
    render(<App />)
    await selecionar(3)
    await userEvent.click(screen.getAllByRole('button', { name: 'remover' })[0])
    expect(screen.getByText('Selecionados para comparar: 2 de 3')).toBeInTheDocument()
  })

  it('o aviso some quando tira um produto', async () => {
    render(<App />)
    await selecionar(4)
    await userEvent.click(screen.getAllByRole('button', { name: 'Remover da comparação' })[0])
    expect(screen.queryByText('Você só pode comparar até 3 produtos')).not.toBeInTheDocument()
  })

  it('limpa a comparacao toda', async () => {
    render(<App />)
    await selecionar(3)
    await userEvent.click(screen.getByRole('button', { name: 'Limpar comparação' }))
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByText('Selecionados para comparar: 0 de 3')).toBeInTheDocument()
  })
})
