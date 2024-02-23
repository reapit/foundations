import { injectable } from 'tsyringe'
import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { ProjectConfigManagementCreateCommand } from './create'
import { ProjectConfigManagementUpdateCommand } from './update'
import { ProjectConfigManagementFetchCommand } from './fetch'
import { ProjectConfigManagementDeleteCommand } from './delete'

@injectable()
@Command({
  name: 'project-config-management',
  description: '(BETA) For viewing individual releases related to your project',
})
export class ProjectConfigManagementCommand extends ParentCommand {
  commands = [
    ProjectConfigManagementCreateCommand,
    ProjectConfigManagementUpdateCommand,
    ProjectConfigManagementFetchCommand,
    ProjectConfigManagementDeleteCommand,
  ]
}

export {
  ProjectConfigManagementCreateCommand,
  ProjectConfigManagementFetchCommand,
  ProjectConfigManagementUpdateCommand,
  ProjectConfigManagementDeleteCommand,
}
