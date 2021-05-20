export interface Command {
  run(): Promise<any> | any;
}

export abstract class AbstractCommand {
  constructor() {}

  abstract run(
    params: {[s: string]: any},
    options: unknown,
  );
}
