import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { ReleaseCommand } from './release'

@Command({
  name: 'deploy',
  description: 'For managing simple deployments',
})
export class DeployCommand extends ParentCommand {
  commands = [new ReleaseCommand()]
}
