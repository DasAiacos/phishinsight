pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "phishinsights"
  }

  stages {

    stage('Cleanup Previous Run') {
      steps {
        sh 'docker compose down --remove-orphans || true'
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker compose build'
      }
    }

    stage('Start Services') {
      steps {
        sh 'docker compose up -d'
      }
    }

    stage('Verify Containers') {
      steps {
        sh 'docker ps'
      }
    }
  }

  post {
    always {
      sh 'docker compose down'
      echo 'Pipeline ejecutado'
    }

    success {
      echo 'Build y deploy OK'
    }

    failure {
      echo 'Pipeline falló'
    }
  }
}