import DataLoader from 'dataloader'
import { getConfigurationsByType } from './services'
import { ServerContext } from '../../utils'
import handleError from '../../utils/handle-error'
import { ConfigurationType } from './configurations'

export const generateConfigurationBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  try {
    const appointmentTypes = await getConfigurationsByType({ type: 'appointmentTypes' as ConfigurationType }, context)
    const result = keys.map((key: string) => {
      return (appointmentTypes ?? []).find((appointmentType) => appointmentType.id === key)
    })
    return result
  } catch (err) {
    await handleError({ error: err, traceId, caller: 'generateConfigurationBatchLoaderFn' })
    return keys.map(() => err)
  }
}

export const generateConfigurationLoader = (context: ServerContext) =>
  new DataLoader(generateConfigurationBatchLoaderFn(context))
