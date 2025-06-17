import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const cores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#8884d8'];

function GraficoPorVendedor() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/vendas/por-vendedor')
            .then((res) => setDados(res.data))
            .catch((err) => console.error("Erro ao buscar dados:", err));
    }, []);
    return (
        <div>
            <h2>Vendas por Vendedor</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={dados}
                        dataKey="Valor (R$)"
                        nameKey="Vendedor"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={(entry) => {
                            const nome = entry.name;
                            const valor = entry.value;

                            const valorFormatado = new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                minimumFractionDigits: 2,
                            }).format(valor);

                            return `${nome}: ${valorFormatado}`;
                        }}
                    >
                        {dados.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraficoPorVendedor;
