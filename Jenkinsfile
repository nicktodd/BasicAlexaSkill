#!/usr/bin/env groovy
pipeline {
    agent {
        docker {
          reuseNode true
          image "node"
          
        }
      }
  options { skipDefaultCheckout()
            disableConcurrentBuilds()
          }

  stages {
    stage('Build Dependencies') {
      steps {
        checkout scm 
        sh "cd lambda/custom && npm install"
      }
    }
      
    
    stage('Test') {
      
      steps {
        sh  "cd lambda/custom && npm test"
      }
    }

     stage('Package') {
      
      steps {
        sh  "cd lambda/custom && npm run build-aws-resource"
      }
    }
  
  
}
}
