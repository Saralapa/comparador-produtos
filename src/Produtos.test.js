import { describe, it, expect } from 'vitest'
import produtos from './data/produtos.json'

// confere se ninguem errou alguma coisa no json dos produtos
describe('produtos.json', () => {
  it('tem 16 produtos', () => {
    expect(produtos).toHaveLength(16)
  })

  it('nao tem id repetido', () => {
    const ids = produtos.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('todo produto tem categoria certa e preco maior que zero', () => {
    for (const p of produtos) {
      expect(['celular', 'notebook']).toContain(p.categoria)
      expect(p.preco).toBeGreaterThan(0)
    }
  })

  it('a nota fica entre 0 e 5', () => {
    for (const p of produtos) {
      expect(p.nota).toBeGreaterThanOrEqual(0)
      expect(p.nota).toBeLessThanOrEqual(5)
    }
  })
})
