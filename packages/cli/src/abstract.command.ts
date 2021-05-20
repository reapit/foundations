import { ReapitCliConfigResolve, resolveConfig } from "./utils";
import axios from 'axios';

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
}
