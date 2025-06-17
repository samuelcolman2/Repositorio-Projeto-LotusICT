import React from 'react';
import GraficoVendasPorMes from './components/GraficoVendasPorMes';
import GraficoPorVendedor from './components/GraficoPorVendedor';
import ProdutoMaisVendido from './components/ProdutoMaisVendido';
import './App.css';

function App() {
  return (
    <div className="App">
      <center>
      <h1>Dashboard de Vendas - Projeto LotusICT</h1>
      </center>
      <GraficoVendasPorMes />
      <GraficoPorVendedor />
      <ProdutoMaisVendido />
    </div>
  );
}

export default App;
