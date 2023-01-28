arquivo = open("CNAB.txt", "r")

arquivo_lista = arquivo.readlines()

arquivo_dict_list = list()

for linha in arquivo_lista:
    dict = {
        "type": linha[0],
        "date": linha[1:9],
        "value": linha[9:19],
        "cpf": linha[19:30],
        "card": linha[30:42],
        "hour": linha[42:48],
        "store_owner": linha[48:62],
        "store_name": linha[62:80],
    }
    arquivo_dict_list.append(dict)
