import { describe, it, expect } from 'vitest'
import formatarPreco from './formatarPreco'

describe('formatarPreco', () => {
  it('coloca ponto no milhar e virgula nos centavos', () => {
    expect(formatarPreco(1299.9)).toBe('R$ 1.299,90')
  })

  it('funciona com preco menor que mil', () => {
    expect(formatarPreco(500)).toBe('R$ 500,00')
  })

  it('funciona com preco acima de 10 mil', () => {
    expect(formatarPreco(12345.5)).toBe('R$ 12.345,50')
  })
})
