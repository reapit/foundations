import { AbstractCommand } from '../../abstract.command'
import { Command, Optional, Param } from '../../decorators'
import { injectable } from 'tsyringe'
import { PutParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import fs from 'fs'
import { resolveParamName } from './utils'
import chalk from 'chalk'

@injectable()
@Command({
  name: 'create',
  description: 'Create a new project configuration file',
})
export class ProjectConfigManagementCreateCommand extends AbstractCommand {
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

    const source = this.fetchLocalConfigFile(fileName)

    this.writeLine(`Storing [${fileName}] in parameter store as [${paramName}]`)

    await client.send(
      new PutParameterCommand({
        Name: paramName,
        Value: JSON.stringify(source),
        Overwrite: true,
        Type: 'SecureString',
      }),
    )

    this.writeLine(chalk.green('✅ Successfully created'))
  }
}
