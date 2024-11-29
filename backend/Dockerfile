FROM --platform=linux/amd64 node:18-alpine3.18
WORKDIR /app/ExpenseTracker-backend
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]