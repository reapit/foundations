#!/usr/bin/env node
const { pascalCase } = require('change-case')

const parseArgv = cliArgs => {
  const { namespace, entity, name, mode, filePath, format } = cliArgs
  // If multiple flags of the same type are passed, yargs gives me an array of them
  // In this case, I want to take the last one so I can override a default flag, eg in a CI env
  return {
    namespace: namespace && pascalCase(Array.isArray(namespace) ? namespace[namespace.length - 1] : namespace),
    entity: entity && pascalCase(Array.isArray(entity) ? entity[entity.length - 1] : entity),
    name: name && pascalCase(Array.isArray(name) ? name[name.length - 1] : name),
    mode: mode && (Array.isArray(mode) ? mode[mode.length - 1] : mode).toLowerCase(),
    filePath: filePath && (Array.isArray(filePath) ? filePath[filePath.length - 1] : filePath).toLowerCase(),
    format: format && (Array.isArray(format) ? format[format.length - 1] : format).toLowerCase(),
  }
}

const getParamAndFileName = ({ namespace, entity, name, filePath }) => {
  if (!namespace || !entity) throw new Error('Please supply a --namespace and an --entity value')

  const fileName = filePath || `${process.cwd()}/config.json`
  const baseParam = `/${namespace}/${entity}`
  const optionalName = namespace && `/${name}`
  const paramName = optionalName ? baseParam.concat(optionalName) : baseParam

  return {
    fileName,
    paramName,
  }
}

module.exports = { parseArgv, getParamAndFileName }
