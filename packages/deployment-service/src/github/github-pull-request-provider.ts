import { ConfigType } from '@nestjs/config'
import { Octokit } from '@octokit/rest'
import { createPullRequest } from 'octokit-plugin-create-pull-request'
import github from '../config/github'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GithubPullRequestProvider {
  constructor(
    private readonly kit: Octokit,
    @Inject(github.KEY)
    private readonly config: ConfigType<typeof github>,
  ) {}

  async createPullRequest({
    owner,
    repository,
    file,
    filePath,
    commitMessage,
    PR,
  }: {
    owner: string
    repository: string
    file: string
    filePath: string
    commitMessage: string
    PR: {
      title: string
      body: string
      labels?: string[]
    }
  }) {
    const CreatePR = Octokit.plugin(createPullRequest)

    await new CreatePR({
      auth: this.config.PAT,
    }).createPullRequest({
      owner,
      repo: repository,
      changes: [
        {
          files: {
            [filePath]: file,
          },
          commit: commitMessage,
          author: {
            name: 'Foundations DeployBot',
            email: 'foundations@reapit.com',
            date: new Date().toISOString(), // must be ISO date string
          },
        },
      ],
      title: PR.title,
      body: PR.body,
      head: 'default', // branch name
      labels: PR.labels,
    })
  }

  async obtainFile({ owner, repository, filePath }: { owner: string; repository: string; filePath: string }) {
    return this.kit.repos.getContent({
      owner: owner,
      repo: repository,
      path: filePath,
      mediaType: {
        format: 'application/vnd.github.raw',
      },
    })
  }
}
