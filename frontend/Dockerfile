# base image
FROM nginx:1.23.1-alpine

# expose port 80
EXPOSE 80

COPY ./www /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# run nginx
CMD ["nginx", "-g", "daemon off;"]
