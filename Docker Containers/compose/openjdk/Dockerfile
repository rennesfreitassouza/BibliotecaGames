FROM openjdk:11
COPY Main.jar /frontJava/com/front/
WORKDIR /frontJava/com/front/
ENTRYPOINT ["java", "-cp", "Main.jar","com.front.Main" ]
#Para compilar: docker build -t frontjava .
#Para executar: docker run -i frontjava /sh
#Executar jar file: java -cp Main.jar com.front.Main

