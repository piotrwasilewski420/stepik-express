FROM node:14.15.4-alpine3.12
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]