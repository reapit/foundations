import { SelectOption } from '@reapit/elements'
import { OfficeModel } from '@reapit/foundations-ts-definitions'

export const prepareOfficeOptions: (data: OfficeModel[]) => SelectOption[] = data =>
  data.map((office: OfficeModel) => {
    const { id, name } = office

    return {
      label: name,
      value: id,
      description: name,
    } as SelectOption
  })
