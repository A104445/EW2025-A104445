import json
import re

# Função para tentar converter strings numéricas
def convert_if_number(value):
    try:
        if '.' in value:
            return float(value)
        return int(value)
    except:
        return value

# Função para corrigir listas mal formatadas no JSON
def parse_list_field(field):
    if isinstance(field, str):
        # Remove colchetes e quebra a string em elementos
        cleaned = field.strip("[]").strip()
        if not cleaned:
            return []
        items = [item.strip(" '\"") for item in cleaned.split(",")]
        return items
    elif isinstance(field, list):
        return field
    else:
        return []

# Função específica para converter string de autores numa lista
def parse_authors_field(field):
    if isinstance(field, str):
        # Divide por vírgulas, remove espaços e aspas
        authors = [author.strip(" '\"") for author in field.split(",") if author.strip()]
        return authors
    elif isinstance(field, list):
        return field
    else:
        return []

# Corrigir e limpar o dataset
def clean_dataset(input_file, output_file):
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    cleaned_data = []

    for item in data:
        cleaned_item = {}

        for key, value in item.items():
            # Corrigir campo de ID
            if key == "bookId":
                cleaned_item["_id"] = value
            # Corrigir campos de listas que vêm como strings
            elif key in ["genres", "characters", "awards", "ratingsByStars", "setting"]:
                cleaned_item[key] = parse_list_field(value)
            # Campo autores
            elif key == "author":
                cleaned_item[key] = parse_authors_field(value)
            # Campos que devem ser convertidos para números
            elif key in ["rating", "numRatings", "likedPercent", "bbeScore", "bbeVotes", "price"]:
                cleaned_item[key] = convert_if_number(value)
            # Campo pages: converter para int se possível
            elif key == "pages":
                cleaned_item[key] = convert_if_number(value)
            else:
                cleaned_item[key] = value

        cleaned_data.append(cleaned_item)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(cleaned_data, f, indent=4, ensure_ascii=False)

    print(f"✅ Dataset limpo guardado em: {output_file}")

# Usar
if __name__ == "__main__":
    input_file = "dataset.json"
    output_file = "dataset_corrigido.json"
    clean_dataset(input_file, output_file)
