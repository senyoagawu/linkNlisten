FROM python:3.8

WORKDIR /app

EXPOSE 5000

COPY ./app /app/app
COPY ./migrations /app/migrations
COPY ./entrypoint.sh /app/entrypoint.sh
COPY ./requirements.txt /app/requirements.txt
COPY ./database.py /app/database.py
COPY ./linknlisten.py /app/linknlisten.py

RUN chmod +x /app/entrypoint.sh