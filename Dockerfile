FROM node:10

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install


EXPOSE 3777

CMD npm run seed && \
    npm start