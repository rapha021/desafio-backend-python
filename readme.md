# Instruções para funcionamento

[Documentação | Docs](https://rapha021.github.io/desafio-backend-python/)

## Instalação da API (back-end)

## Docker

> Migrations automática

```bash
docker compose up
```

## Without Docker

> Use o pip install para instalar todas as dependencias

> Use pip install to install dependencies.

```bash
cd server
```

```bash
pip install -r requirements.txt
```

> Para iniciar o server

```bash
python manage.py runserver
```

Certifique-se de ter um banco de dados postgresql rodando localmente e o arquivo .env com as informações corretas.

Please make sure you have a postgresql database running locally and the .env file with the correct information.

## Instalação Front end

```bash
cd web
```

```bash
yarn install
```

```bash
yarn dev
```

Certifique-se de estar na pasta correta.

Please make sure to be in the correct folder.
