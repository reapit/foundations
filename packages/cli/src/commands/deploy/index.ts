import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { ReleaseListCommand } from './list'
import { ReleaseCommand } from './release'
import { VersionCommand } from './version'

@Command({
  name: 'deploy',
  description: 'For managing simple deployments',
})
export class DeployCommand extends ParentCommand {
  commands = [new ReleaseCommand(), new ReleaseListCommand(), new VersionCommand()]
}
