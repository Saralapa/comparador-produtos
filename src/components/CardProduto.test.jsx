import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CardProduto from './CardProduto'

const produto = { id: 7, nome: 'Celular Teste', categoria: 'celular', preco: 1299.9, tela: '6 polegadas', processador: 'x', ram: '4 GB', armazenamento: '64 GB', nota: 4 }

describe('CardProduto', () => {
  it('mostra o preco com virgula', () => {
    render(<CardProduto produto={produto} selecionado={false} aoSelecionar={() => {}} />)
    expect(screen.getByText('R$ 1299.90')).toBeInTheDocument()
  })

  it('muda o texto do botao quando esta selecionado', () => {
    const { rerender } = render(<CardProduto produto={produto} selecionado={false} aoSelecionar={() => {}} />)
    expect(screen.getByRole('button', { name: 'Comparar' })).toBeInTheDocument()
    rerender(<CardProduto produto={produto} selecionado={true} aoSelecionar={() => {}} />)
    expect(screen.getByRole('button', { name: 'Remover da comparação' })).toBeInTheDocument()
  })

  it('chama aoSelecionar com o id do produto', async () => {
    const aoSelecionar = vi.fn()
    render(<CardProduto produto={produto} selecionado={false} aoSelecionar={aoSelecionar} />)
    await userEvent.click(screen.getByRole('button', { name: 'Comparar' }))
    expect(aoSelecionar).toHaveBeenCalledWith(7)
  })
})
