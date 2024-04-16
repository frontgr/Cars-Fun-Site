FROM python:latest

WORKDIR /Cars-Fun-Site

ENV FLASK_APP=/Cars-Fun-Site/server/app/app
ENV FLASK_RUN_HOST=0.0.0.0

RUN apt-get update && apt-get install -y libjpeg-dev zlib1g-dev
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY .. /Cars-Fun-Site/server
CMD ["flask", "run"]