import { ReapitConnectSession } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  CreateImageUploadModel,
  elMb5,
  ElToggleItem,
  FileInput,
  FormLayout,
  Icon,
  IconNames,
  iconSet,
  ImageUploadModel,
  Input,
  InputError,
  InputGroup,
  InputWrapFull,
  Label,
  Modal,
  MultiSelectInput,
  PersistentNotification,
  Select,
  Subtitle,
  Toggle,
  ToggleRadio,
} from '@reapit/elements'
import {
  AppsBrowseConfigEnum,
  AppsBrowseConfigItemFiltersInterface,
  AppsBrowseConfigItemInterface,
  AppSummaryModelPagedResult,
  CategoryModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { SearchableMultiSelect, UpdateReturnTypeEnum, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import React, { FC, useState } from 'react'
import { useController, useForm, useWatch } from 'react-hook-form'
import { capitaliseText, reactPickerStyles } from './app-browse.styles'
import { appModal } from './modal.styles'
import { SketchPicker } from 'react-color'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { v4 as uuid } from 'uuid'
import { ModalHelperText } from './subs-helper-text'

// Commenting out for now, we may want to use the image cropper again however, for now, assume images are
// variable size and allow marketing to decide the dimensions.
// const UPLOAD_IMAGE_DIMENSIONS: Record<string, ResizeDimensions> = {
//   icon: {
//     width: 96,
//     height: 96,
//   },
//   feature: {
//     width: 495,
//     height: 222,
//   },
//   screenshot: {
//     width: 598,
//     height: 457,
//   },
// }

const upsertAppMarketing =
  (
    configType: AppsBrowseConfigEnum,
    index: number,
    setLoading: (loading: boolean) => void,
    send: (app: AppsBrowseConfigItemInterface) => Promise<boolean | AppsBrowseConfigItemInterface>,
    closeModal: () => void,
    upsertItem: (item: AppsBrowseConfigItemInterface) => void,
    reset: () => void,
  ) =>
  async (app: any) => {
    setLoading(true)

    const filters: AppsBrowseConfigItemFiltersInterface = {}
    const category = app?.filters?.category
    const id = app?.filters?.id
    const isFeatured = app?.filters?.isFeatured
    const isFree = app?.filters?.isFree

    if (category?.length) filters.category = category?.split(',').filter(Boolean)
    if (id?.length) filters.id = id
    if (isFeatured === 'isFeatured') filters.isFeatured = true
    if (isFeatured === 'notFeatured') filters.isFeatured = false
    if (isFree === 'free') filters.isFree = true
    if (isFree === 'paid') filters.isFree = false

    const returned = await send({
      ...app,
      content: {
        ...app.content,
        brandColour: app.content?.brandColour?.hex || app.content?.brandColour,
      },
      live: {
        ...app.live,
        timeFrom: app?.live?.timeFrom !== '' ? app?.live.timeFrom : undefined,
        timeTo: app?.live?.timeTo !== '' ? app?.live.timeTo : undefined,
      },
      filters,
      index,
      configType,
    })

    setLoading(false)
    if (returned) {
      reset()
      upsertItem(returned as AppsBrowseConfigItemInterface)
      closeModal()
    }
  }

type AppBrowseUpsertModalDefaultProps = {
  modalIsOpen: boolean
  closeModal: () => void
  connectSession: ReapitConnectSession
  defaultValues: AppsBrowseConfigItemInterface
  upsertItem: (item: AppsBrowseConfigItemInterface) => void
}

export const AppBrowseUpsertModal: FC<AppBrowseUpsertModalDefaultProps> = ({
  defaultValues,
  modalIsOpen,
  connectSession,
  closeModal,
  upsertItem,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      ...defaultValues,
      filters: {
        ...defaultValues.filters,
        isFeatured:
          defaultValues.filters?.isFeatured === false
            ? 'notFeatured'
            : defaultValues.filters?.isFeatured === true
            ? 'isFeatured'
            : 'notApplied',
        category: defaultValues.filters?.category?.join(',') || '',
      },
      live: {
        ...(defaultValues?.live || {}),
        timeFrom: defaultValues?.live?.timeFrom?.toString().split(':00').shift(),
        timeTo: defaultValues?.live?.timeTo?.toString().split(':00').shift(),
      },
    },
  })

  const reset = () => () => {
    setValue('id', undefined)
    setValue('content', undefined)
    setValue('live', {
      isLive: false,
      timeFrom: undefined,
      timeTo: undefined,
    })
    setValue('filters', {
      category: '',
      isFeatured: 'notApplied',
    })
  }

  const [loading, setLoading] = useState<boolean>(false)

  const [categories] = useReapitGet<CategoryModelPagedResult>({
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

  const [initialApps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', pageSize: 100, id: defaultValues?.filters?.id },
    fetchWhenTrue: [Array.isArray(defaultValues?.filters?.id), defaultValues?.filters?.id?.length],
  })

  const [, , send] = useReapitUpdate<AppsBrowseConfigItemInterface, AppsBrowseConfigItemInterface>({
    action: getActions(window.reapit.config.appEnv)[
      defaultValues?.id ? GetActionNames.postAppMarketAdmin : GetActionNames.getAppMarketAdmin
    ],
    method: defaultValues?.id ? 'PUT' : 'POST',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    returnType: UpdateReturnTypeEnum.RESPONSE,
    reapitConnectBrowserSession,
    uriParams: {
      id: defaultValues?.id,
    },
  })

  const icons = Object.keys(iconSet).filter((icon) => icon.includes('Infographic'))
  const iconName = useWatch({ name: 'content.iconName', control }) as IconNames

  const onFileUpload = async (params: CreateImageUploadModel) => {
    return createImageUpload(params)
  }
  const [imageView, setImageView] = useState<string | false>(false)

  const { field } = useController({
    name: 'content.brandColour',
    defaultValue: defaultValues?.content?.brandColour,
    control,
  })

  return (
    <Modal
      className={appModal}
      isOpen={modalIsOpen}
      title="AppMarket Item"
      onModalClose={() => {
        reset()
        closeModal()
      }}
    >
      {modalIsOpen && (
        <form
          onSubmit={handleSubmit(
            upsertAppMarketing(
              defaultValues.configType,
              defaultValues.index || 0,
              setLoading,
              send,
              closeModal,
              upsertItem,
              reset,
            ),
          )}
        >
          <Subtitle>Filters</Subtitle>
          <ModalHelperText type={defaultValues.configType} />
          <FormLayout hasMargin>
            <SearchableMultiSelect
              id="select-multi-apps"
              reapitConnectBrowserSession={reapitConnectBrowserSession}
              action={getActions(window.reapit.config.appEnv)[GetActionNames.getApps]}
              valueKey="id"
              nameKey="name"
              searchKey="appName"
              dataListKey="data"
              currentValues={getValues('filters.id') || []}
              defaultList={initialApps?.data || []}
              errorString={errors.id?.message || ''}
              noneSelectedLabel="No apps selected"
              queryParams={{ pageSize: 100, isListed: true }}
              onChange={(event) =>
                setValue('filters.id', event.target.value !== '' ? event.target.value.split(',') : [])
              }
              label="Search Apps"
            />
            <InputWrapFull>
              <InputGroup>
                <Label>Categories</Label>
                <MultiSelectInput
                  id="filters.category"
                  {...register('filters.category')}
                  options={
                    categories?.data?.map(({ name, id }) => ({
                      name: name as string,
                      value: id as string,
                    })) || []
                  }
                  defaultValues={defaultValues?.filters?.category}
                />
                {errors.filters?.category?.message && (
                  <InputError message={errors.filters.category.message.toString()} />
                )}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Is Free</Label>
                <ToggleRadio
                  hasGreyBg
                  {...register('filters.isFree')}
                  options={[
                    {
                      id: 'not-applied-free',
                      value: 'notApplied',
                      text: 'Not Applied',
                      isChecked: defaultValues.filters?.isFree === undefined,
                    },
                    {
                      id: 'free',
                      value: 'free',
                      text: 'Free',
                      isChecked: Boolean(defaultValues.filters?.isFree),
                    },
                    {
                      id: 'paid',
                      value: 'paid',
                      text: 'Paid',
                      isChecked: defaultValues.filters?.isFree === false,
                    },
                  ]}
                />
                {errors.filters?.isFree?.message && <InputError message={errors.filters?.isFree.message.toString()} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Is Featured</Label>
                <ToggleRadio
                  hasGreyBg
                  {...register('filters.isFeatured')}
                  options={[
                    {
                      id: 'not-applied-featured',
                      value: 'notApplied',
                      text: 'Not Applied',
                      isChecked: defaultValues.filters?.isFeatured === undefined,
                    },
                    {
                      id: 'is-featured',
                      value: 'isFeatured',
                      text: 'Is Featured',
                      isChecked: Boolean(defaultValues.filters?.isFeatured),
                    },
                    {
                      id: 'not-featured',
                      value: 'notFeatured',
                      text: 'Not Featured',
                      isChecked: defaultValues.filters?.isFeatured === false,
                    },
                  ]}
                />
                {errors.filters?.isFeatured?.message && (
                  <InputError message={errors.filters?.isFeatured.message.toString()} />
                )}
              </InputGroup>
            </InputWrapFull>
          </FormLayout>
          <Subtitle>Advertising Content</Subtitle>
          <FormLayout hasMargin>
            <InputWrapFull>
              <InputGroup>
                <Label>Brand Colour</Label>
                <SketchPicker className={reactPickerStyles} triangle={'hide'} {...field} color={field.value} />
                {errors.content?.brandColour?.message && (
                  <InputError message={errors.content?.brandColour.message.toString()} />
                )}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Title</Label>
                <Input {...register('content.title')} />
                {errors.content?.title?.message && <InputError message={errors.content?.title.message.toString()} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Strapline</Label>
                <Input {...register('content.strapline')} />
                {errors.content?.strapline?.message && (
                  <InputError message={errors.content?.strapline.message.toString()} />
                )}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Icon</Label>
                <Select className={capitaliseText} {...register('content.iconName')}>
                  <option value="">None Selected</option>
                  {icons.map((iconName) => (
                    <option key={iconName} value={iconName}>
                      {iconName.replace(/([^A-Z])([A-Z])/g, '$1 $2').toLowerCase()}
                    </option>
                  ))}
                </Select>
                {errors.content?.iconName?.message && (
                  <InputError message={errors.content?.iconName.message.toString()} />
                )}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <Label>Icon Preview</Label>
              {iconName?.length ? (
                <Icon icon={iconName} fontSize="3em" />
              ) : (
                <BodyText hasGreyText>No Icon Selected</BodyText>
              )}
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <FileInput
                  label={'Image'}
                  {...register('content.imageUrl')}
                  onFileView={(image) => setImageView(image)}
                  onFileUpload={onFileUpload}
                  placeholderText="Upload Image"
                  fileName={uuid()}
                  defaultValue={defaultValues.content?.imageUrl}
                />
                {errors.content?.imageUrl?.message && (
                  <InputError message={errors.content?.imageUrl.message.toString()} />
                )}
              </InputGroup>
            </InputWrapFull>
          </FormLayout>
          <Subtitle>Live</Subtitle>
          <FormLayout hasMargin>
            <InputWrapFull>
              <InputGroup>
                <Label>Live From</Label>
                <Input {...register('live.timeFrom')} type="datetime-local" />
                {errors.live?.timeFrom?.message && <InputError message={errors.live?.timeFrom.message.toString()} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Live To</Label>
                <Input {...register('live.timeTo')} type="datetime-local" />
                {errors.live?.timeTo?.message && <InputError message={errors.live?.timeTo.message.toString()} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <PersistentNotification className={elMb5} intent="secondary" isExpanded={true} isInline isFullWidth>
                If a &lsquo;Live To&rsquo; or &lsquo;Live From&rsquo; value is set, &lsquo;Is Live&rsquo; will be
                ignored.
              </PersistentNotification>
              <InputGroup>
                <Label>Is Live</Label>
                <Toggle id="toggle-live" {...register('live.isLive')} hasGreyBg>
                  <ElToggleItem>Yes</ElToggleItem>
                  <ElToggleItem>No</ElToggleItem>
                </Toggle>
                {errors.live?.isLive?.message && <InputError message={errors.live?.isLive.message.toString()} />}
              </InputGroup>
            </InputWrapFull>
          </FormLayout>
          <ButtonGroup>
            <Button intent="primary" disabled={loading} loading={loading}>
              Save
            </Button>
          </ButtonGroup>
        </form>
      )}
      <Modal isOpen={!!imageView} onModalClose={() => setImageView(false)}>
        <div>
          <img src={imageView as string} />
        </div>
        <Button intent="secondary" onClick={() => setImageView(false)}>
          Close
        </Button>
      </Modal>
    </Modal>
  )
}
