Esse projeto é parte do processo sseletivo da LOTUSICT

#  Repositorio-Projeto-LotusICT

Este projeto é um dashboard interativo que mostra dados de vendas a partir de um arquivo CSV. Ele é dividido em dois componentes: um backend com FastAPI que serve os dados e um frontend com React que exibe os gráficos.

##  Requisitos
- Python 3.10 ou superior
- Node.js (versão 18 ou superior)
- Git
- pip
- npm ou yarn

##  Como rodar o projeto localmente

Clone o repositório:
git clone https://github.com/samuelcolman2/Repositorio-Projeto-LotusICT.git
cd Repositorio-Projeto-LotusICT

### Backend (FastAPI)
cd backend

Crie um ambiente virtual:
python -m venv venv
venv\Scripts\activate (Windows)
source venv/bin/activate (Linux/macOS)

Instale as dependências:
pip install -r requirements.txt

Adicione o arquivo vendas_ultimos_12_meses.csv na pasta backend (mesmo nível do main.py). O arquivo deve conter as colunas: Data, Valor (R$), Vendedor, Produto
(O arquivo vendas_ultimos_12_meses.csv está na raiz junto com o arquivo main.py)

Inicie o servidor:
uvicorn main:app --reload

Acesse a documentação da API:
http://localhost:8000/docs

### Frontend (React)
Abra outro terminal:
cd frontend

Instale as dependências:
npm install

Inicie o servidor:
npm start

Acesse:
http://localhost:3000

## Funcionalidades
- Gráfico de pizza com total vendido por vendedor
- Gráfico de barras com vendas por mês
- Consumo direto da API FastAPI

## Endpoints do Backend
GET /vendas — Lista todas as vendas  
GET /vendas/por-mes — Vendas agrupadas por mês  
GET /vendas/por-vendedor — Total vendido por vendedor  
GET /produto-mais-vendido — Produto com maior valor total de vendas

## Tecnologias Utilizadas
FastAPI, Uvicorn, Pandas, React, Axios, Recharts

## Autor
Feito por Samuel Colman