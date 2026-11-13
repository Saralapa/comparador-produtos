// tabela com os produtos escolhidos lado a lado
function TabelaComparacao({ produtos, aoRemover }) {
  if (produtos.length === 0) {
    return null
  }

  // acha o menor preco para destacar na tabela
  const menorPreco = Math.min(...produtos.map((produto) => produto.preco))
  // com 1 produto so nao tem com quem comparar, entao nao destaca
  const temMaisDeUm = produtos.length > 1

  return (
    <div className="comparacao">
      <h2>Comparação</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {produtos.map((produto) => (
              <th key={produto.id}>
                {produto.nome}
                <br />
                <button className="botao-remover" onClick={() => aoRemover(produto.id)}>
                  remover
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Preço</td>
            {produtos.map((produto) => (
              <td
                key={produto.id}
                className={temMaisDeUm && produto.preco === menorPreco ? 'menor-preco' : ''}
              >
                R$ {produto.preco.toFixed(2).replace('.', ',')}
                {temMaisDeUm && produto.preco === menorPreco && <span> (mais barato)</span>}
              </td>
            ))}
          </tr>
          <tr>
            <td>Tela</td>
            {produtos.map((produto) => (
              <td key={produto.id}>{produto.tela}</td>
            ))}
          </tr>
          <tr>
            <td>Processador</td>
            {produtos.map((produto) => (
              <td key={produto.id}>{produto.processador}</td>
            ))}
          </tr>
          <tr>
            <td>RAM</td>
            {produtos.map((produto) => (
              <td key={produto.id}>{produto.ram}</td>
            ))}
          </tr>
          <tr>
            <td>Armazenamento</td>
            {produtos.map((produto) => (
              <td key={produto.id}>{produto.armazenamento}</td>
            ))}
          </tr>
          <tr>
            <td>Nota</td>
            {produtos.map((produto) => (
              <td key={produto.id}>{produto.nota}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TabelaComparacao
