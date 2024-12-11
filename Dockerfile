FROM node:18.20.5-bullseye AS build
WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build --configuration=production

FROM nginx:stable-perl
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/miki-demo-frontend/browser /usr/share/nginx/html

