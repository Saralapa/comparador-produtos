import CardProduto from './CardProduto'

function ListaProdutos({ produtos, selecionados, aoSelecionar }) {
  if (produtos.length === 0) {
    return <p className="nenhum-produto">Nenhum produto encontrado</p>
  }

  return (
    <div className="lista">
      {produtos.map((produto) => (
        <CardProduto
          key={produto.id}
          produto={produto}
          selecionado={selecionados.includes(produto.id)}
          aoSelecionar={aoSelecionar}
        />
      ))}
    </div>
  )
}

export default ListaProdutos
