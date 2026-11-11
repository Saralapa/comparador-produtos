import CardProduto from './CardProduto'

function ListaProdutos({ produtos }) {
  return (
    <div className="lista">
      {produtos.map((produto) => (
        <CardProduto key={produto.id} produto={produto} />
      ))}
    </div>
  )
}

export default ListaProdutos
