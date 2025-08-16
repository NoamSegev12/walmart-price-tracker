FROM node:20 as builder

WORKDIR /app

COPY client/package*.json ./

RUN npm ci

COPY client ./

RUN npm run build

FROM python:3.10

WORKDIR /app

COPY server/requirements.txt ./

RUN pip install -r requirements.txt

COPY server ./

COPY --from=builder /app/dist ./static

RUN cp ./static/index.html ./templates/

EXPOSE 5000

CMD ["python", "-u", "main.py"]
