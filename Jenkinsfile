pipeline {
  agent {
    docker {
      image 'cypress/browsers:node12.16.2-chrome81-ff75'
    }
  }

  stages {
       stage('prepare') {
        steps {
          echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
          sh 'yarn install'
          sh 'yarn test:cypress:verify'
        }
    }
      
    stage('test') {
      steps {
        sh "CYPRESS_BASE_URL=${params.CYPRESS_BASE_URL} yarn test:cypress:ci"
      }
    }
  }

    post {
        always {
            archiveArtifacts artifacts:  "**/*.mp4", fingerprint: true
        }
    }
}
