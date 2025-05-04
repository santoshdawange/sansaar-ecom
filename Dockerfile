FROM node:20-alpine3.20 AS build

WORKDIR /usr/src/app
CMD ["pwd"]
COPY ./package.json ./
RUN npm install
COPY ./. .
RUN npm run build

FROM nginx:1.14.1-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
