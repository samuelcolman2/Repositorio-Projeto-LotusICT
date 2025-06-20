import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProdutoMaisVendido() {
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/produto-mais-vendido')
      .then((res) => setProduto(res.data))
      .catch((err) => console.error("Erro ao buscar produto:", err));
  }, []);

  if (!produto) return <p>Carregando...</p>;

  return (
    <div style={{
      border: '2px solid #00C49F',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px 0',
      textAlign: 'center',
      backgroundColor: '#f0f8ff'
    }}>
      <h2>Produto Mais Vendido</h2>
      <h3>{produto.produto}</h3>
      <p>Total Vendido: <strong>{produto.valor_total}</strong></p>
    </div>
  );
}

export default ProdutoMaisVendido;
