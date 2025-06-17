from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query 


app = FastAPI()

# Importação do CORS se faz necessária para comunicação do BackEnd Com FrontEnd já que rodam em portas diferentes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


df = pd.read_csv("vendas_ultimos_12_meses.csv") # Lê a planilha
df["Data"] = pd.to_datetime(df["Data"])  # converte a coluna Data que está em texto para datas


@app.get("/vendas")
def ler_vendas():
    return df.to_dict(orient="records") # Converte o DataFrame em uma lista de dicionários

@app.get("/vendas/por-mes") # Alteração para filtrar por ano
def vendas_por_mes(ano: int = Query(None), mes: int = Query(None)): # Query parameters
    df_mes = df.copy() # Criacao de uma copia do DataFrame, para nao alterar o original
    df_mes["Ano"] = df_mes["Data"].dt.year
    df_mes["Mes"] = df_mes["Data"].dt.month
    df_mes["Periodo"] = df_mes["Data"].dt.strftime("%Y-%m") 

    # Filtra para a URL
    if ano:
        df_mes = df_mes[df_mes["Ano"] == ano]
    if mes:
        df_mes = df_mes[df_mes["Mes"] == mes]

    resultado = df_mes.groupby("Periodo")["Valor (R$)"].sum().reset_index()
    return resultado.to_dict(orient="records") # Converte para uma lista de dicionario


@app.get("/vendas/por-vendedor")
def vendas_por_vendedor():
    resultado = df.groupby("Vendedor")["Valor (R$)"].sum().reset_index()
    return resultado.to_dict(orient="records")

@app.get("/produto-mais-vendido")
def produto_mais_vendido():
    resultado = df.groupby("Produto")["Valor (R$)"].sum().reset_index() # Agrupa os dados por mes e soma os valores da coluna para cada mes
    produto_top = resultado.sort_values(by="Valor (R$)", ascending=False).iloc[0] # Ordena o DF resultado pela coluna valor e faz a ordenação em ordem descrescente para deixar as maiores vendas no topo e mostra a primeira linha

    # Formata o valor com separador de milhar e vírgula como decimal
    valor = produto_top["Valor (R$)"]
    # Gambiarra para formatar no estilo brasiliero
    valor_formatado = f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".") 

    return {
        "produto": produto_top["Produto"],
        "valor_total": valor_formatado
    }