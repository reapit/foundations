import React, { FC, useEffect } from 'react'
import { Button, ButtonGroup, FormLayout, InputError, InputGroup, InputWrap, Select, TextArea } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { DeveloperModel, UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { companyInformationValidationSchema } from './validation-schema'
import { COUNTRY_OPTIONS } from './country-options-list'
import { InputWrapFull } from '@reapit/elements'
import { Label } from '@reapit/elements'

export interface CompanyFormProps {
  developer: DeveloperModel
  refreshDeveloper: () => void
}

export type DeveloperUpdateFormValues = {
  company: string
  telephone: string
  website: string
  email: string
  notificationsEmail: string
  noTaxRegistration: boolean
  taxNumber: string
  noregistrationNumber: boolean
  registrationNumber: string
  about: string
  buildingName: string
  buildingNumber: string
  line1: string
  line2: string
  line3: string
  line4: string
  postcode: string
  countryId: string
}

export const handleRefreshDeveloper = (refreshDeveloper: () => void, updateDeveloperSuccess?: boolean) => () => {
  if (updateDeveloperSuccess) {
    refreshDeveloper()
  }
}

export const handleUpdateDeveloper =
  (developer: DeveloperModel, updateDeveloper: SendFunction<UpdateDeveloperModel, boolean>) =>
  ({
    company,
    telephone,
    website,
    notificationsEmail,
    noTaxRegistration,
    taxNumber,
    registrationNumber,
    about,
    buildingName,
    buildingNumber,
    line1,
    line2,
    line3,
    line4,
    postcode,
    countryId,
  }: DeveloperUpdateFormValues) => {
    updateDeveloper({
      ...developer,
      companyName: company,
      telephone,
      website,
      notificationsEmail,
      noTaxRegistration,
      taxNumber,
      registrationNumber,
      about,
      companyAddress: {
        ...developer.companyAddress,
        buildingName,
        buildingNumber,
        line1,
        line2,
        line3,
        line4,
        postcode,
        countryId,
      },
    })
  }

export const CompanyForm: FC<CompanyFormProps> = ({ developer, refreshDeveloper }) => {
  const [, developerUpdating, updateDeveloper, updateDeveloperSuccess] = useReapitUpdate<UpdateDeveloperModel, boolean>(
    {
      reapitConnectBrowserSession,
      action: updateActions[UpdateActionNames.updateDeveloper],
      method: 'PUT',
      uriParams: {
        developerId: developer.id,
      },
    },
  )

  useEffect(handleRefreshDeveloper(refreshDeveloper, updateDeveloperSuccess), [updateDeveloperSuccess])

  const {
    company,
    telephone,
    website,
    email,
    notificationsEmail,
    noTaxRegistration,
    taxNumber,
    registrationNumber,
    about,
    companyAddress,
  } = developer

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DeveloperUpdateFormValues>({
    resolver: yupResolver(companyInformationValidationSchema),
    defaultValues: {
      company: company ?? '',
      telephone: telephone ?? '',
      website: website ?? '',
      email: email ?? '',
      notificationsEmail: notificationsEmail ?? '',
      noTaxRegistration: noTaxRegistration ?? true,
      taxNumber: taxNumber ?? '',
      noregistrationNumber: registrationNumber ? false : true,
      registrationNumber: registrationNumber ?? '',
      about: about ?? '',
      buildingName: companyAddress?.buildingName ?? '',
      buildingNumber: companyAddress?.buildingNumber ?? '',
      line1: companyAddress?.line1 ?? '',
      line2: companyAddress?.line2 ?? '',
      line3: companyAddress?.line3 ?? '',
      line4: companyAddress?.line4 ?? '',
      postcode: companyAddress?.postcode ?? '',
      countryId: companyAddress?.countryId ?? 'GBR',
    },
  })

  const noregistrationNumberValue = useWatch({
    control,
    name: 'noregistrationNumber',
  })

  const noTaxRegistrationValue = useWatch({
    control,
    name: 'noTaxRegistration',
  })

  return (
    <form onSubmit={handleSubmit(handleUpdateDeveloper(developer, updateDeveloper))}>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup
            {...register('company')}
            label="Company Name"
            placeholder="This will be the display name of the company in our AppMarket"
            errorMessage={errors?.company?.message}
            icon={errors?.company?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('telephone')}
            label="Telephone"
            placeholder="A number we can discuss your developer account on"
            errorMessage={errors?.telephone?.message}
            icon={errors?.telephone?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('website')}
            label="Website Address"
            placeholder="Your company's corporate website"
            errorMessage={errors?.website?.message}
            icon={errors?.website?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('email')}
            label="Office Email"
            disabled
            errorMessage={errors?.email?.message}
            icon={errors?.email?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('notificationsEmail')}
            label="Notifications Email"
            placeholder="An email address we can send notifications about your developer account to"
            errorMessage={errors?.notificationsEmail?.message}
            icon={errors?.notificationsEmail?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('noTaxRegistration')} label="No VAT Number" type="checkbox" />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('taxNumber')}
            label="VAT Number"
            placeholder="If VAT registered, your must supply your VAT Number"
            disabled={noTaxRegistrationValue}
            errorMessage={errors?.taxNumber?.message}
            icon={errors?.taxNumber?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('noregistrationNumber')} label="No Company Reg Number" type="checkbox" />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('registrationNumber')}
            label="Company Reg Number"
            placeholder="If you have a formal company, your should supply the registration number"
            disabled={noregistrationNumberValue}
            errorMessage={errors?.registrationNumber?.message}
            icon={errors?.registrationNumber?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrapFull>
          <InputGroup>
            <TextArea
              {...register('about')}
              placeholder="Tell us about your company in a few words. This will appear on your AppMarket listing pages"
            />
            <Label>About Company</Label>
            {errors?.about?.message && <InputError message={errors.about.message} />}
          </InputGroup>
        </InputWrapFull>
        <InputWrap>
          <InputGroup
            {...register('buildingName')}
            label="Building Name"
            placeholder="The building of your corporate office"
            errorMessage={errors?.buildingName?.message}
            icon={errors?.buildingName?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('buildingNumber')}
            label="Building Number"
            placeholder="The number of your corporate office"
            errorMessage={errors?.buildingNumber?.message}
            icon={errors?.buildingNumber?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('line1')}
            label="Address Line 1"
            placeholder="Line one of the address for your office"
            errorMessage={errors?.line1?.message}
            icon={errors?.line1?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('line2')}
            label="Address Line 2"
            placeholder="Line two of the address for your office"
            errorMessage={errors?.line2?.message}
            icon={errors?.line2?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('line3')}
            label="Address Line 3"
            placeholder="Line three of the address for your office"
            errorMessage={errors?.line3?.message}
            icon={errors?.line3?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('line4')}
            label="Address Line 4"
            placeholder="Line four of the address for your office"
            errorMessage={errors?.line4?.message}
            icon={errors?.line4?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('postcode')}
            label="Postcode"
            placeholder="Your office postcode"
            errorMessage={errors?.postcode?.message}
            icon={errors?.postcode?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup>
            <Select {...register('countryId')}>
              {COUNTRY_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <Label>Country</Label>
          </InputGroup>
        </InputWrap>
      </FormLayout>
      <ButtonGroup>
        <Button intent="primary" type="submit" disabled={developerUpdating} loading={developerUpdating}>
          Save Changes
        </Button>
      </ButtonGroup>
    </form>
  )
}
