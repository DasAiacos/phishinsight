FROM jenkins/jenkins:lts

USER root

# Instalar Docker CLI
RUN apt-get update && \
    apt-get install -y docker.io curl && \
    apt-get clean

# Instalar plugin de Docker Compose v2 (comando "docker compose")
# No está disponible en los repos de Debian, se descarga el binario oficial
RUN mkdir -p /usr/local/lib/docker/cli-plugins && \
    curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
    -o /usr/local/lib/docker/cli-plugins/docker-compose && \
    chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Dar permisos al usuario jenkins para usar el socket de Docker
RUN usermod -aG docker jenkins

# Evitar error "dubious ownership" de Git cuando el contenedor corre como root
# pero los workspaces son propiedad del usuario jenkins
RUN git config --global --add safe.directory '*'

USER jenkins