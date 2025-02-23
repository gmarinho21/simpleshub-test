# SimplesHub Test

SimplesHub Test é uma aplicação para o teste técnico da SimplesHub. A aplicação permite o upload de arquivos PDF, a extração de CPFs desses arquivos e a exibição dos CPFs extraídos. A aplicação é composta por um servidor backend em Node.js e um frontend em Vue.js.

Live link:
https://tech.test.gabrielm.com.br

## Funcionalidades

- Upload de arquivos PDF
- Extração de CPFs dos arquivos PDF
- Exibição dos CPFs extraídos
- Paginação dos CPFs exibidos

## Requisitos

- Node.js (versão 22 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/gmarinho21/simpleshub-test.git
   cd simpleshub-test
   ```

2. Instale as dependências do servidor backend:

   ```sh
   cd server
   npm install
   ```

3. Instale as dependências do cliente frontend:

   ```sh
   cd ../client
   npm install
   ```

## Configuração

Crie um arquivo `.env` na pasta `server` com as seguintes variáveis de ambiente:

```env
NODE_ENV=development
PORT=3000
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=
```

Crie um arquivo `.env` na pasta `client` com as seguintes variáveis de ambiente:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_DATABASE_URL=
```

## Executando a Aplicação

1. Inicie o servidor backend:

   ```sh
   cd server
   npm run dev
   ```

2. Inicie o cliente frontend:

   ```sh
   cd ../client
   npm run dev
   ```

3. Acesse a aplicação no navegador:

   ```
   http://localhost
   ```

Ou com o Docker Compose

1. Docker-compose
   
   ```
   docker-compose up
   ```

## Estrutura do Projeto

```
.
├── server/   # Código do servidor backend (Node.js)
├── client/   # Código do cliente frontend (Vue.js)
```
