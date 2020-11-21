pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/browsers:node12.16.2-chrome81-ff75'
    }
  }

  stages {
       stage('build') {
        steps {
          // there a few default environment variables on Jenkins
          // on local Jenkins machine (assuming port 8080) see
          // http://localhost:8080/pipeline-syntax/globals#env
          echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
          sh 'yarn install'
          sh 'yarn test:cypress:verify'
        }
    }
      
    stage('build and test') {
    //   environment {
        // we will be recording test results and video on Cypress dashboard
        // to record we need to set an environment variable
        // we can load the record key variable from credentials store
        // see https://jenkins.io/doc/book/using/using-credentials/
        // CYPRESS_RECORD_KEY = credentials('cypress-record-key')
    //   }

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
