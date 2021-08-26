import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { ReleaseListCommand } from './list'
import { DeployCommand } from './deploy'
import { VersionCommand } from './version'

@Command({
  name: 'release',
  description: 'For managing simple deployments',
})
export class ReleaseCommand extends ParentCommand {
  commands = [new DeployCommand(), new ReleaseListCommand(), new VersionCommand()]
}
