// deixa o preco no formato R$ 1.299,90
function formatarPreco(preco) {
  return 'R$ ' + preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default formatarPreco
