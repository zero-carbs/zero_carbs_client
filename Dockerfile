FROM node:22-alpine
RUN mkdir -p /app/client
WORKDIR /app/client
COPY . .
EXPOSE 5173
RUN npm install
