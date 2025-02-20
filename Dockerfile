FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN mkdir -p /app/logs && chmod 777 /app/logs

EXPOSE 3001

CMD ["node", "index.js"]