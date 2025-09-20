# Usa imagem oficial do Node 16
FROM node:16

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (para cache otimizado)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Compila o código (se estiver usando TypeScript)
RUN npm run build

# Expõe a porta (Nest usa 3000 por padrão)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]