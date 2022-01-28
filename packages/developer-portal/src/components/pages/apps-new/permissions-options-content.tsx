import { MultiSelectInput, Loader, MultiSelectOption, InputGroup, elMb5 } from '@reapit/elements'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { StepFormContainer } from './__styles__'
import { AppWizardState, useAppWizard } from './use-app-wizard'
import { appWizardSteps } from './config'
import { useReapitConnect } from '@reapit/connect-session'
import { ScopeModel } from '@reapit/foundations-ts-definitions'
import { getActions, GetActionNames } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { UseFormRegister, UseFormGetValues } from 'react-hook-form'
import { CreateAppFormSchema } from './apps-new'
import debounce from 'just-debounce-it'

interface PermissionsOptionsContentProps {
  register: UseFormRegister<CreateAppFormSchema>
  getValues: UseFormGetValues<CreateAppFormSchema>
}

export const prepareOptions = (permissions: ScopeModel[]): MultiSelectOption[] =>
  permissions.map((permission: ScopeModel) => {
    const { description, name } = permission

    return {
      value: name,
      name: description,
    } as MultiSelectOption
  })

export const handleSetOptions =
  (
    defaultScopes: string[],
    permissions: ScopeModel[] | null,
    search: string,
    setOptions: Dispatch<SetStateAction<MultiSelectOption[]>>,
    getValues: UseFormGetValues<CreateAppFormSchema>,
  ) =>
  () => {
    const scopes = getValues().scopes ?? defaultScopes.join(',')

    if ((scopes || search) && permissions) {
      const options = permissions.filter((permission) => {
        const isSelectedPermission = permission.name && scopes.includes(permission.name)
        const isSearchedPermission = search && permission.description?.toLowerCase().includes(search.toLowerCase())

        return isSelectedPermission || isSearchedPermission
      })

      const uniqueOptions: ScopeModel[] = [...new Set([...options.map((option) => JSON.stringify(option))])].map(
        (jsonOption) => JSON.parse(jsonOption),
      )
      const officeOptions = prepareOptions(uniqueOptions)

      setOptions(officeOptions)
    }
  }

export const handleSetLastStep = (setAppWizardState: Dispatch<SetStateAction<AppWizardState>>) => () => {
  setAppWizardState((currentState) => ({
    ...currentState,
    lastStep: true,
  }))
}

export const PermissionsOptionsContent: FC<PermissionsOptionsContentProps> = ({ register, getValues }) => {
  const { appWizardState, setAppWizardState } = useAppWizard()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [permissions, loading] = useReapitGet<ScopeModel[]>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppPermissions],
    fetchWhenTrue: [connectSession],
  })
  const [search, setSearch] = useState<string>('')
  const [options, setOptions] = useState<MultiSelectOption[]>([])
  const debouncedSearch = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value), 500),
    [500],
  )
  const { currentStep } = appWizardState
  const defaultPermissions = (currentStep && appWizardSteps[currentStep].permissions) ?? []

  useEffect(handleSetOptions(defaultPermissions, permissions, search, setOptions, getValues), [permissions, search])
  useEffect(handleSetLastStep(setAppWizardState), [])

  return (
    <StepFormContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          <InputGroup
            className={elMb5}
            onChange={debouncedSearch}
            icon="searchSystem"
            placeholder="Search permissions to get started"
          />
          <MultiSelectInput
            id="select-permissions"
            defaultValues={defaultPermissions}
            {...register('scopes')}
            options={options}
          />
        </>
      )}
    </StepFormContainer>
  )
}
