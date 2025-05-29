import json
import re

# Corrigir e normalizar o JSON (remover aspas simples erradas)
def fix_json_format(input_file, output_file):
    with open(input_file, "r", encoding="utf-8") as file:
        raw_data = file.read()

    # Corrige aspas simples dentro de listas/dicionários para aspas duplas
    # fixed_data = re.sub(r'"\[\'', '["', raw_data)  # Substitui [" por [" (corrige início da lista)
    # fixed_data = re.sub(r'\'\]"', '"]', fixed_data)  # Substitui '] por "] (corrige fim da lista)
    # fixed_data = re.sub(r"', '", '", "', fixed_data)  # Substitui ', ' por ", " (corrige separadores)
    # fixed_data = re.sub(r'bookId', '_id', fixed_data) # Substitui bookId por _id 
    # fixed_data = re.sub(r'\\"','"',fixed_data)
    # fixed_data = re.sub(r'\ \'', ' "',fixed_data)
    # fixed_data = re.sub(r'\'\ ','" ',fixed_data)
    # fixed_data = re.sub(r'"\[', '[', raw_data)
    
    fixed_data = re.sub(r'"\[(.*?)\]"', r'[\1]', raw_data)
    fixed_data = re.sub(r'bookId', '_id', fixed_data)
    fixed_data = re.sub(r'\[\'', '["', fixed_data)  # Substitui [' por [" (corrige início da lista)
    fixed_data = re.sub(r'\'\]', '"]', fixed_data)  # Substitui '] por "] (corrige fim da lista)
    fixed_data = re.sub(r"', '", '", "', fixed_data)  # Substitui ', ' por ", " (corrige separadores)
    fixed_data = re.sub(r'\\"','', fixed_data)
    fixed_data = re.sub(r',\ \'', ', "',fixed_data)
    fixed_data = re.sub(r'\',','",',fixed_data)
    
    with open(output_file, "w", encoding="utf-8") as file:
        file.write(fixed_data)

# Processar o JSON
def process_json(input_file, output_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        # Processamento dos dados
        for item in data:
            if 'genres' in item:
                item['genres'] = item['genres'][1:-1]  # Normaliza nomes
            # if 'characters' in item:
            #     item['characters'] = item['characters'].strip()
            if 'characters' in item:
                item['characters'] = item['characters'][1:-1]
            if 'awards' in item:
                item['awards'] = item['awards'][1:-1]
            if 'ratingsByStars' in item:
                item['ratingsByStars'] = item['ratingsByStars'][1:-1]
            if 'setting' in item:
                item['setting'] = item['setting'][1:-1]
            
            # if 'age' in item and isinstance(item['age'], str):
            #     item['age'] = int(item['age'])  # Converte idade para inteiro
            # if 'email' in item:
            #     item['email'] = item['email'].lower()  # Normaliza email
        
        with open(output_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
        
        print(f"Processamento concluído. Arquivo salvo em {output_file}")
    except Exception as e:
        print(f"Erro ao processar JSON: {e}")

# Exemplo de uso
if __name__ == "__main__":
    input_file = "./dataset.json"  # Nome do arquivo de entrada
    fixed_file = "dataset_corrigido.json"
    output_file = "dados_processados.json"  # Nome do arquivo de saída
    
    # Primeiro, corrigir o formato do JSON
    fix_json_format(input_file, fixed_file)

    # Depois, processar os dados corretamente
    # process_json(input_file, output_file)


####### Dicas para processar dados

# if 'genres' in item:
#   item['genres'] = item['genres'][1:-1]