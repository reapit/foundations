import { AbstractCommand } from './../abstract.command'
import { Command } from './../decorators'
import { resolveConfig, ReapitCliConfig, createConfig } from './../utils'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { resolve } from 'path'

const createConfigFromQuestions = async (config?: ReapitCliConfig): Promise<ReapitCliConfig> => {
  const values = await inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter your authKey',
      name: 'authKey',
      default: config ? config.authKey : undefined,
    },
  ])

  return values as ReapitCliConfig
}

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

      if (process.cwd() !== resolve('~') && existingConfig.from === 'global') {
        updateConfigOptions.push({
          value: 'project',
          name: 'Create new project config',
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
          await createConfig(existingConfig.from === 'global' ? resolve('~') : process.cwd(), config)
          console.log(chalk.blue(`Updated config ${existingConfig.from === 'global' ? resolve('~') : process.cwd()}`))
          break
        case 'project':
          projectConfig = await createConfigFromQuestions()
          await createConfig(process.cwd(), projectConfig)
          console.log(chalk.blue(`Created config ${process.cwd()}`))
          break
        default:
        case 'show':
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

      await createConfig(projectOrGlobal.action === 'global' ? resolve('~') : process.cwd(), config)
      console.log(chalk.blue(`Created config ${projectOrGlobal.action === 'global' ? resolve('~') : process.cwd()}`))
    }
  }
}
