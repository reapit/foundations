import React, { FC } from 'react'
import { BodyText, FormLayout, InputGroup, InputWrapFull } from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'
import { ExternalPages, openNewPage } from '../../../../utils/navigation'

export const AuthenticationTab: FC<AppEditTabsProps> = ({ register, errors }) => {
  const { redirectUris, signoutUris } = formFields
  return (
    <>
      <BodyText hasGreyText>
        When using the Reapit Connect{' '}
        <a onClick={openNewPage(ExternalPages.authoizationFlowDocs)}>Authorization Code flow,</a> you need to register
        both a re-direct uri and a logout uri. The former is the location in your app, you want Reapit Connect to
        re-direct to after a successful user login, the latter, after a succesful logout. Only uris that are registered
        here will be accepted as a location by Reapit Connect although, you can register multiple locations with a comma
        separated list.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrapFull>
          <InputGroup
            {...redirectUris}
            {...register('redirectUris')}
            errorMessage={errors?.redirectUris?.message}
            icon={errors?.redirectUris?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrapFull>
        <InputWrapFull>
          <InputGroup
            {...signoutUris}
            {...register('signoutUris')}
            errorMessage={errors?.signoutUris?.message}
            icon={errors?.signoutUris?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrapFull>
      </FormLayout>
    </>
  )
}
