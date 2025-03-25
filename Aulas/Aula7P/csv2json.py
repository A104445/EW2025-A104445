import csv
import json

# Função para converter valores numéricos com vírgula para ponto
def convert_value(value):
    if value:
        # Substitui vírgula por ponto para valores decimais
        return value.replace(",", ".") if "." not in value else value
    return value

# Função para ler o arquivo CSV e gerar documentos JSON
def csv_to_json(csv_file, json_file):
    with open(csv_file, mode='r', encoding='utf-8') as csvfile:
        csvreader = csv.DictReader(csvfile, delimiter=';')

        data = []
        for row in csvreader:
            # Converte os valores conforme necessário
            document = {
                "idcontrato": row["idcontrato"],
                "nAnuncio": row["nAnuncio"] if row["nAnuncio"] else None,
                "tipoprocedimento": row["tipoprocedimento"] if row["tipoprocedimento"] else None,
                "objectoContrato": row["objectoContrato"] if row["objectoContrato"] else None,
                "dataPublicacao": row["dataPublicacao"],
                "dataCelebracaoContrato": row["dataCelebracaoContrato"],
                "precoContratual": convert_value(row["precoContratual"]),
                "prazoExecucao": row["prazoExecucao"],
                "NIPC_entidade_comunicante": row["NIPC_entidade_comunicante"],
                "entidade_comunicante": row["entidade_comunicante"] if row["entidade_comunicante"] else None,
                "fundamentacao": row["fundamentacao"] if row["fundamentacao"] else None
            }

            # Adiciona o documento convertido à lista
            data.append(document)

        # Escreve o arquivo JSON
        with open(json_file, mode='w', encoding='utf-8') as jsonfile:
            json.dump(data, jsonfile, ensure_ascii=False, indent=4)

# Chamada da função, você pode substituir os caminhos dos arquivos conforme necessário
csv_file = 'contratos2024.csv'  # Caminho para o arquivo CSV de entrada
json_file = 'dados.json'  # Caminho para o arquivo JSON de saída
csv_to_json(csv_file, json_file)

print("Conversão concluída com sucesso!")
