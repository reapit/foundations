import { AbstractCommand } from '../../abstract.command'
import { Command, Optional, Param } from '../../decorators'
import { injectable } from 'tsyringe'
import { GetParameterCommand, PutParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import fs from 'fs'
import { resolveParamName } from './utils'
import chalk from 'chalk'

@injectable()
@Command({
  name: 'update',
  description: 'Update a project configuration file',
})
export class ProjectConfigManagementUpdateCommand extends AbstractCommand {
  fetchLocalConfigFile(fileName: string) {
    const content = fs.readFileSync(fileName)

    return content.toJSON()
  }

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
    @Optional({
      name: 'fileName',
      description: 'The filename for config if not default',
      default: 'config.json',
    })
    fileName: string = 'config.json',
    @Optional({
      name: 'profile',
      description: 'The profile to upload the config to (aws config profile)',
    })
    profile?: string,
  ) {
    const client = new SSMClient() // TODO add credentials for given profile

    const source = this.fetchLocalConfigFile(fileName)

    const paramName = resolveParamName({
      projectName,
      nameSpace,
      env,
    })

    this.writeLine(`Updating config in parameter store with name [${paramName}] using [${fileName}]`)

    const configResponse = await client.send(
      new GetParameterCommand({
        Name: projectName,
      }),
    )
    const existingConifg = configResponse.Parameter?.Value ? configResponse.Parameter.Value : {}

    await client.send(
      new PutParameterCommand({
        Name: projectName,
        Value: JSON.stringify({
          ...existingConifg,
          ...source,
        }),
        Overwrite: true,
        Type: 'SecureString',
      }),
    )

    this.writeLine(chalk.green('✅ Successfully updated'))
  }
}
