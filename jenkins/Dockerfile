FROM jenkins/jenkins:lts

USER root

# Instalar Docker CLI
RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean

# Dar permisos
RUN usermod -aG docker jenkins

USER jenkins