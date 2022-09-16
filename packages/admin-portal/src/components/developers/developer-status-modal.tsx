import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  elMb11,
  FormLayout,
  InputGroup,
  InputWrapFull,
  Label,
  ToggleRadio,
} from '@reapit/elements'
import { DeveloperModel, UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { object, string } from 'yup'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface DeveloperStatusModalProps {
  developer: DeveloperModel | null
  setDeveloperUpdate: Dispatch<SetStateAction<DeveloperModel | null>>
  closeModal: () => void
  refreshDevelopers: () => void
}

interface UpdateDeveloperForm {
  status?: string
  reapitReference?: string
}

export const validationSchema = object().shape({
  status: string().trim().required(),
  reapitReference: string()
    .trim()
    .when('status', {
      is: (val) => val == 'confirmed',
      then: string().required().max(50, 'Maximum of 50 characters allowed'),
    }),
})

export const handleUpdateDevStatus =
  (updateDeveloperStatus: SendFunction<UpdateDeveloperModel, boolean>, updateDeveloperModel: DeveloperModel | null) =>
  (values: UpdateDeveloperForm) => {
    if (updateDeveloperModel) {
      updateDeveloperStatus({
        ...updateDeveloperModel,
        companyName: updateDeveloperModel.company,
        ...values,
      })
    }
  }

export const handleRefreshDevelopers =
  (
    refreshDevelopers: () => void,
    setDeveloperUpdate: Dispatch<SetStateAction<DeveloperModel | null>>,
    closeModal: () => void,
    developerUpdated?: boolean,
  ) =>
  () => {
    if (developerUpdated) {
      refreshDevelopers()
      setDeveloperUpdate(null)
      closeModal()
    }
  }

export const DeveloperStatusModal: FC<DeveloperStatusModalProps> = ({
  developer,
  closeModal,
  setDeveloperUpdate,
  refreshDevelopers,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateDeveloperForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      status: developer?.status,
      reapitReference: developer?.reapitReference,
    },
  })

  const [, , updateDeveloperStatus, developerUpdated] = useReapitUpdate<UpdateDeveloperModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateDeveloper],
    method: 'PUT',
    uriParams: {
      developerId: developer?.id,
    },
  })

  useEffect(handleRefreshDevelopers(refreshDevelopers, setDeveloperUpdate, closeModal, developerUpdated), [
    developerUpdated,
  ])

  const status = useWatch({
    control,
    name: 'status',
  })

  return developer ? (
    <form onSubmit={handleSubmit(handleUpdateDevStatus(updateDeveloperStatus, developer))}>
      <FormLayout className={elMb11}>
        <InputWrapFull>
          <Label>Update Developer Status</Label>
          <ToggleRadio
            {...register('status')}
            hasGreyBg
            options={[
              {
                id: 'option-status-incomplete',
                value: 'incomplete',
                text: 'Incomplete',
                isChecked: developer.status === 'incomplete',
              },
              {
                id: 'option-status-pending',
                value: 'pending',
                text: 'Pending',
                isChecked: developer.status === 'pending',
              },
              {
                id: 'option-status-confirmed',
                value: 'confirmed',
                text: 'Confirmed',
                isChecked: developer.status === 'confirmed',
              },
              {
                id: 'option-status-underReview',
                value: 'underReview',
                text: 'Under Review',
                isChecked: developer.status === 'underReview',
              },
              {
                id: 'option-status-removed',
                value: 'removed',
                text: 'Removed',
                isChecked: developer.status === 'removed',
              },
            ]}
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            {...register('reapitReference')}
            label="Reapit Reference"
            placeholder="Reapit Reference if account confirmed"
            errorMessage={errors?.reapitReference?.message}
            icon={errors?.reapitReference?.message ? 'asteriskSystem' : null}
            intent="danger"
            disabled={status !== 'confirmed'}
          />
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup alignment="center">
        <Button fixedWidth intent="low" onClick={closeModal}>
          Cancel
        </Button>
        <Button fixedWidth intent="primary" type="submit">
          Confirm
        </Button>
      </ButtonGroup>
    </form>
  ) : null
}

export default DeveloperStatusModal
