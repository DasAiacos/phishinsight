pipeline {

    agent any

    environment {
        BACKEND_IMAGE = 'TU_USUARIO/phishinsight-backend'
        FRONTEND_IMAGE = 'TU_USUARIO/phishinsight-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./Backend'
                sh 'docker build -t $FRONTEND_IMAGE ./Frontend'
            }
        }

        stage('Push Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                    sh 'docker push $BACKEND_IMAGE'
                    sh 'docker push $FRONTEND_IMAGE'
                }
            }
        }

    }
}