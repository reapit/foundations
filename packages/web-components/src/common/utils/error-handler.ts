import { AppRequest, AppResponse } from '@reapit/node-utils'

export const errorHandler = async (err: Error, res: AppResponse, req: AppRequest, caller: string, logger: any) => {
  const errorString = typeof err === 'string' ? err : JSON.stringify(err.message)
  const responseCode = Number(errorString.substring(1, 4)) || (errorString ? 400 : 500)
  await logger.error(caller, {
    traceId: req.traceId,
    error: errorString,
    headers: JSON.stringify(req.headers),
  })
  res.status(responseCode)
  res.json(errorString)
  res.end()
}
