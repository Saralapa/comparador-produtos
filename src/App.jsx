import { useState } from 'react'
import produtos from './data/produtos.json'
import ListaProdutos from './components/ListaProdutos'

// componente principal do site
function App() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('todos')
  const [selecionados, setSelecionados] = useState([])
  const [aviso, setAviso] = useState('')

  // filtra pelo nome e pela categoria escolhida
  const produtosFiltrados = produtos.filter((produto) => {
    const nomeOk = produto.nome.toLowerCase().includes(busca.toLowerCase())
    const categoriaOk = categoria === 'todos' || produto.categoria === categoria
    return nomeOk && categoriaOk
  })

  // marca ou desmarca um produto para comparar (no maximo 3)
  function alternarSelecao(id) {
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter((item) => item !== id))
      setAviso('')
    } else if (selecionados.length >= 3) {
      setAviso('Você só pode comparar até 3 produtos')
    } else {
      setSelecionados([...selecionados, id])
      setAviso('')
    }
  }

  return (
    <div className="pagina">
      <header className="topo">
        <h1>Comparador de Produtos</h1>
        <p>Compare celulares e notebooks antes de comprar</p>
      </header>

      <main className="conteudo">
        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar pelo nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="celular">Celulares</option>
            <option value="notebook">Notebooks</option>
          </select>
        </div>

        <p className="info-selecao">Selecionados para comparar: {selecionados.length} de 3</p>
        {aviso && <p className="aviso">{aviso}</p>}

        <ListaProdutos
          produtos={produtosFiltrados}
          selecionados={selecionados}
          aoSelecionar={alternarSelecao}
        />
      </main>

      <footer className="rodape">
        <p>Trabalho de Integração Contínua - UTFPR</p>
      </footer>
    </div>
  )
}

export default App
