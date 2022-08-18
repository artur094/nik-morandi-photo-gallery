#!/bin/sh

SQL_HOST="${SQL_HOST:-db}"
SQL_PORT="${SQL_PORT:-5432}"

while ! nc -z $SQL_HOST $SQL_PORT; do
  sleep 0.1
done

echo "PostgreSQL started"

python manage.py migrate
python manage.py collectstatic --no-input

mkdir -p /usr/src/app/media/
chown -R "$MOD_WSGI_USER" /usr/src/app/media/
chown -R "$MOD_WSGI_USER" /usr/src/app/static/

exec mod_wsgi-express start-server \
     --log-to-terminal \
     --startup-log \
     --port 80 \
     --url-alias /static /usr/src/app/static \
     --url-alias /media /usr/src/app/media \
     "backend/wsgi.py"