import { Injectable } from '@nestjs/common'
import { PipelineEntity } from '../entities/pipeline.entity'
import { GithubPullRequestProvider } from '../github/github-pull-request-provider'
import { load, dump } from 'js-yaml'

export type DnsRecords = {
  name: string
  value: string
  type: 'CNAME'
}

type DevopsDnsRecord = {
  name: string
  hosted_zone_identifier: 'reapit.cloud'
  type: 'CNAME'
  ttl: 300
  records: string[]
}

type DevopsDnsRecordConfig = {
  config: {
    'route53:records': DevopsDnsRecord[]
  }
}

@Injectable()
export class DevopsPrProvider {
  private static repositoryOwner: string = 'reapit-global'
  private static repositoryName: string = 'uk-devops-infrastructure-core-cdk'
  private static repositoryFile: string = 'pulumi_projects/route53/Pulumi.route53.main.yaml'
  constructor(private readonly githubPrProvider: GithubPullRequestProvider) {}

  async createPR(cnames: DnsRecords[], pipeline: PipelineEntity) {
    const file = await this.githubPrProvider.obtainFile({
      owner: DevopsPrProvider.repositoryOwner,
      filePath: DevopsPrProvider.repositoryFile,
      repository: DevopsPrProvider.repositoryName,
    })

    if (!('content' in file.data)) throw new Error('github file not correct')

    const content = Buffer.from(file.data.content, 'base64').toString('utf-8')

    const yml = load(content) as DevopsDnsRecordConfig

    console.log('yml', yml)

    cnames.forEach((cname) => {
      yml.config['route53:records'].push({
        name: cname.name,
        hosted_zone_identifier: 'reapit.cloud', // has to be reapit.cloud
        ttl: 300,
        records: [cname.value],
        type: cname.type,
      })
    })

    const updatedFile = dump(yml)

    await this.githubPrProvider.createPullRequest({
      owner: DevopsPrProvider.repositoryOwner,
      filePath: DevopsPrProvider.repositoryFile,
      repository: DevopsPrProvider.repositoryName,
      file: updatedFile,
      commitMessage: `feat: cname records for ${cnames.map((cname) => cname.name).join(', ')}`,
      PR: {
        title: `feat: cname records for ${cnames.map((cname) => cname.name).join(', ')}`,
        body: `## Why was this PR generated?
The deployment-service, managed by the uk-platform team, has created this PR automatically to add CNAMES for a pipeline deployment

## Added CNAMES
${cnames.map((cname) => `- ${cname.name}`).join('\r\n')}

### User & pipeline info
user that triggered this action: ${pipeline.dnsTrigger}

pipelineId: ${pipeline.id}
developerId: ${pipeline.developerId}

## ENV
This PR was made from the below deployment-service envrionment
env: [${process.env.NODE_ENV}]
`,
        labels: ['deployment-service'],
        branchName: `pipeline-dns-creation-${pipeline.id}`,
      },
    })
  }
}
