import json
import re

def fix_json_format(input_file, output_file):
    """
    Corrige erros comuns de formatação em JSONs sujos exportados de forma irregular.
    """

    with open(input_file, "r", encoding="utf-8") as file:
        raw_data = file.read()

    # Expressões regulares para corrigir formatação
    fixed_data = raw_data

    # Corrigir listas armazenadas como strings
    fixed_data = re.sub(r'"\[(.*?)\]"', r'[\1]', fixed_data)

    # Corrigir aspas simples para duplas dentro de listas/objetos
    fixed_data = re.sub(r"\[\'", "[\"", fixed_data)
    fixed_data = re.sub(r"\'\]", "\"]", fixed_data)
    fixed_data = re.sub(r"', '", '", "', fixed_data)

    # Substituir campos com nomes errados
    fixed_data = re.sub(r'"bookId"', r'"_id"', fixed_data)

    # Remover escapes extras de aspas
    fixed_data = re.sub(r'\\"', '"', fixed_data)

    # Corrigir vírgulas extras antes de colchetes/chaves fechando listas/objetos
    fixed_data = re.sub(r',\s*([\]}])', r'\1', fixed_data)

    # Corrigir strings numéricas: "123" → 123 (opcional)
    fixed_data = re.sub(r'":\s*"(\d+)"', r'": \1', fixed_data)

    with open(output_file, "w", encoding="utf-8") as file:
        file.write(fixed_data)

    print(f"✅ Formato corrigido salvo em: {output_file}")


def process_json(input_file, output_file):
    """
    Processa o JSON validado, limpando listas e campos comuns.
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as file:
            data = json.load(file)

        for item in data:
            for field in ['genres', 'characters', 'awards', 'ratingsByStars', 'setting']:
                if field in item and isinstance(item[field], str):
                    item[field] = [entry.strip().strip("'\"") for entry in item[field].strip("[]").split(",")]

            # Exemplo de normalização extra
            # if 'email' in item:
            #     item['email'] = item['email'].lower()
            # if 'age' in item and isinstance(item['age'], str) and item['age'].isdigit():
            #     item['age'] = int(item['age'])

        with open(output_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)

        print(f"✅ Dados processados e salvos em: {output_file}")

    except Exception as e:
        print(f"❌ Erro ao processar JSON: {e}")


if __name__ == "__main__":
    # Arquivos de entrada e saída
    input_file = "./dataset.json"
    fixed_file = "dataset_corrigido.json"
    output_file = "dados_processados.json"

    # Etapas
    fix_json_format(input_file, fixed_file)
    process_json(fixed_file, output_file)
