// card de um produto na lista
function CardProduto({ produto }) {
  return (
    <div className="card">
      <div className="card-imagem">{produto.categoria}</div>
      <h3>{produto.nome}</h3>
      <p className="preco">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
      <ul>
        <li>Tela: {produto.tela}</li>
        <li>Processador: {produto.processador}</li>
        <li>RAM: {produto.ram}</li>
        <li>Armazenamento: {produto.armazenamento}</li>
        <li>Nota: {produto.nota}</li>
      </ul>
    </div>
  )
}

export default CardProduto
