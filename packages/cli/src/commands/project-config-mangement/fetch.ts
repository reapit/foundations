import { AbstractCommand } from '../../abstract.command'
import { Command, Param, Optional } from '../../decorators'
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import { injectable } from 'tsyringe'
import fs from 'fs'
import { resolve } from 'path'
import { resolveParamName } from './utils'
import chalk from 'chalk'

@injectable()
@Command({
  name: 'fetch',
  description: 'Fetch existing project config',
})
export class ProjectConfigManagementFetchCommand extends AbstractCommand {
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
      name: 'print',
      description: 'Display only, do not write local config file.',
      default: false,
      shortName: 'p',
    })
    print: boolean = false,
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

    const paramName = resolveParamName({
      projectName,
      nameSpace,
      env,
    })

    this.writeLine(`Fetching ${paramName}`)

    try {
      const configResponse = await client.send(
        new GetParameterCommand({
          Name: paramName,
          WithDecryption: true,
        }),
      )

      if (configResponse.Parameter?.Value && !print)
        fs.writeFileSync(resolve(process.cwd(), fileName), configResponse.Parameter?.Value)
      if (configResponse.Parameter?.Value && print)
        this.writeLine(JSON.stringify(configResponse.Parameter.Value, null, '\n'))
    } catch (error: unknown) {
      // console.error(error as any)
      error instanceof Error && this.writeLine(error.message)
      this.writeLine(chalk.red('There was an unexpected error. Double check your input parameters'))
    }
  }
}
