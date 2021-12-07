import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { ReleaseListCommand } from './list'
import { VersionCommand } from './version'

@Command({
  name: 'release',
  description: 'For viewing individual releases related to your project',
})
export class ReleaseCommand extends ParentCommand {
  commands = [new ReleaseListCommand(), new VersionCommand()]
}
