pipeline {
  agent any

  stages {

    stage('Clone') {
      steps {
        git branch: 'main', url: 'https://github.com/DasAiacos/phishinsight.git'
      }
    }

    stage('Build Info') {
      steps {
        echo 'Repositorio clonado correctamente'
        sh 'ls -la'
      }
    }
  }
}