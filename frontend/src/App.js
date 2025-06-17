import React from 'react';
import GraficoVendasPorMes from './components/GraficoVendasPorMes';
import GraficoPorVendedor from './components/GraficoPorVendedor';
import ProdutoMaisVendido from './components/ProdutoMaisVendido';

function App() {
  return (
    <div className="App">
      <h1>Dashboard de Vendas - Projeto LotusICT</h1>
      <GraficoVendasPorMes />
      <GraficoPorVendedor />
      <ProdutoMaisVendido />
    </div>
  );
}

export default App;
