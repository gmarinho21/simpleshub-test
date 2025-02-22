# Use a imagem base do Node.js
FROM node:22-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código-fonte para o diretório de trabalho
COPY . .

# Compile a aplicação para produção
RUN npm run build

# Use uma imagem base do Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copie os arquivos compilados para o diretório padrão do Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponha a porta 80 para acessar a aplicação
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]