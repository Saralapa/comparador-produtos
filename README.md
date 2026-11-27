# Comparador de Produtos

![CI](https://github.com/Saralapa/comparador-produtos/actions/workflows/ci.yml/badge.svg)

Site simples para comparar celulares e notebooks (preço e especificações).

Trabalho final da disciplina de Integração Contínua - UTFPR

**Aluno:** Gabriel Schmitt Teixeira - RA 2580527

> Projeto em construção

O que já funciona:

- lista de celulares e notebooks (dados no arquivo `src/data/produtos.json`)
- busca pelo nome do produto
- filtro por categoria
- comparar até 3 produtos lado a lado numa tabela
- o mais barato fica destacado na comparação
- botão para limpar a comparação
- espaço de anúncio no fim da página

## Como rodar

```bash
npm install
npm run dev
```

## Testes e lint

```bash
npm run lint           # eslint
npm test               # roda os testes (vitest)
npm run test:coverage  # testes com cobertura, falha se ficar abaixo de 90%
```

## CI

O CI roda no GitHub Actions (arquivo `.github/workflows/ci.yml`) em todo push e pull request na `main` e na `develop`.
Ele instala as dependencias com `npm ci`, roda o lint, os testes com cobertura e o build.
O build (`dist`) e o relatorio de cobertura ficam guardados como artefato na execucao.
Se alguma etapa falhar o PR nao pode ser mesclado.
