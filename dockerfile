FROM node:20

RUN mkdir -p /home/app

WORKDIR /home/app

COPY  . /home/app

RUN npm cache clean --force && npm install

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]