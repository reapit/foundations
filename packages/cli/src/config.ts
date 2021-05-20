import { AbstractCommand } from "./abstract.command";
import { Command } from "./decorators";

@Command({
  name: 'config',
  description: 'Setup your reapit cli command',
})
export class ConfigCommand extends AbstractCommand {
  run(params, options) {
    console.log('TODO resolve config');
  }
}
