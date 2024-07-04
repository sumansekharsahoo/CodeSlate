FROM gcc:latest
WORKDIR /app
COPY . /app
COPY runCpp.sh /app
RUN chmod +x /app/runCpp.sh
CMD ["/app/runCpp.sh"]
