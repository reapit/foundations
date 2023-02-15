import chalk from 'chalk'
import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import ora from 'ora'
import { shleemy } from 'shleemy'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'list',
  description: 'List pipelines',
})
export class PipelineList extends AbstractCommand {
  async run() {
    const spinner = ora('Fetching pipelines').start()
    const response = await (await this.axios(spinner)).get<{ items: PipelineModelInterface[] }>('/pipeline')
    spinner.stop()

    if (response.status !== 200) {
      console.log(chalk.red('Error fetching results: ', response.status, response.statusText))
    }

    if (!response.data || !response.data.items || response.data.items.length === 0) {
      console.log(chalk.redBright('No pipelines found'))
      return
    }

    console.table(
      response.data.items.map((pipeline) => ({
        id: pipeline.id,
        name: pipeline.name,
        appType: pipeline.appType,
        appId: pipeline.appId,
        repository: pipeline.repository,
        buildStatus: pipeline.buildStatus,
        created: shleemy(new Date(pipeline.created as string)).forHumans,
      })),
      ['id', 'name', 'appType', 'version', 'appId', 'buildStatus', 'repository', 'created'],
    )
  }
}
