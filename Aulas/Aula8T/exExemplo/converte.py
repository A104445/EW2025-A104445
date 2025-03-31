import json
import ast

def convert_stringified_lists(data):
    """
    Percorre um dicionário e converte valores que são listas em formato de string para listas reais.
    """
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, str):
                try:
                    parsed_value = ast.literal_eval(value)
                    if isinstance(parsed_value, list):
                        data[key] = parsed_value
                except (ValueError, SyntaxError):
                    pass
            elif isinstance(value, (dict, list)):
                convert_stringified_lists(value)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            if isinstance(item, str):
                try:
                    parsed_item = ast.literal_eval(item)
                    if isinstance(parsed_item, list):
                        data[i] = parsed_item
                except (ValueError, SyntaxError):
                    pass
            elif isinstance(item, (dict, list)):
                convert_stringified_lists(item)

def process_json_file(input_file, output_file):
    """Lê um arquivo JSON, converte listas representadas como strings e salva o resultado."""
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    convert_stringified_lists(data)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# Exemplo de uso:
# process_json_file('entrada.json', 'saida.json')
