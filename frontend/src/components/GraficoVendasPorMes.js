import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function GraficoVendasPorMes() {
  const [dados, setDados] = useState([]);
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');

  const buscarDados = () => {
    let url = 'http://localhost:8000/vendas/por-mes';
    const params = [];

    if (ano) params.push(`ano=${ano}`);
    if (mes) params.push(`mes=${mes}`);
    if (params.length > 0) url += `?${params.join("&")}`;

    axios.get(url)
      .then((res) => setDados(res.data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  };

  useEffect(() => {
    buscarDados();
  }, []);

  // Definir os meses de acordo com o ano selecionado
  const obterMeses = () => {
    const meses = [
      { valor: 1, nome: 'Janeiro' },
      { valor: 2, nome: 'Fevereiro' },
      { valor: 3, nome: 'Março' },
      { valor: 4, nome: 'Abril' },
      { valor: 5, nome: 'Maio' },
      { valor: 6, nome: 'Junho' },
      { valor: 7, nome: 'Julho' },
      { valor: 8, nome: 'Agosto' },
      { valor: 9, nome: 'Setembro' },
      { valor: 10, nome: 'Outubro' },
      { valor: 11, nome: 'Novembro' },
      { valor: 12, nome: 'Dezembro' }
    ];

    if (ano === '2024') {
      return meses.filter(m => m.valor >= 6);
    } else if (ano === '2025') {
      return meses.filter(m => m.valor <= 5);
    } else {
      return meses;
    }
  };

  return (
    <div>
      <h2 className='margin-left'>Vendas por Mês</h2>

      <div className='margin-left' style={{ marginBottom: '20px' }}>
        <label>
          Ano:
          <select style={{ marginLeft:'5px'}} value={ano} onChange={(e) => { setAno(e.target.value); setMes(''); }}>
            <option value="">Todos</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </label>

        <label style={{ marginLeft: '10px' }}>
          Mês:
          <select style={{ marginLeft:'5px'}} value={mes} onChange={(e) => setMes(e.target.value)}>
            <option value="">Todos</option>
            {obterMeses().map(m => (
              <option key={m.valor} value={m.valor}>{m.nome}</option>
            ))}
          </select>
        </label>

        <button  onClick={buscarDados} className='btn'>Filtrar</button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Periodo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Valor (R$)" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoVendasPorMes;
