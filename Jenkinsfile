pipeline {
    agent any

    tools { nodejs "node"}

    environment  {
        DOCKERHUB_CRED = credentials('docherhub-token')
    }

    stages {
        stage ('Build') {
            steps {
                sh '''
                    docker build -t deploy_node_jenkins:latest .
                    docker tag deploy_node_jenkins mmcpininga/deploy_node_jenkins:latest
                    docker tag deploy_node_jenkins mmcpininga/deploy_node_jenkins:$BUILD_NUMBER
                '''
            }
        }
        stage ('Test') {
            steps {
                sh '''
                    npm install
                    npm test
                '''
            }
        }
        stage ('Publish') {
            steps {
                sh 'echo $DOCKERHUB_CRED_PSW | docker login -u $DOCKERHUB_CRED_USR --password-stdin'
                sh '''
                    docker push mmcpininga/deploy_node_jenkins:latest
                    docker push mmcpininga/deploy_node_jenkins:$BUILD_NUMBER
                '''
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
        }

    }
}