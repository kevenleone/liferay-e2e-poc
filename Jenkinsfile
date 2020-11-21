pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:10'
    }
  }

  stages {
    stage('Prepare') {
    	steps {
				sh "npm install -g yarn"
      	sh "yarn install"
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
        
        sh "yarn test:cypress:ci"
      }
    }
  }
}
