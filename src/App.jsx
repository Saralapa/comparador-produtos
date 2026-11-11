import produtos from './data/produtos.json'
import ListaProdutos from './components/ListaProdutos'

// componente principal do site
function App() {
  return (
    <div className="pagina">
      <header className="topo">
        <h1>Comparador de Produtos</h1>
        <p>Compare celulares e notebooks antes de comprar</p>
      </header>

      <main className="conteudo">
        <ListaProdutos produtos={produtos} />
      </main>

      <footer className="rodape">
        <p>Trabalho de Integração Contínua - UTFPR</p>
      </footer>
    </div>
  )
}

export default App
