import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function GraficoVendasPorMes() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/vendas/por-mes')
      .then((res) => setDados(res.data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(payload[0].value);

      return (
        <div style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`${payload[0].payload.Mes}: ${valorFormatado}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h2>Vendas por Mês</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Mes" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
              }).format(value)
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Valor (R$)" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoVendasPorMes;
