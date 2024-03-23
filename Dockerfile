FROM docker.arvancloud.ir/python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get upgrade -y

WORKDIR /app

COPY  requirements.txt requirements.txt

RUN python -m pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py migrate

RUN python manage.py dummydata 2 2

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
