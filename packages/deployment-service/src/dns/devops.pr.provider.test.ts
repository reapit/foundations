import { Test } from '@nestjs/testing'
import { DevopsPrProvider } from './devops.pr.provider'
import { ConfigModule } from '@nestjs/config'
import github from '../config/github'
import { GithubPullRequestProvider } from '../github/github-pull-request-provider'
import { PipelineEntity } from '../entities/pipeline.entity'
import { dump } from 'js-yaml'

// prevent jest compile issue
jest.mock('octokit-plugin-create-pull-request', () => ({}))

const mockGithubPullRequestProvider = {
  obtainFile: jest.fn(),
  createPullRequest: jest.fn(),
}

const mockPipeline: Partial<PipelineEntity> = {
  id: 'some-uuid',
  developerId: 'developer-id',
  dnsTrigger: 'dnstrigger@someemail.com',
  customDomain: 'domain.co.uk',
}

describe('DevopsPrProvider', () => {
  let provider: DevopsPrProvider

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(github)],
      providers: [DevopsPrProvider, GithubPullRequestProvider],
    })
      .overrideProvider(GithubPullRequestProvider)
      .useValue(mockGithubPullRequestProvider)
      .compile()

    provider = app.get<DevopsPrProvider>(DevopsPrProvider)
  })

  it('Can create PR', async () => {
    console.log('test', dump({ config: { ['route53:records']: {} } }))
    mockGithubPullRequestProvider.obtainFile.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          content: Buffer.from(dump({ config: { ['route53:records']: [] } })).toString('base64'),
        },
      }),
    )
    await provider.createPR(
      [
        {
          name: 'cname-name',
          type: 'CNAME',
          value: 'cname-value',
        },
      ],
      mockPipeline as PipelineEntity,
    )

    expect(mockGithubPullRequestProvider.obtainFile).toHaveBeenCalled()
    expect(mockGithubPullRequestProvider.createPullRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        PR: expect.objectContaining({
          title: expect.stringContaining('cname-name'),
          body: expect.stringContaining(`user that triggered this action: ${mockPipeline.dnsTrigger}`),
          // .stringContaining('cname-name')
          // .stringContaining(mockPipeline.developerId)
          // .stringContaining(mockPipeline.id),
        }),
      }),
    )
  })
})
