# pull official base image
FROM python:3.10-alpine

RUN apk update && apk add apache2 apache2-dev build-base libffi-dev jpeg-dev
RUN pip install mod_wsgi

# set work directory
WORKDIR /usr/src/app

# Fix for alpine image
RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .

RUN chmod +x ./entrypoint.sh
RUN chown -R www-data:www-data /usr/src/app

USER www-data

ENTRYPOINT [ "./entrypoint.sh" ]
