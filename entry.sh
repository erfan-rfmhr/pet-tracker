#!/bin/sh

python manage.py migrate && python manage.py dummydata 10 2 && python manage.py collectstatic 
