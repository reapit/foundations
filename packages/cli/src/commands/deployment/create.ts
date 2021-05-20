import chalk from "chalk";
import { AbstractCommand } from "../../abstract.command";
import { Command } from "../../decorators";
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'

@Command({
  name: "create",
  parent: "deployment",
  description: "List deployments",
})
export class DeploymentCreate extends AbstractCommand {
  async run() {
    const config = await this.getConfig()

    if (!config || !config.config) {
      console.log(chalk.red('No config found. Please use the config command before running this command'))
      return
    }

    // TODO use inquirer for questions and anwser blocks

    const response = await this.axios(config.config.baseUrl).get<DeploymentModelInterface[]>('/deployments')
  }
}
