pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    DOCKERHUB = credentials('docker-pass')
    BACKEND_IMAGE = "alonwilson/assignment3-backend"
    FRONTEND_IMAGE = "alonwilson/assignment3-frontend"
  }

  stages {
    stage('Checkout Source') {
      steps {
        checkout scm
      }
    }

    stage('Set Version Tag') {
      steps {
        script {
          VERSION = sh(script: "date +%Y%m%d-%H%M%S", returnStdout: true).trim()
          echo "Using version tag: ${VERSION}"
        }
      }
    }

    stage('Build & Push Backend') {
      steps {
        sh """
          docker login -u "$DOCKERHUB_USR" -p "$DOCKERHUB_PSW"
          docker build -t ${BACKEND_IMAGE}:${VERSION} ./backend
          docker push ${BACKEND_IMAGE}:${VERSION}
        """
      }
    }

    stage('Build & Push Frontend') {
      steps {
        sh """
          docker login -u "$DOCKERHUB_USR" -p "$DOCKERHUB_PSW"
          docker build -t ${FRONTEND_IMAGE}:${VERSION} ./frontend
          docker push ${FRONTEND_IMAGE}:${VERSION}
        """
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig-id', variable: 'KUBECONFIG')]) {
          sh """
            kubectl --insecure-skip-tls-verify=true set image deployment/student-survey-backend \
              backend-container=${BACKEND_IMAGE}:${VERSION} --namespace default

            kubectl --insecure-skip-tls-verify=true set image deployment/student-survey-frontend \
              frontend-container=${FRONTEND_IMAGE}:${VERSION} --namespace default
          """
        }
      }
    }
  }
}
