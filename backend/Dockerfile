FROM python:3.10-alpine
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
RUN chmod 600 /app/creds/*
EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]