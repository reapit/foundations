import { CodeBuild } from 'aws-sdk'

export const taskFunctionToFriendlyName = (functionName: CodeBuild.BuildPhaseType): string => {
  switch (functionName) {
    case 'INSTALL':
      return 'install'
    case 'BUILD':
      return 'Build'
    case 'DOWNLOAD_SOURCE':
      return 'Download'
    case 'DEPLOY':
      return 'Deploy'
    default:
      return ''
  }
}
