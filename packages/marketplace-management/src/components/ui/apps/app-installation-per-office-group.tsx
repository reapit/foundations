import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent, FC } from 'react'
import useSWR from 'swr'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { OfficeGroupModelPagedResult } from '../../../types/organisations-schema'
import { URLS } from '../../../constants/api'
import { Button, ButtonGroup, InputWrapFull, Loader, MultiSelectInput, MultiSelectOption } from '@reapit/elements'
import { useOrgId } from '../../../utils/use-org-id'

export interface AppInstallationPerOfficeGroupProps {
  installations: InstallationModelPagedResult | undefined
  setOfficeGroupsToAdd: Dispatch<SetStateAction<string[]>>
  setOfficeGroupsToRemove: Dispatch<SetStateAction<string[]>>
}

const AppInstallationPerOfficeGroup: FC<AppInstallationPerOfficeGroupProps> = ({
  installations,
  setOfficeGroupsToAdd,
  setOfficeGroupsToRemove,
}: AppInstallationPerOfficeGroupProps) => {
  const [multiSelect, setMultiSelect] = useState<JSX.Element | null>(null)
  const [allOfficeGroups, toggleAllOfficeGroups] = useState<'all' | 'none' | null>(null)
  const {
    orgIdState: { orgId },
  } = useOrgId()

  const { data: officeGroups, isValidating: officeGroupsValidating } = useSWR<OfficeGroupModelPagedResult>(
    !orgId ? null : `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}?pageSize=999`,
  )

  const onChange = (event?: ChangeEvent<HTMLInputElement>, values?: string[]) => {
    const newValues = values ? values : event ? event.target.value.split(',') : []
    const originalValues =
      officeGroups?._embedded
        ?.filter((group) => installations?.data?.find((installation) => installation.client === group.customerId))
        .map((filteredGroup) => filteredGroup.customerId ?? '') ?? []

    const valuesToAdd = newValues.filter((value) => !originalValues.includes(value))
    const valuesToRemove = originalValues.filter((value) => !newValues.includes(value))

    setOfficeGroupsToAdd(valuesToAdd)
    setOfficeGroupsToRemove(valuesToRemove)
  }

  const options: MultiSelectOption[] =
    officeGroups?._embedded?.map(({ customerId, name }) => ({
      value: customerId ?? '',
      name: name ?? '',
    })) ?? []

  useEffect(() => {
    if (officeGroups && installations) {
      const originalValues =
        officeGroups?._embedded
          ?.filter((group) => installations?.data?.find((installation) => installation.client === group.customerId))
          .map((filteredGroup) => filteredGroup.customerId ?? '') ?? []
      const allValues = officeGroups?._embedded?.map((group) => group.customerId ?? '') ?? []
      const noValues = []
      const defaultValues =
        allOfficeGroups === 'none' ? noValues : allOfficeGroups === 'all' ? allValues : originalValues

      onChange(undefined, defaultValues)

      setMultiSelect(
        <MultiSelectInput
          id="select-groups-to-install"
          onChange={onChange}
          noneSelectedLabel="No groups selected to install"
          defaultValues={[...new Set(defaultValues)]}
          options={options}
        />,
      )
    }
  }, [allOfficeGroups, officeGroups, installations])

  if (officeGroupsValidating) return <Loader />

  return (
    <>
      <InputWrapFull>
        <ButtonGroup alignment="right">
          <Button
            intent="secondary"
            disabled={allOfficeGroups === 'all'}
            onClick={() => {
              setMultiSelect(null)
              toggleAllOfficeGroups('all')
            }}
          >
            Select all
          </Button>
          <Button
            intent="secondary"
            disabled={allOfficeGroups === 'none'}
            onClick={() => {
              setMultiSelect(null)
              toggleAllOfficeGroups('none')
            }}
          >
            Deselect all
          </Button>
        </ButtonGroup>
      </InputWrapFull>
      <InputWrapFull>{multiSelect}</InputWrapFull>
    </>
  )
}
export default AppInstallationPerOfficeGroup
