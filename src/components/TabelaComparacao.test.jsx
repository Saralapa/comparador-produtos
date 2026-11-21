import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TabelaComparacao from './TabelaComparacao'

// produtos de teste (nao precisa ser igual ao json)
const barato = { id: 1, nome: 'Teste Barato', preco: 500, tela: '6', processador: 'a', ram: '2 GB', armazenamento: '32 GB', nota: 3 }
const caro = { id: 2, nome: 'Teste Caro', preco: 900, tela: '6', processador: 'b', ram: '4 GB', armazenamento: '64 GB', nota: 4 }

describe('TabelaComparacao', () => {
  it('nao mostra nada se a lista estiver vazia', () => {
    const { container } = render(<TabelaComparacao produtos={[]} aoRemover={() => {}} aoLimpar={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('destaca o produto mais barato', () => {
    render(<TabelaComparacao produtos={[caro, barato]} aoRemover={() => {}} aoLimpar={() => {}} />)
    const celula = screen.getByText('R$ 500,00').closest('td')
    expect(celula).toHaveClass('menor-preco')
    expect(screen.getByText('(mais barato)')).toBeInTheDocument()
    expect(screen.getByText('R$ 900,00').closest('td')).not.toHaveClass('menor-preco')
  })

  it('com 1 produto so nao destaca', () => {
    render(<TabelaComparacao produtos={[barato]} aoRemover={() => {}} aoLimpar={() => {}} />)
    expect(screen.queryByText('(mais barato)')).not.toBeInTheDocument()
  })

  it('chama aoRemover com o id certo', async () => {
    const aoRemover = vi.fn()
    render(<TabelaComparacao produtos={[barato, caro]} aoRemover={aoRemover} aoLimpar={() => {}} />)
    await userEvent.click(screen.getAllByRole('button', { name: 'remover' })[1])
    expect(aoRemover).toHaveBeenCalledWith(2)
  })

  it('chama aoLimpar no botao de limpar', async () => {
    const aoLimpar = vi.fn()
    render(<TabelaComparacao produtos={[barato, caro]} aoRemover={() => {}} aoLimpar={aoLimpar} />)
    await userEvent.click(screen.getByRole('button', { name: 'Limpar comparação' }))
    expect(aoLimpar).toHaveBeenCalledTimes(1)
  })
})
