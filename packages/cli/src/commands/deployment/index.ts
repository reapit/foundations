import { Command } from "../../decorators";
import { ParentCommand } from "../../parent.command";
import { DeploymentCreate } from "./create";
import { DeploymentList } from "./list";

@Command({
  name: 'deployment',
  description: 'For managing deployments',
})
export class DeploymentCommand extends ParentCommand {
  commands = [
    new DeploymentCreate(),
    new DeploymentList(),
  ]
}
