# Desafio back-end em Python

> Projeto com intuito de demostrar minhas habilidades com as tecnologias utilizadas e para própio aprendizado.

[Documentação | Docs](https://rapha021.github.io/desafio-backend-python/)

## Projeto consiste em uma API RestFUL que:

- Cria uma conta e faz a autenticação do usuário;
- Aceita o recebimento do arquivo CNAB via POST request, para parseamento dos dados e salva no banco de dados de forma legível;
- Retorna todos os dados salvos com páginação;

## Front end:

- Contem páginas de registro, login e dashboard;
- Formulário para envio do arquivo CNAB.txt;
- Tabela para fácil leitura dos dados que vem do banco de dados;

# Linguagens utilizadas no projeto:

## Back end:

<div style="display: flex; gap: 10px; flex-wrap: wrap">
    <img align="center" alt="python" src="https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white"/>
    <img align="center" alt="django" src="https://img.shields.io/badge/Django-154915?style=for-the-badge&logo=django&logoColor=white"/>
    <img align="center" alt="djangorest" src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray"/>
    <img align="center" alt="postgresql" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
    <img align="center" alt="jwt" src="https://img.shields.io/badge/json%20web%20token-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/>
</div>

## Front end:

<div style="display: flex; gap: 10px; flex-wrap: wrap">
    <img align="center" alt="typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img align="center" alt="react.js" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    <img align="center" alt="Chakra-ui" src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white"/>
    <img align="center" alt="styledcomponents" src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
    <img align="center" alt="react-router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
</div>

# Instruções para funcionamento

## Instalação da API (back-end)

## Docker

> Migrations automática

```bash
cd server
```

```bash
docker compose up
```

> Deixe db no POSTGRES_HOST, para se conectar a database no docker

```bash
##.env
POSTGRES_HOST=db
```

## Without Docker

> Use o pip install para instalar todas as dependencias

> Use pip install to install dependencies.

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
