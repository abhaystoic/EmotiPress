#!/bin/sh
# apt-get install rabbitmq-server

export ENVIRONMENT=DEV

mkdir -p ~/emotipress-logs/celery/logs/
mkdir -p ~/emotipress-logs/celery-beat/logs/
# celery -A jobs.headlines.get_headlines worker --loglevel=info  -f ~/emotipress-logs/celery/logs/headlines-worker.log -Q headlines &
# celery -A jobs.headlines.get_headlines beat --loglevel=info -f ~/emotipress-logs/celery/logs/headlines-beat.log &
