FROM nginx:1.21.5-alpine
WORKDIR /app
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist ./
