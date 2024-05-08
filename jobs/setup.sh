#!/bin/sh
export ENVIRONMENT=DEV
mkdir -p ~/emotipress/celery/logs/
mkdir -p ~/emotipress/celery-beat/logs/
celery worker -A jobs.headlines.get_headlines --loglevel=info  -f ~/emotipress/logs/headlines-worker.log -Q headlines
celery -A get_headlines beat --loglevel=info -f ~/emotipress/celery-beat/logs/headlines-beat.log
