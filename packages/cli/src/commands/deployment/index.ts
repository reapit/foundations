import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { DeploymentCreate } from './create'
import { DeploymentList } from './list'
import { DeploymentRun } from './run'

@Command({
  name: 'deployment',
  description: 'For managing deployments',
})
export class DeploymentCommand extends ParentCommand {
  commands = [new DeploymentCreate(), new DeploymentList(), new DeploymentRun()]
}
