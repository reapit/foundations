import React, { FC, useEffect } from 'react'
import { Button, ButtonGroup, FormLayout, InputError, InputGroup, InputWrap, Select, TextArea } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { DeveloperModel, UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
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
  billingEmail: string
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
    billingEmail,
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
      billingEmail,
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
      action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateDeveloper],
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
    billingEmail,
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
      billingEmail: billingEmail ?? '',
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
            errorMessage={errors?.company?.message}
            icon={errors?.company?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('telephone')}
            label="Telephone"
            errorMessage={errors?.telephone?.message}
            icon={errors?.telephone?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('website')}
            label="Website Address"
            errorMessage={errors?.website?.message}
            icon={errors?.website?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('email')}
            label="Office Email"
            disabled
            errorMessage={errors?.email?.message}
            icon={errors?.email?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('billingEmail')}
            label="Notifications Email"
            errorMessage={errors?.billingEmail?.message}
            icon={errors?.billingEmail?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('noTaxRegistration')} label="No VAT Number" type="checkbox" />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('taxNumber')}
            label="VAT Number if registered"
            disabled={noTaxRegistrationValue}
            errorMessage={errors?.taxNumber?.message}
            icon={errors?.taxNumber?.message ? 'asteriskSystem' : null}
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
            disabled={noregistrationNumberValue}
            errorMessage={errors?.registrationNumber?.message}
            icon={errors?.registrationNumber?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrapFull>
          <InputGroup>
            <TextArea {...register('about')} />
            <Label>About Company</Label>
            {errors?.about?.message && <InputError message={errors.about.message} />}
          </InputGroup>
        </InputWrapFull>
        <InputWrap>
          <InputGroup
            {...register('buildingName')}
            label="Building Name"
            errorMessage={errors?.buildingName?.message}
            icon={errors?.buildingName?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('buildingNumber')}
            label="Building Number"
            errorMessage={errors?.buildingNumber?.message}
            icon={errors?.buildingNumber?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('line1')}
            label="Address Line 1"
            errorMessage={errors?.line1?.message}
            icon={errors?.line1?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('line2')}
            label="Address Line 2"
            errorMessage={errors?.line2?.message}
            icon={errors?.line2?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('line3')}
            label="Address Line 3"
            errorMessage={errors?.line3?.message}
            icon={errors?.line3?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('line4')}
            label="Address Line 4"
            errorMessage={errors?.line4?.message}
            icon={errors?.line4?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('postcode')}
            label="Postcode"
            errorMessage={errors?.postcode?.message}
            icon={errors?.postcode?.message ? 'asteriskSystem' : null}
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
