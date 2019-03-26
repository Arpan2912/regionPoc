FROM node:8.12-alpine
RUN apk update && apk add vim && apk add nodejs-npm && apk add bash 
RUN apk add --update \
  python \
  python-dev \
  py-pip \
  build-base \
  && rm -rf /var/cache/apk/*
RUN npm install --upgrade npm && mkdir /app && npm config set unsafe-perm true && npm i pm2 -g
WORKDIR /app
COPY . /app/
COPY .env /app/
RUN npm install
EXPOSE 3001
CMD pm2 start bin/www && pm2 logs && tail -f /dev/null