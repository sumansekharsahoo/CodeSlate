FROM openjdk:11
WORKDIR /app
COPY . /app
COPY runJava.sh /app
RUN chmod +x /app/runJava.sh
CMD ["/app/runJava.sh"]
