# Comparador de Produtos

![CI](https://github.com/Saralapa/comparador-produtos/actions/workflows/ci.yml/badge.svg)

Trabalho final da disciplina de Integração Contínua - UTFPR

**Aluno:** Gabriel Schmitt Teixeira - RA 2580527

Site publicado: https://saralapa.github.io/comparador-produtos/

## 1. Sobre o projeto

É uma SPA feita em React onde dá pra ver uma lista de celulares e notebooks e comparar até 3 deles lado a lado.
Os produtos são inventados e ficam num arquivo JSON, não tem backend.

O site em si é simples. A parte principal do trabalho é o processo em volta dele: CI, testes, qualidade, segurança, build, deploy e monitoramento.

## 2. Serviço proposto

Quem vai comprar um celular ou notebook geralmente abre várias abas pra comparar preço e configuração. A ideia é juntar isso numa página só, com a tabela de comparação já mostrando qual é o mais barato.

Público-alvo: pessoas pesquisando antes de comprar, que não entendem muito de especificação e querem ver tudo junto.

Possibilidades de monetização:

- espaço de anúncio no fim da página (hoje é só um bloco escrito "Anúncio")
- link de afiliado para as lojas, ganhando comissão quando alguém compra
- loja pagar para o produto aparecer como destaque

## 3. Funcionalidades

- lista de celulares e notebooks com preço, tela, memória, armazenamento, processador e nota
- busca pelo nome do produto
- filtro por categoria (todos, celulares ou notebooks)
- ordenar por menor ou maior preço
- mensagem quando a busca não encontra nenhum produto
- selecionar até 3 produtos e comparar numa tabela, com aviso se tentar marcar o quarto
- o mais barato fica destacado na comparação
- botão para limpar a comparação
- preço com separador de milhar (R$ 1.299,90)
- espaço de anúncio

## 4. Tecnologias utilizadas

- React 19 e Vite 8
- Vitest, Testing Library e coverage v8 nos testes
- ESLint e Prettier
- GitHub Actions para o CI, deploy, monitoramento e Docker
- CodeQL, Dependabot, npm audit, gitleaks e SonarCloud na parte de qualidade e segurança
- GitHub Pages para hospedar o site
- Docker (nginx) e GitHub Container Registry

## 5. Arquitetura da aplicação

Como é tudo no navegador, a arquitetura é só o React lendo um JSON:

```
src/
  App.jsx                 estado da tela (busca, categoria, ordem e selecionados)
  components/
    ListaProdutos.jsx     lista de cards
    CardProduto.jsx       um produto
    TabelaComparacao.jsx  tabela dos selecionados
    Anuncio.jsx           espaço de anúncio
  data/produtos.json      os produtos
  formatarPreco.js        formata o preço em reais
```

O `App.jsx` guarda o estado e passa os produtos filtrados para a lista e os selecionados para a tabela.
O JSON é importado direto no código, então ele vai junto no build e não precisa de servidor.

## 6. Estratégia de branches e versionamento

Usei uma versão simples do git flow:

- `main`: é o que está publicado no site. Só recebe PR vindo da `develop`.
- `develop`: onde as coisas prontas vão sendo juntadas.
- `feature/...`, `fix/...`, `ci/...` e `docs/...`: uma branch para cada coisa, criada a partir da `develop` e que volta para ela por pull request.

A `main` e a `develop` são protegidas: não dá pra fazer push direto, tem que abrir PR e os checks `build`, `gitleaks`, CodeQL (`analise (javascript-typescript)`) e SonarCloud precisam passar. A regra vale até para o dono do repositório.

Os PRs do Dependabot também entram pela `develop`.

Versões são marcadas com tag na `main` (vX.Y.Z). A `v0.1.0` foi o primeiro deploy no GitHub Pages.

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
