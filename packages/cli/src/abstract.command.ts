import { ReapitCliConfigResolve, resolveConfig } from "./utils";
import axios from 'axios';
import { CommandOptions, COMMAND_OPTIONS } from "./decorators";
import chalk from "chalk";

export interface Command {
  run(): Promise<any> | any;
}

export abstract class AbstractCommand {
  abstract run(
    params: {[s: string]: any},
    options: unknown,
  );

  async getConfig(): Promise<ReapitCliConfigResolve | false> {
    return resolveConfig()
  }

  axios(baseURL: string = 'https://developer.reapit.com/') {
    // TODO get login creds from config or whatever is required
    return axios.create({
      baseURL,
    })
  }

  printConfig() {
    const config: CommandOptions = Reflect.getOwnMetadata(COMMAND_OPTIONS, this.constructor)
    console.log(`
      ${chalk.white(config.name)}
      ${config.description}
    `)
  }
}
