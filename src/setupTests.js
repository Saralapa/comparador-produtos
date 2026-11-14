import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// limpa a tela depois de cada teste
afterEach(() => {
  cleanup()
})
