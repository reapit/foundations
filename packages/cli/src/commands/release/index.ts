import { injectable } from 'tsyringe'
import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { ReleaseListCommand } from './list'
import { RepoCommand } from './repo'
import { VersionCommand } from './version'
import { ZipCommand } from './zip'

@injectable()
@Command({
  name: 'release',
  description: '(BETA) For viewing individual releases related to your project',
})
export class ReleaseCommand extends ParentCommand {
  commands = [ReleaseListCommand, VersionCommand, ZipCommand, RepoCommand]
}

export { ReleaseListCommand, RepoCommand, VersionCommand, ZipCommand }
