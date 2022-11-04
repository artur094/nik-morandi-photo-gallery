#!/bin/sh

SQL_HOST="${SQL_HOST:-db}"
SQL_PORT="${SQL_PORT:-5432}"

chown -R app:app $APP_HOME
chown -R app:app $APP_HOME/static
chown -R app:app $APP_HOME/media

while ! nc -z $SQL_HOST $SQL_PORT; do
  sleep 0.1
done

echo "PostgreSQL started"

python manage.py collectstatic --no-input
python manage.py flush --no-input
python manage.py migrate

exec "$@"