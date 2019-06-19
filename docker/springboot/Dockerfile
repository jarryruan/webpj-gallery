FROM openjdk:8u212-b04-jre-stretch
RUN mkdir /app
COPY ./app.jar /app
WORKDIR /app
CMD java -jar /app/app.jar
EXPOSE 8080