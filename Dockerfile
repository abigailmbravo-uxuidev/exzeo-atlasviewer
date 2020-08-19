FROM node:12-alpine

LABEL maintainer=Exzeo

RUN apk update && apk upgrade && \
  apk --no-cache add bash libc6-compat && \
  addgroup -S docker && adduser -S -G docker docker

COPY ./package.json /app/package.json
WORKDIR /app
RUN npm install && \
  npm cache clean --force

COPY . /app

CMD ["npm", "start"]