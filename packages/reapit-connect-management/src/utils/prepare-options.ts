import { SelectOption } from '@reapit/elements'
import { OfficeModel } from '@reapit/foundations-ts-definitions'
import { GroupModel } from '../types/organisations-schema'

export const prepareOfficeOptions: (data: OfficeModel[]) => SelectOption[] = data =>
  data.map((office: OfficeModel) => {
    const { id, name } = office

    return {
      label: name,
      value: id,
      description: name,
    } as SelectOption
  })

export const prepareUserGroupOptions: (data: GroupModel[]) => SelectOption[] = data =>
  data.map((userGroup: GroupModel) => {
    const { id, description } = userGroup

    return {
      label: id,
      value: id,
      description,
    } as SelectOption
  })
