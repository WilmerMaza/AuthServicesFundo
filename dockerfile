FROM node:18-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

COPY  . /home/app

RUN npm install

RUN npm run build

EXPOSE 3002

CMD ["npm", "--", "run", "start"]
