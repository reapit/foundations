import { Octokit } from '@octokit/rest'
import { Octokit as OctokitCore } from '@octokit/core'
import { createPullRequest } from 'octokit-plugin-create-pull-request'

const CreatePR = OctokitCore.plugin(createPullRequest)

export const getCdkJson = async (auth: string, devopsProjectName: string) => {
  const api = new Octokit({
    auth,
  })

  const cdkJsonFile = await api.repos.getContents({
    owner: 'reapit',
    repo: 'devops-infrastructure-core',
    path: `aws_cdk_apps/${devopsProjectName}/cdk.json`,
    mediaType: {
      format: 'application/vnd.github.raw',
    },
  })

  if (Array.isArray(cdkJsonFile.data)) {
    throw new Error('got multiple files back')
  }

  const cdkJsonStr = cdkJsonFile.data.content

  if (!cdkJsonStr) {
    throw new Error('cdkJsonStr undefined')
  }

  const cdkJson = JSON.parse(cdkJsonStr)

  return cdkJson
}

export const updateCdkJson = async (
  auth: string,
  devopsProjectName: string,
  newFileContents: string,
  stage: string,
) => {
  const api = new CreatePR({
    auth,
  })

  const result = await api.createPullRequest({
    owner: 'reapit',
    repo: 'devops-infrastructure-core',
    changes: [
      {
        files: {
          [`aws_cdk_apps/${devopsProjectName}/cdk.json`]: newFileContents,
        },
        commit: `Deploy ${devopsProjectName} to ${stage}`,
        author: {
          name: 'Foundations DeployBot',
          email: 'foundations@reapit.com',
          date: new Date().toISOString(), // must be ISO date string
        },
      },
    ],
    title: `Deploy ${devopsProjectName} to ${stage}`,
    body: `Deploy ${devopsProjectName} to ${stage}`,
    head: `${devopsProjectName}-deploy-${stage}`,
    labels: ['deployment', devopsProjectName, stage],
  })

  if (!result) {
    throw new Error('pr creation failed')
  }

  return result?.data.number
}
