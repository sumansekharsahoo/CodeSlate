FROM node:latest
WORKDIR /app
COPY . /app
COPY runJS.sh /app
RUN chmod +x /app/runJS.sh
CMD ["/app/runJS.sh"]
