import { MultiSelectOption } from '@reapit/elements'
import { OfficeModel } from '@reapit/foundations-ts-definitions'
import { GroupModel } from '../types/organisations-schema'

export const prepareOfficeOptions: (data: OfficeModel[]) => MultiSelectOption[] = (data) =>
  data.map((office: OfficeModel) => {
    const { id, name } = office

    return {
      name,
      value: id,
    } as MultiSelectOption
  })

export const prepareUserGroupOptions: (data: GroupModel[]) => MultiSelectOption[] = (data) =>
  data.map((userGroup: GroupModel) => {
    const { id } = userGroup

    return {
      value: id,
      name: id,
    } as MultiSelectOption
  })
