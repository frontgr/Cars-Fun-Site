FROM python:3.13

WORKDIR /Cars-Fun-Site

ENV FLASK_APP=/Cars-Fun-Site/back/app/app
ENV FLASK_RUN_HOST=0.0.0.0

COPY .. /Cars-Fun-Site/back
RUN pip install -r back/requirements.txt

CMD ["flask", "run"]