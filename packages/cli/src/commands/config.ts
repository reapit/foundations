import { AbstractCommand } from './../abstract.command'
import { Command } from './../decorators'
import { resolveConfig, ReapitCliConfig, createConfig, homeDir } from './../utils'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { injectable } from 'tsyringe'

const createConfigFromQuestions = async (config?: ReapitCliConfig): Promise<ReapitCliConfig> => {
  const values = await inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter your api-key (you can get this from Reapit Developers)',
      name: 'api-key',
      default: config ? config['api-key'] : undefined,
    },
  ])

  return values as ReapitCliConfig
}

@injectable()
@Command({
  name: 'config',
  description: 'Setup your reapit cli command',
})
export class ConfigCommand extends AbstractCommand {
  async run() {
    const existingConfig = await resolveConfig()

    if (existingConfig) {
      console.log(chalk.green(existingConfig.from === 'project' ? 'Found project config' : 'Found global config'))

      const updateConfigOptions = [
        {
          value: 'show',
          name: 'Show config',
        },
        {
          name: 'Update config',
          value: 'replace',
        },
      ]

      if (process.cwd() !== homeDir() && existingConfig.from === 'global') {
        updateConfigOptions.push({
          value: 'project',
          name: 'Create new project config (creates project config in current dir)',
        })
      }

      const viewOrUpdate = await inquirer.prompt({
        name: 'action',
        message: 'What would you like to do?',
        type: 'list',
        choices: updateConfigOptions,
      })

      let config
      let projectConfig

      switch (viewOrUpdate.action) {
        case 'replace':
          config = await createConfigFromQuestions(existingConfig.config)
          await createConfig(existingConfig.from === 'global' ? homeDir() : process.cwd(), config)
          console.log(chalk.blue(`Updated config ${existingConfig.from === 'global' ? homeDir() : process.cwd()}`))
          break
        case 'project':
          projectConfig = await createConfigFromQuestions()
          await createConfig(process.cwd(), projectConfig)
          console.log(chalk.blue(`Created config ${process.cwd()}`))
          break
        case 'show':
        default:
          Object.keys(existingConfig.config).forEach((key) => {
            console.log(`${chalk.blue(key)} ${chalk.white(existingConfig.config[key])}`)
          })
      }
    } else {
      const projectOrGlobal = await inquirer.prompt({
        name: 'action',
        message: 'What config would you like to make?',
        type: 'list',
        choices: ['project (this dir)', 'global'],
      })

      const config = await createConfigFromQuestions()

      await createConfig(projectOrGlobal.action === 'global' ? homeDir() : process.cwd(), config)
      console.log(chalk.blue(`Created config ${projectOrGlobal.action === 'global' ? homeDir() : process.cwd()}`))
    }
  }
}
