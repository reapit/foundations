import {
  elMb11,
  BodyText,
  FormLayout,
  elFadeIn,
  InputWrapMed,
  InputGroup,
  PersistentNotification,
  elMb6,
} from '@reapit/elements'
import React, { FC } from 'react'
import { FreeformMultiSelectInput } from '../freeform-multi-select'
import { UseFormRegister, UseFormGetValues, DeepMap, FieldError } from 'react-hook-form'
import { CreateWebhookFormSchema } from './webhooks-new'

interface WebhooksExtraFieldsProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  getValues: UseFormGetValues<CreateWebhookFormSchema>
  errors: DeepMap<Partial<CreateWebhookFormSchema>, FieldError>
}

export const WebhooksExtraFields: FC<WebhooksExtraFieldsProps> = ({ register, getValues, errors }) => {
  const extraFields = getValues().extraFields?.split(',').filter(Boolean) ?? []

  return (
    <>
      <div className={elMb11}>
        <BodyText hasNoMargin hasGreyText>
          Add any semi-structured fields that you would like included in the webhook payload. If you{"'"}re not sure
          what to put here, leave it blank.
        </BodyText>
      </div>
      <FormLayout className={elFadeIn}>
        <InputWrapMed>
          <InputGroup>
            <FreeformMultiSelectInput
              id={'semi-structured-fields'}
              defaultValues={[...new Set(extraFields)]}
              {...register('extraFields')}
            />
            {errors.extraFields && (
              <PersistentNotification className={elMb6} isFullWidth isExpanded intent="danger" isInline>
                {errors.extraFields.message}
              </PersistentNotification>
            )}
          </InputGroup>
        </InputWrapMed>
      </FormLayout>
    </>
  )
}
