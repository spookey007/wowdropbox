pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        nodejs(cacheLocationStrategy: workspace(), nodeJSInstallationName: 'Nodejs20') {
        sh '''ls
pwd
rm -rf build/
rm -rf clientbuild.tar.gz
npm install --force
npm run build
mv dist build
ls -la
tar cvf clientbuild.tar.gz build
ls'''
      }
    }
 }
   
        stage('Upload Build') {
          steps {
            sshPublisher(publishers: [sshPublisherDesc(configName: 'luckybox', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''sudo rm -rf /home/ubuntu/frontend/build
sudo tar -xf /home/ubuntu/clientbuild.tar.gz -C /home/ubuntu/frontend/
rm -rf /home/ubuntu/clientbuild.tar.gz''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'clientbuild.tar.gz')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
          }
        }

  }

  
    post { 
    always {
        dir("${env.WORKSPACE}@tmp") {
            deleteDir()
        }
    }
    }
}
