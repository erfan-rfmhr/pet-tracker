FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get upgrade -y

WORKDIR /app

COPY  requirements.txt requirements.txt

RUN python -m pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod 777 entry.sh

RUN ./entry.sh

EXPOSE 8000

CMD ["uvicorn","config.asgi:application","--host","0.0.0.0","--port","8000","--reload"]
