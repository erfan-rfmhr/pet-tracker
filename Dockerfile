from docker.arvancloud.ir/python:slim
workdir /app
copy requirements.txt requirements.txt
run pip install -r requirements.txt
copy . . 
