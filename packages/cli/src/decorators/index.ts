import 'reflect-metadata'
export const COMMAND_OPTIONS = 'COMMAND_OPTIONS'
export const PROPERTY_NAME = 'PROPERTY_NAME'
export const OPTION_NAME = 'OPTION_NAME'

export type CommandOptions = {
  name: string;
  description: string;
  parentCommand?: string;
}

export const Command = (options: CommandOptions | {default: true}): ClassDecorator => (target) => Reflect.defineMetadata(COMMAND_OPTIONS, options, target)

export type PropertyOptions = {
  default?: any;
}

export const Property = (options?: PropertyOptions): PropertyDecorator => (target, propertyKey) => Reflect.defineMetadata(PROPERTY_NAME, options, target, propertyKey)

export type OptionOptions = {
  default?: any;
  shortName: string;
}

export const Option = (options: OptionOptions): PropertyDecorator => (target, propertyKey) => Reflect.defineMetadata(OPTION_NAME, options, target, propertyKey)
