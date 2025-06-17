from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Importação do CORS se faz necessária para comunicação do BackEnd Com FrontEnd já que rodam em portas diferentes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


df = pd.read_csv("vendas_ultimos_12_meses.csv")
df["Data"] = pd.to_datetime(df["Data"])  # converter coluna para datas


@app.get("/vendas")
def ler_vendas():
    return df.to_dict(orient="records")

@app.get("/vendas/por-mes")
def vendas_por_mes():
    df_mes = df.copy()
    df_mes["Mes"] = df_mes["Data"].dt.strftime("%Y-%m")
    resultado = df_mes.groupby("Mes")["Valor (R$)"].sum().reset_index()
    return resultado.to_dict(orient="records")

@app.get("/vendas/por-vendedor")
def vendas_por_vendedor():
    resultado = df.groupby("Vendedor")["Valor (R$)"].sum().reset_index()
    return resultado.to_dict(orient="records")

@app.get("/produto-mais-vendido")
def produto_mais_vendido():
    resultado = df.groupby("Produto")["Valor (R$)"].sum().reset_index()
    produto_top = resultado.sort_values(by="Valor (R$)", ascending=False).iloc[0]

    # Formata o valor com separador de milhar e vírgula como decimal
    valor = produto_top["Valor (R$)"]
    # Gambiarra para formatar no estilo brasiliero
    valor_formatado = f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".") 

    return {
        "produto": produto_top["Produto"],
        "valor_total": valor_formatado
    }