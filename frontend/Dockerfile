FROM node:22.9.0-alpine
WORKDIR /app/et-frontend
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]