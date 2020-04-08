FROM node:12-alpine

LABEL maintainer=Exzeo

RUN apk update && apk --no-cache add bash libc6-compat g++ make python

ARG NPM_TOKEN

WORKDIR /app

COPY . ./

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc

# Install app
RUN npm ci && \
 mv .default.env .env && \
 npm run build && \
 npm cache clean --force

RUN rm -f .npmrc

CMD ["npm", "run", "start"]