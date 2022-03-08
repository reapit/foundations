import React, { Dispatch, FC, SetStateAction, useState } from 'react'
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
  useModal,
  ButtonGroup,
  Button,
  FlexContainer,
  ImageUploadModel,
  CreateImageUploadModel,
  elMb11,
} from '@reapit/elements'
import { AppEditTabsProps } from './edit-page-tabs'
import { formFields } from './form-schema/form-fields'
import { getActions, GetActionNames, updateActions, UpdateActionNames } from '@reapit/utils-common'
import { Editor, ImageCropperFileInput, UpdateReturnTypeEnum, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { CategoryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Controller } from 'react-hook-form'
import { exec } from 'pell'
import { v4 as uuid } from 'uuid'
import {
  FEATURE_DIMENSIONS,
  FEATURE_RATIO,
  ICON_DIMENSIONS,
  ICON_RATIO,
  SCREENSHOT_DIMENSIONS,
  SCREENSHOT_RATIO,
} from './constants'

export const handlePreviewImage =
  (setPreviewImage: Dispatch<SetStateAction<string | null>>, openModal: () => void) => (previewImage: string) => {
    setPreviewImage(previewImage)
    openModal()
  }

export const handleClosePreviewImage =
  (setPreviewImage: Dispatch<SetStateAction<string | null>>, closeModal: () => void) => () => {
    setPreviewImage(null)
    closeModal()
  }

export const AppListingTab: FC<AppEditTabsProps> = ({ register, errors, control, getValues }) => {
  const [categories, categoriesLoading] = useReapitGet<CategoryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppCategories],
    queryParams: { pageSize: 25 },
  })

  const [, , createImageUpload] = useReapitUpdate<CreateImageUploadModel, ImageUploadModel>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.fileUpload],
    method: 'POST',
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })

  const onFileUpload = (params: CreateImageUploadModel) => {
    return createImageUpload(params)
  }

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { Modal, openModal, closeModal } = useModal()

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

  const {
    iconImageUrl: iconImageUrlDefault,
    screen1ImageUrl: screen1ImageUrlDefault,
    screen2ImageUrl: screen2ImageUrlDefault,
    screen3ImageUrl: screen3ImageUrlDefault,
    screen4ImageUrl: screen4ImageUrlDefault,
    screen5ImageUrl: screen5ImageUrlDefault,
  } = getValues()

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
              {errors?.categoryId?.message && <InputError message={errors?.categoryId?.message} />}
            </InputGroup>
          )}
        </InputWrap>
        <InputWrapFull>
          <InputGroup>
            <Label>{summary.label}</Label>
            <TextArea placeholder={summary.placeholder} {...register('summary')} />
          </InputGroup>
          {errors?.summary?.message && <InputError message={errors?.summary?.message} />}
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
          {errors?.description?.message && <InputError message={errors?.description?.message} />}
        </InputWrapFull>
        <InputWrap>
          <ImageCropperFileInput
            {...register('iconImageUrl')}
            label={iconImageUrl.label}
            onFileView={handlePreviewImage(setPreviewImage, openModal)}
            defaultValue={iconImageUrlDefault}
            onFileUpload={onFileUpload}
            placeholderText="Dimensions: 96px x 96px"
            fileName={uuid()}
            aspect={ICON_RATIO}
            resizeDimensions={ICON_DIMENSIONS}
          />
          {errors?.iconImageUrl?.message && <InputError message={errors?.iconImageUrl?.message} />}
        </InputWrap>
        <InputWrap>
          <ImageCropperFileInput
            {...register('screen1ImageUrl')}
            label={screen1ImageUrl.label}
            onFileView={handlePreviewImage(setPreviewImage, openModal)}
            defaultValue={screen1ImageUrlDefault}
            onFileUpload={onFileUpload}
            placeholderText="Dimensions: 495px x 222px"
            fileName={uuid()}
            aspect={FEATURE_RATIO}
            resizeDimensions={FEATURE_DIMENSIONS}
          />
          {errors?.screen1ImageUrl?.message && <InputError message={errors?.screen1ImageUrl?.message} />}
        </InputWrap>
        <InputWrap>
          <ImageCropperFileInput
            {...register('screen2ImageUrl')}
            label={screen2ImageUrl.label}
            onFileView={handlePreviewImage(setPreviewImage, openModal)}
            defaultValue={screen2ImageUrlDefault}
            onFileUpload={onFileUpload}
            placeholderText="Dimensions: 598px x 457px"
            fileName={uuid()}
            aspect={SCREENSHOT_RATIO}
            resizeDimensions={SCREENSHOT_DIMENSIONS}
          />
          {errors?.screen2ImageUrl?.message && <InputError message={errors?.screen2ImageUrl?.message} />}
        </InputWrap>
        <InputWrap>
          <ImageCropperFileInput
            {...register('screen3ImageUrl')}
            label={screen3ImageUrl.label}
            onFileView={handlePreviewImage(setPreviewImage, openModal)}
            defaultValue={screen3ImageUrlDefault}
            onFileUpload={onFileUpload}
            placeholderText="Dimensions: 598px x 457px"
            fileName={uuid()}
            aspect={SCREENSHOT_RATIO}
            resizeDimensions={SCREENSHOT_DIMENSIONS}
          />
          {errors?.screen3ImageUrl?.message && <InputError message={errors?.screen3ImageUrl?.message} />}
        </InputWrap>
        <InputWrap>
          <ImageCropperFileInput
            {...register('screen4ImageUrl')}
            label={screen4ImageUrl.label}
            onFileView={handlePreviewImage(setPreviewImage, openModal)}
            defaultValue={screen4ImageUrlDefault}
            onFileUpload={onFileUpload}
            placeholderText="Dimensions: 598px x 457px"
            fileName={uuid()}
            aspect={SCREENSHOT_RATIO}
            resizeDimensions={SCREENSHOT_DIMENSIONS}
          />
          {errors?.screen4ImageUrl?.message && <InputError message={errors?.screen4ImageUrl?.message} />}
        </InputWrap>
        <InputWrap>
          <ImageCropperFileInput
            {...register('screen5ImageUrl')}
            label={screen5ImageUrl.label}
            onFileView={handlePreviewImage(setPreviewImage, openModal)}
            defaultValue={screen5ImageUrlDefault}
            onFileUpload={onFileUpload}
            placeholderText="Dimensions: 598px x 457px"
            fileName={uuid()}
            aspect={SCREENSHOT_RATIO}
            resizeDimensions={SCREENSHOT_DIMENSIONS}
          />
          {errors?.screen5ImageUrl?.message && <InputError message={errors?.screen5ImageUrl?.message} />}
        </InputWrap>
        <Modal title="Image Preview">
          <FlexContainer className={elMb11} isFlexAlignCenter isFlexJustifyCenter>
            {previewImage && <img src={previewImage} />}
          </FlexContainer>
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={handleClosePreviewImage(setPreviewImage, closeModal)}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      </FormLayout>
    </>
  )
}
