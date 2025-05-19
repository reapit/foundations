import { Octokit } from '@octokit/rest'
import { Octokit as OctokitCore } from '@octokit/core'
import { createPullRequest } from 'octokit-plugin-create-pull-request'

const CreatePR = OctokitCore.plugin(createPullRequest)

export const getCdkJson = async (auth: string, projectName: string) => {
  const api = new Octokit({
    auth,
  })

  const cdkJsonFile = await api.repos.getContent({
    owner: 'reapit-global',
    repo: 'uk-devops-infrastructure-core-cdk',
    path: `aws_cdk_apps/${projectName}/cdk.json`,
    mediaType: {
      format: 'application/vnd.github.raw',
    },
  })

  if (Array.isArray(cdkJsonFile.data)) {
    throw new Error('got multiple files back')
  }

  // See https://github.com/octokit/types.ts/issues/267#issuecomment-790012807 getContents was deprecated
  if ('content' in cdkJsonFile.data) {
    const cdkJsonStr = Buffer.from(cdkJsonFile.data.content, 'base64').toString('utf-8')

    if (!cdkJsonStr) {
      throw new Error('cdkJsonStr undefined')
    }

    const cdkJson = JSON.parse(cdkJsonStr)

    return cdkJson
  } else {
    throw new Error('no file contents found')
  }
}

export const updateCdkJson = async (
  auth: string,
  projectName: string,
  newFileContents: string,
  stage: string,
  update?: boolean = false,
) => {
  const api = new CreatePR({
    auth,
  })
  console.log('Creating PR')

  const result = await api.createPullRequest({
    owner: 'reapit-global',
    repo: 'uk-devops-infrastructure-core-cdk',
    changes: [
      {
        files: {
          [`aws_cdk_apps/${projectName}/cdk.json`]: newFileContents,
        },
        commit: `Deploy ${projectName} to ${stage}`,
        author: {
          name: 'Foundations DeployBot',
          email: 'foundations@reapit.com',
          date: new Date().toISOString(), // must be ISO date string
        },
      },
    ],
    title: `Deploy ${projectName} to ${stage}`,
    body: `Deploy ${projectName} to ${stage}`,
    head: `${projectName}-deploy-${stage}`,
    labels: ['deployment', projectName, stage],
    update,
  })

  if (!result) {
    throw new Error('PR creation failed')
  }

  console.log(`Created PR ${result.data.url}`)

  return result?.data.number
}
