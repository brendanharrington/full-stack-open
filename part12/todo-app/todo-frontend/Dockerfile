FROM node:20 as build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.28-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html