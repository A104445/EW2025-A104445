import json 
import os 
import shutil

def open_json(filename):
    with open(filename,'r',encoding='utf-8')as file:
        data = json.load(file)
        
        #quando temos texto e nao a referencia do ficheiro
        #fileText = file.read()
        #data = json.loads(fileText)
    
    return data

def mk_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)    
        
def new_file(filename,content):
    f = open(filename, 'w', encoding='utf-8')
    f.write(html)
    f.close()          
        
# lista_nif = []
# lista_matriculas = []
json_obj = open_json('dataset_reparacoes.json')
#print(json_obj)

# for reparacao in json_obj['reparacoes']:
#     nif = reparacao['nif']
#     matricula = reparacao['viatura']['matricula']
    
#     #verifica nif
#     if(nif in lista_nif):
#         print(f'O nif {nif} já existe')
#     else:
#         lista_nif.append(nif)
        
#     if(matricula in lista_matriculas):
#         print(f'A matricula {matricula} já existe')
#     else:
#         lista_matriculas.append(matricula)
        
        
#Lista de reparações

html = '''
<html>
    <head>
        <title>Reparações</title>
    </head>
    <body>
        <h1>Reparações</h1>
        <ul>
'''
json_obj = open_json('dataset_reparacoes.json')
for reparacao in json_obj['reparacoes']:
    data = reparacao['data']
    nif = reparacao['nif']
    nome = reparacao['nome']
    marca = reparacao['viatura']['marca']
    modelo = reparacao['viatura']['modelo']
    nr_intervencoes = reparacao['nr_intervencoes']

    html += f'<li>{data} || {nif} || {nome} || {marca} || {modelo} || {nr_intervencoes}</li>'
    
html += '''
        </ul>
    </body>
'''

new_file('lista_geral.html',html)

#Lista de intervenções

html = '''
<html>
    <head>
        <title>Intervenções</title>
    </head>
    <body>
        <h1>Intervenções</h1>
        <ul>
'''
map_intervencoes = {}
json_obj = open_json('dataset_reparacoes.json')
for reparacao in json_obj['reparacoes']:
    for intervencao in reparacao['intervencoes']:
        map_intervencoes[intervencao['codigo']] = intervencao
        
for codigo in sorted(map_intervencoes.keys()):
    nome = map_intervencoes[codigo]['nome']
    descricao = map_intervencoes[codigo]['descricao']
    
    html += f'<li>{codigo} || {nome} || {descricao}</li>'
    
html += '''
        </ul>
    </body>
'''

new_file('lista_intervencoes.html',html)

#Lista de Carros

html = '''
<html>
    <head>
        <title>Carros</title>
    </head>
    <body>
        <h1>Carros</h1>
        <ul>
'''
lista_marca = {}
lista_modelo = {}
json_obj = open_json('dataset_reparacoes.json')
for reparacao in json_obj['reparacoes']:
    viatura = reparacao['viatura']
    marca = viatura['marca']

    if marca in lista_marca:
        modelo = viatura['modelo']
        if modelo in lista_marca[marca]:
            lista_marca[marca][modelo] += 1
        else:
            lista_marca[marca][modelo] = 1
    else:
        lista_marca[marca] = {}
        lista_marca[marca][viatura['modelo']] = 1
        
for marca in sorted(lista_marca.keys()):
    count_marca = 0
    html_modelos = '<ul>'
    modelos = lista_marca[marca]
    for modelo in sorted(modelos.keys()):
        count = lista_marca[marca][modelo]
        count_marca += count
        html_modelos += f'<li>{modelo} - #{count}</li>'
    html_modelos = '</ul>'
    html += f'<li>{marca} - #{count_marca}</li>'
    html += html_modelos
    
html += '''
        </ul>
    </body>
'''

new_file('lista_carros.html',html)