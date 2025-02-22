# SimplesHub Test

SimplesHub Test é uma aplicação de exemplo que permite o upload de arquivos PDF, a extração de CPFs desses arquivos e a exibição dos CPFs extraídos. A aplicação é composta por um servidor backend em Node.js e um frontend em Vue.js.

## Funcionalidades

- Upload de arquivos PDF
- Extração de CPFs dos arquivos PDF
- Exibição dos CPFs extraídos
- Paginação dos CPFs exibidos

## Requisitos

- Node.js (versão 18 ou superior)
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
FIREBASE_DATABASE_URL=https://seu-projeto.firebaseio.com
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_PRIVATE_KEY_ID=seu-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=seu-email@seu-projeto.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=seu-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/seu-email@seu-projeto.iam.gserviceaccount.com
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

Crie um arquivo `.env` na pasta `client` com as seguintes variáveis de ambiente:

```env
NODE_ENV=development
PORT=3000
FIREBASE_DATABASE_URL=https://seu-projeto.firebaseio.com
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_PRIVATE_KEY_ID=seu-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=seu-email@seu-projeto.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=seu-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/seu-email@seu-projeto.iam.gserviceaccount.com
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
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
   http://localhost:5173
   ```

## Estrutura do Projeto

```
.
├── server/   # Código do servidor backend (Node.js)
├── client/   # Código do cliente frontend (Vue.js)
```
