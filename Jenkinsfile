pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "phishinsights"
  }

  stages {

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

    stage('Docker Test') {
    steps {
        sh 'docker ps'
    }
    }

  post {
    always {
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