FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "migrate"]

CMD ["python", "manage.py", "import_food_trucks", "https://data.sfgov.org/resource/rqzj-sfat.json"]

CMD ["python", "manage.py", "runserver",  "0.0.0.0:8000"]

