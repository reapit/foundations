import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import useSWR from 'swr'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { OfficeGroupModelPagedResult, OfficeGroupModel } from '../../../types/organisations-schema'
import { FadeIn, Loader, Section, Table, Button, FlexContainerBasic } from '@reapit/elements'
import OfficeListCell from '../offices/office-list-cell'
import { URLS } from '../../../constants/api'
import { orgIdEffectHandler } from '../../../utils/org-id-effect-handler'

export interface AppInstallationPerOfficeGroupProps {
  installations: InstallationModelPagedResult | undefined
  officeGroupsToAdd: string[]
  setOfficeGroupsToAdd: Dispatch<SetStateAction<string[]>>
  officeGroupsToRemove: string[]
  setOfficeGroupsToRemove: Dispatch<SetStateAction<string[]>>
}

const AppInstallationPerOfficeGroup: React.FC<AppInstallationPerOfficeGroupProps> = ({
  installations,
  officeGroupsToAdd,
  setOfficeGroupsToAdd,
  officeGroupsToRemove,
  setOfficeGroupsToRemove,
}: AppInstallationPerOfficeGroupProps) => {
  const [officeGroupsTableData, setOfficeGroupsTableData] = useState<OfficeGroupModel[] | undefined>([])
  const [orgId, setOrgId] = useState<string | null>(null)

  useEffect(orgIdEffectHandler(orgId, setOrgId), [])

  const { data: officeGroups, isValidating: officeGroupsValidating } = useSWR<OfficeGroupModelPagedResult>(
    !orgId ? null : `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}?pageSize=999`,
  )

  useEffect(() => {
    if (officeGroups && officeGroups._embedded) {
      setOfficeGroupsTableData(
        officeGroups._embedded.map((og) => ({
          name: og.name,
          officeIds: og.officeIds,
          customerId: og.customerId,
        })),
      )
    }
  }, [officeGroups])

  if (officeGroupsValidating) return <Loader />

  const toggleAllOfficeGroups = (desiredState) => {
    if (!officeGroupsTableData) return false

    const removeList = [] as string[]
    const addList = [] as string[]

    officeGroupsTableData.forEach(({ customerId }) => {
      if (!customerId) return false
      const previouslyInstalled = isPreviouslyInstalled(installations, customerId)

      if (desiredState === true && !previouslyInstalled && !officeGroupsToAdd.includes(customerId))
        addList.push(customerId)
      if (desiredState === false && previouslyInstalled && !officeGroupsToRemove.includes(customerId))
        removeList.push(customerId)
    })

    if (desiredState === true) {
      setOfficeGroupsToAdd([...officeGroupsToAdd, ...addList])
      setOfficeGroupsToRemove([])
    } else {
      setOfficeGroupsToAdd([])
      setOfficeGroupsToRemove([...officeGroupsToRemove, ...removeList])
    }
  }

  const isPreviouslyInstalled = (installations, client) =>
    installations && installations.data && !!installations.data.find((i) => i.client === client)

  const toggleOfficeGroupsToAdd = (customerId: string) => {
    officeGroupsToAdd.includes(customerId)
      ? setOfficeGroupsToAdd(officeGroupsToAdd.filter((item) => item !== customerId))
      : setOfficeGroupsToAdd([...officeGroupsToAdd, customerId])
  }
  const toggleOfficeGroupsToRemove = (customerId: string) => {
    officeGroupsToRemove.includes(customerId)
      ? setOfficeGroupsToRemove(officeGroupsToRemove.filter((item) => item !== customerId))
      : setOfficeGroupsToRemove([...officeGroupsToRemove, customerId])
  }

  const ToggleOfficeGroupSelectionCell = ({ cell: { value } }) => {
    const previouslyInstalledForOfficeGroup = isPreviouslyInstalled(installations, value)
    const checked =
      (previouslyInstalledForOfficeGroup && !officeGroupsToRemove.includes(value)) ||
      (!previouslyInstalledForOfficeGroup && officeGroupsToAdd.includes(value))

    return (
      <div className="field field-checkbox mb-0 control">
        <input
          className="checkbox"
          type="checkbox"
          id={value}
          checked={checked}
          onChange={() => {
            previouslyInstalledForOfficeGroup ? toggleOfficeGroupsToRemove(value) : toggleOfficeGroupsToAdd(value)
          }}
        />
        <label className="label" htmlFor={value}>
          Installed
        </label>
      </div>
    )
  }

  return (
    <Section hasPadding={false}>
      <FlexContainerBasic className="justify-end">
        <Button variant="secondary" onClick={() => toggleAllOfficeGroups(true)}>
          Select all
        </Button>
        <Button variant="secondary" onClick={() => toggleAllOfficeGroups(false)}>
          Deselect all
        </Button>
      </FlexContainerBasic>
      <FadeIn>
        <Table
          data={officeGroupsTableData ? officeGroupsTableData : []}
          columns={[
            {
              Header: 'Group Name',
              accessor: 'name',
            },
            { Header: 'Office List', accessor: 'officeIds', Cell: OfficeListCell },
            {
              Header: 'Edit',
              accessor: 'customerId',
              Cell: ToggleOfficeGroupSelectionCell,
            },
          ]}
        />
      </FadeIn>
    </Section>
  )
}

export default AppInstallationPerOfficeGroup
