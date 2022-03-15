import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { ReleaseListCommand } from './list'
import { RepoCommand } from './repo'
import { VersionCommand } from './version'
import { ZipCommand } from './zip'

@Command({
  name: 'release',
  description: 'For viewing individual releases related to your project',
})
export class ReleaseCommand extends ParentCommand {
  commands = [new ReleaseListCommand(), new VersionCommand(), new ZipCommand(), new RepoCommand()]
}
