import 'reflect-metadata'
import { container } from 'tsyringe'
export const COMMAND_OPTIONS = 'COMMAND_OPTIONS'
export const ARGUMENT_OPTIONS = 'PARAMETER_NAME'

export type CommandOptions = {
  name: string
  description: string
  show?: boolean
}

export interface ArgsType {
  description?: string
  name: string
  type: 'parameter' | 'option'
  shortName?: string
  default?: any
  required?: boolean
}

export type ParameterType = ArgsType & {
  type: 'parameter'
  required?: boolean
}

export type OptionType = ArgsType & {
  shortName: string
  type: 'option'
}

export interface ArgsInputInterface {
  default?: any
  description?: string
  name: string
}

export interface ParameterInputInterface extends ArgsInputInterface {
  required?: boolean
}

export interface OptionInputInterface extends ArgsInputInterface {
  shortName?: string
}

export const isCommandConfig = (config: CommandOptions | { default: true }): config is CommandOptions =>
  config.hasOwnProperty('name')

export const Command =
  (options: CommandOptions | { default: true }): ClassDecorator =>
  (target) => {
    Reflect.defineMetadata(COMMAND_OPTIONS, options, target)
    container.register(isCommandConfig(options) ? options.name : 'default', target as any)
  }

export const Param =
  (options: ParameterInputInterface): ParameterDecorator =>
  (target, propertyKey, parameterIndex) => {
    const params = Reflect.getOwnMetadata(ARGUMENT_OPTIONS, target.constructor) || []

    params[parameterIndex] = {
      ...options,
      type: 'parameter',
    }

    Reflect.defineMetadata(ARGUMENT_OPTIONS, params, target.constructor)
  }

export const Optional =
  (options: OptionInputInterface): ParameterDecorator =>
  (target, propertyKey, parameterIndex) => {
    const params = Reflect.getOwnMetadata(ARGUMENT_OPTIONS, target.constructor) || []

    params[parameterIndex] = {
      ...options,
      type: 'option',
    }

    Reflect.defineMetadata(ARGUMENT_OPTIONS, params, target.constructor)
  }
