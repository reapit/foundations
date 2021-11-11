export type GetIdFromCreateHeadersParams = {
  headers?: {
    location?: string
  }
}

export const getIdFromCreateHeaders = ({ headers }: GetIdFromCreateHeadersParams): string | undefined => {
  const locationArray: string[] = headers?.location?.split('/') || []
  const LAST_INDEX = locationArray.length - 1
  return locationArray[LAST_INDEX] ? locationArray[LAST_INDEX] : undefined
}
