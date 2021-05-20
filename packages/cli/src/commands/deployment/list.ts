import { Command, command, metadata } from 'clime'
import chalk from 'chalk'

@command({
  description: 'View all deployments',
})
export default class extends Command {
  @metadata
  execute() {
    return `
      get all deployments and return a table
    `
  }
}
