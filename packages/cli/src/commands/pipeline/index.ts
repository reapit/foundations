import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { PipelineCreate } from './create'
import { PipelineList } from './list'
import { LinkPipelineCommand } from './link'
import { DeletePipelineCommand } from './delete'
import { PipelineEditCommand } from './edit'
import { PipelineParameterUpsertCommand, PipelineParametersListCommand } from './parameters'

@Command({
  name: 'pipeline',
  description: '(BETA) For managing Pipeline deployments',
})
export class PipelineCommand extends ParentCommand {
  commands = [
    PipelineCreate,
    PipelineList,
    LinkPipelineCommand,
    DeletePipelineCommand,
    PipelineEditCommand,
    PipelineParametersListCommand,
    PipelineParameterUpsertCommand,
  ]
}
