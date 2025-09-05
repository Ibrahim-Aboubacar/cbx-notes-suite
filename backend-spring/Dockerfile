# ----- STAGE 1: Build -----
# Utilise Maven avec Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Répertoire de travail
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

# Compilation du projet
RUN mvn package -DskipTests


# ----- STAGE 2: Runtime -----
# Image légère avec le JRE Java 21
FROM eclipse-temurin:21-jre

# Répertoire de travail
WORKDIR /app

# Copie du .jar depuis l'étape de build
COPY --from=build /app/target/*.jar app.jar

# Exposition du port
EXPOSE 8080

# Commande de démarrage
ENTRYPOINT ["java", "-jar", "app.jar"]