FROM node:18.20-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./ 

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]
