import { AbstractCommand } from '../../abstract.command'
import { Command, Optional, Param } from '../../decorators'
import { DeleteParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import { injectable } from 'tsyringe'
import { resolveParamName } from './utils'

@injectable()
@Command({
  name: 'delete',
  description: 'delete remote project config',
})
export class ProjectConfigManagementDeleteCommand extends AbstractCommand {
  async run(
    @Param({
      name: 'namespace',
      description: 'Your departmental prefix',
      required: true,
    })
    nameSpace: string,
    @Param({
      name: 'projectName',
      description: 'The project name',
      required: true,
    })
    projectName: string,
    @Param({
      name: 'env',
      description: 'The environment of your config. [local, development, production]',
      default: 'local',
    })
    env: string,
    // @Optional({
    //   name: 'profile',
    //   description: 'The profile to upload the config to (aws config profile)',
    // })
    // profile?: string,
  ) {
    const client = new SSMClient() // TODO add credentials for given profile

    const paramName = resolveParamName({
      projectName,
      nameSpace,
      env,
    })

    await client.send(
      new DeleteParameterCommand({
        Name: paramName,
      }),
    )
  }
}
