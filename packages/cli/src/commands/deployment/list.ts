import chalk from "chalk";
import { AbstractCommand } from "../../abstract.command";
import { Command } from "../../decorators";
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'

@Command({
  name: "list",
  parent: "deployment",
  description: "List deployments",
})
export class DeploymentList extends AbstractCommand {
  async run() {
    const config = await this.getConfig()

    if (!config || !config.config) {
      console.log(chalk.red('No config found. Please use the config command before running this command'))
      return
    }

    const response = await this.axios(config.config.baseUrl).get<DeploymentModelInterface[]>('/deployments')

    if (response.status !== 200) {
      console.log(chalk.red("Error fetching results: ", response.status, response.statusText))
    }

    if (response.data.length === 0) {
      console.log(chalk.redBright('No deployments found'))
      return
    }

    console.table(response.data.map(deployment => ([
      chalk.blue(deployment.id),
      chalk.blue(deployment.name),
      chalk.blue(deployment.appType),
    ])), [
      'id',
      'name',
      'deployment type',
    ])
  }
}
