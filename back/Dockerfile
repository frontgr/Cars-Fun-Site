FROM python:alpine

WORKDIR /Cars-Fun-Site

ENV FLASK_APP=/Cars-Fun-Site/back/app/app
ENV FLASK_RUN_HOST=0.0.0.0

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY .. /Cars-Fun-Site/back

CMD ["flask", "run"]