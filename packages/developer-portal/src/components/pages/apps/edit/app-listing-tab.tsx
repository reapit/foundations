import React, { FC } from 'react'
import {
  BodyText,
  FormLayout,
  InputError,
  InputGroup,
  InputWrap,
  InputWrapFull,
  Label,
  Loader,
  Select,
  Subtitle,
  TextArea,
} from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'
import { getActions, GetActionNames } from '@reapit/utils-common'
import { Editor, useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { CategoryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Controller } from 'react-hook-form'
import { exec } from 'pell'

export const AppListingTab: FC<AppEditTabsProps> = ({ register, errors, control }) => {
  const [categories, categoriesLoading] = useReapitGet<CategoryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppCategories],
    queryParams: { pageSize: 25 },
  })

  const {
    supportEmail,
    telephone,
    homePage,
    launchUri,
    termsAndConditionsUrl,
    privacyPolicyUrl,
    pricingUrl,
    categoryId,
    description,
    summary,
    isFree,
    iconImageUrl,
    screen1ImageUrl,
    screen2ImageUrl,
    screen3ImageUrl,
    screen4ImageUrl,
    screen5ImageUrl,
  } = formFields
  return (
    <>
      <Subtitle>App Listing</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non pulvinar tellus, quis pulvinar dui. Nunc
        enim libero, ullamcorper ac ex id, tincidunt dapibus lectus. Vestibulum at porta quam, ac condimentum dui. Duis
        ornare enim sed magna tincidunt volutpat.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup {...supportEmail} {...register('supportEmail')} errorMessage={errors?.supportEmail?.message} />
        </InputWrap>
        <InputWrap>
          <InputGroup {...telephone} {...register('telephone')} errorMessage={errors?.telephone?.message} />
        </InputWrap>
        <InputWrap>
          <InputGroup {...homePage} {...register('homePage')} errorMessage={errors?.homePage?.message} />
        </InputWrap>
        <InputWrap>
          <InputGroup {...launchUri} {...register('launchUri')} errorMessage={errors?.launchUri?.message} />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...termsAndConditionsUrl}
            {...register('termsAndConditionsUrl')}
            errorMessage={errors?.termsAndConditionsUrl?.message}
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...privacyPolicyUrl}
            {...register('privacyPolicyUrl')}
            errorMessage={errors?.privacyPolicyUrl?.message}
          />
        </InputWrap>
        <InputWrap>
          <InputGroup {...pricingUrl} {...register('pricingUrl')} errorMessage={errors?.pricingUrl?.message} />
        </InputWrap>
        <InputWrap>
          <InputGroup {...isFree} {...register('isFree')} errorMessage={errors?.isFree?.message} />
        </InputWrap>
        <InputWrap>
          {categoriesLoading && <Loader />}
          {categories && (
            <InputGroup>
              <Label>{categoryId.label}</Label>
              <Select {...register('categoryId')}>
                <option value="">Select Option</option>
                {categories.data?.map(({ id, description }) => (
                  <option key={id} value={id}>
                    {description}
                  </option>
                ))}
              </Select>
              {errors.categoryId?.message && <InputError message={errors.categoryId?.message} />}
            </InputGroup>
          )}
        </InputWrap>
        <InputWrapFull>
          <InputGroup>
            <Label>{summary.label}</Label>
            <TextArea placeholder={summary.placeholder} {...register('summary')} />
          </InputGroup>
          {errors.summary?.message && <InputError message={errors.summary?.message} />}
        </InputWrapFull>
        <InputWrapFull>
          <Label>{description.label}</Label>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Editor
                {...description}
                defaultContent={value}
                onChange={onChange}
                onBlur={onBlur}
                actions={[
                  'bold',
                  'italic',
                  'paragraph',
                  'olist',
                  'ulist',
                  'link',
                  {
                    name: 'test',
                    icon: '<b>H<sub>5</sub></b>',
                    title: 'Add heading 5',
                    result: () => exec('formatBlock', '<h5>'),
                  },
                ]}
              />
            )}
          />
          {errors.description?.message && <InputError message={errors.description?.message} />}
        </InputWrapFull>
        <InputWrap>
          <InputGroup {...iconImageUrl} {...register('iconImageUrl')} errorMessage={errors?.iconImageUrl?.message} />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...screen1ImageUrl}
            {...register('screen1ImageUrl')}
            errorMessage={errors?.screen1ImageUrl?.message}
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...screen2ImageUrl}
            {...register('screen2ImageUrl')}
            errorMessage={errors?.screen2ImageUrl?.message}
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...screen3ImageUrl}
            {...register('screen3ImageUrl')}
            errorMessage={errors?.screen3ImageUrl?.message}
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...screen4ImageUrl}
            {...register('screen4ImageUrl')}
            errorMessage={errors?.screen4ImageUrl?.message}
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...screen5ImageUrl}
            {...register('screen5ImageUrl')}
            errorMessage={errors?.screen5ImageUrl?.message}
          />
        </InputWrap>
      </FormLayout>
    </>
  )
}
