import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { PipelineCreate } from './create'
import { DeployPipelineCommand } from './deploy'
import { PipelineList } from './list'

@Command({
  name: 'pipeline',
  description: '(BETA) For managing Pipeline deployments',
})
export class PipelineCommand extends ParentCommand {
  commands = [new PipelineCreate(), new PipelineList(), new DeployPipelineCommand()]
}
