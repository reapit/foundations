import { ReapitConnectSession } from '@reapit/connect-session'
import {
  Button,
  ButtonGroup,
  CreateImageUploadModel,
  FormLayout,
  iconSet,
  ImageUploadModel,
  Input,
  InputError,
  InputGroup,
  InputWrapFull,
  Label,
  Modal,
  MultiSelectInput,
  Select,
  Subtitle,
  Title,
} from '@reapit/elements'
import {
  AppsBrowseConfigEnum,
  AppsBrowseConfigItemInterface,
  AppSummaryModelPagedResult,
  CategoryModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import {
  ImageCropperFileInput,
  ResizeDimensions,
  SearchableMultiSelect,
  UpdateReturnTypeEnum,
  useReapitGet,
  useReapitUpdate,
} from '@reapit/utils-react'
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { reactPickerStyles } from './app-browse.styles'
import { appModal } from './modal.styles'
import { SketchPicker } from 'react-color'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { v4 as uuid } from 'uuid'

const UPLOAD_IMAGE_DIMENSIONS: Record<string, ResizeDimensions> = {
  icon: {
    width: 96,
    height: 96,
  },
  feature: {
    width: 495,
    height: 222,
  },
  screenshot: {
    width: 598,
    height: 457,
  },
}

const upsertAppMarketing =
  (
    configType: AppsBrowseConfigEnum,
    setLoading: (loading: boolean) => void,
    send: (app: AppsBrowseConfigItemInterface) => Promise<boolean | AppsBrowseConfigItemInterface>,
    closeModal: () => void,
    upsertItem: (item: AppsBrowseConfigItemInterface) => void,
  ) =>
  async (app: any) => {
    setLoading(true)

    const returned = await send({
      ...app,
      live: {
        ...app.live,
        timeFrom: app?.live?.timeFrom !== '' ? app?.live.timeFrom : undefined,
        timeTo: app?.live?.timeTo !== '' ? app?.live.timeTo : undefined,
      },
      filters: {
        ...app.filters,
        category: app?.filters?.category?.split(',') || [],
      },
      configType,
    })

    setLoading(false)
    if (returned) {
      upsertItem(returned as AppsBrowseConfigItemInterface)
      closeModal()
    }
  }

export const AppBrowseUpsertModal: FC<{
  appMarketConfig?: AppsBrowseConfigItemInterface
  modalIsOpen: boolean
  closeModal: () => void
  configType: AppsBrowseConfigEnum
  connectSession: ReapitConnectSession
  upsertItem: (item: AppsBrowseConfigItemInterface) => void
}> = ({ appMarketConfig, modalIsOpen, connectSession, closeModal, configType, upsertItem }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm({
    defaultValues: appMarketConfig,
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [color, setColor] = useState<string>(appMarketConfig?.content?.brandColour || '#FF0000')

  const [categories] = useReapitGet<CategoryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppCategories],
    queryParams: { pageSize: 25 },
  })

  useEffect(() => {
    setValue('content.brandColour', color)
  }, [color])

  const [, , createImageUpload] = useReapitUpdate<CreateImageUploadModel, ImageUploadModel>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.fileUpload],
    method: 'POST',
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })

  const [initialApps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', pageSize: 100, id: appMarketConfig?.filters?.id },
    fetchWhenTrue: [Array.isArray(appMarketConfig?.filters?.id)],
  })

  const [, , send] = useReapitUpdate<AppsBrowseConfigItemInterface, AppsBrowseConfigItemInterface>({
    action: getActions(window.reapit.config.appEnv)[
      appMarketConfig?.id ? GetActionNames.postAppMarketAdmin : GetActionNames.getAppMarketAdmin
    ],
    method: appMarketConfig?.id ? 'PUT' : 'POST',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    returnType: UpdateReturnTypeEnum.RESPONSE,
    reapitConnectBrowserSession,
    uriParams: {
      id: appMarketConfig?.id,
    },
  })

  const onFileUpload = async (params: CreateImageUploadModel) => {
    const res = await createImageUpload(params)

    console.log('res', res)

    return res
  }

  return (
    <Modal
      className={appModal}
      isOpen={modalIsOpen}
      onModalClose={() => {
        reset(undefined)
        closeModal()
      }}
    >
      <Title>New Item</Title>
      <form onSubmit={handleSubmit(upsertAppMarketing(configType, setLoading, send, closeModal, upsertItem))}>
        <Subtitle>Filters</Subtitle>
        <FormLayout>
          <InputWrapFull>
            <InputGroup>
              <Label>App</Label>
              <SearchableMultiSelect
                id="select-multi-apps"
                reapitConnectBrowserSession={reapitConnectBrowserSession}
                action={getActions(window.reapit.config.appEnv)[GetActionNames.getApps]}
                valueKey="id"
                nameKey="name"
                searchKey="name"
                dataListKey="data"
                currentValues={getValues('filters.id') || []}
                defaultList={initialApps?.data || []}
                errorString={errors.id?.message || ''}
                noneSelectedLabel="No apps selected"
                queryParams={{ pageSize: 100 }}
                onChange={(event) =>
                  setValue('filters.id', event.target.value !== '' ? event.target.value.split(',') : [])
                }
              />
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Categories</Label>
              <MultiSelectInput
                id="filters.category"
                {...register('filters.category')}
                options={
                  categories?.data?.map(({ name, description }) => ({
                    name: description as string,
                    value: name as string,
                  })) || []
                }
                defaultValues={appMarketConfig?.filters?.category}
              />
              {errors.filters?.category?.message && <InputError message={errors.filters.category.message.toString()} />}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Is Free</Label>
              <Input {...register('filters.isFree')} type="checkbox" />
              {errors.filters?.isFree?.message && <InputError message={errors.filters?.isFree.message.toString()} />}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Is Featured</Label>
              <Input {...register('filters.isFeatured')} type="checkbox" />
              {errors.filters?.isFeatured?.message && (
                <InputError message={errors.filters?.isFeatured.message.toString()} />
              )}
            </InputGroup>
          </InputWrapFull>
        </FormLayout>
        <Subtitle>Advertising Content</Subtitle>
        <FormLayout>
          <InputWrapFull>
            <InputGroup>
              <Label>Brand Colour</Label>
              <SketchPicker
                className={reactPickerStyles}
                triangle={'hide'}
                {...register('content.brandColour')}
                color={color}
                onChange={(colour) => {
                  setColor(colour.hex)
                }}
              />
              {errors.content?.brandColour?.message && (
                <InputError message={errors.content?.brandColour.message.toString()} />
              )}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Title</Label>
              <Input {...register('content.title')} defaultValue={appMarketConfig?.content?.title} />
              {errors.content?.title?.message && <InputError message={errors.content?.title.message.toString()} />}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Strapline</Label>
              <Input {...register('content.strapline')} defaultValue={appMarketConfig?.content?.strapline} />
              {errors.content?.strapline?.message && (
                <InputError message={errors.content?.strapline.message.toString()} />
              )}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Icon</Label>
              <Select {...register('content.iconName')} defaultValue={appMarketConfig?.content?.iconName}>
                <option></option>
                {Object.keys(iconSet).map((iconName) => (
                  <option key={iconName} value={iconName}>
                    {iconName}
                  </option>
                ))}
              </Select>
              {errors.content?.iconName?.message && (
                <InputError message={errors.content?.iconName.message.toString()} />
              )}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Image</Label>
              <ImageCropperFileInput
                label={'Image'}
                {...register('content.imageUrl')}
                defaultValue={appMarketConfig?.content?.imageUrl}
                onFileUpload={onFileUpload}
                placeholderText="Dimensions: 96px x 96px"
                fileName={uuid()}
                aspect={UPLOAD_IMAGE_DIMENSIONS.icon.width / UPLOAD_IMAGE_DIMENSIONS.icon.height}
                resizeDimensions={UPLOAD_IMAGE_DIMENSIONS.icon}
              />
              {errors.content?.imageUrl?.message && (
                <InputError message={errors.content?.imageUrl.message.toString()} />
              )}
            </InputGroup>
          </InputWrapFull>
        </FormLayout>
        <Subtitle>Live</Subtitle>
        <FormLayout>
          <InputWrapFull>
            <InputGroup>
              <Label>Live From</Label>
              <Input
                {...register('live.timeFrom')}
                type="datetime-local"
                defaultValue={appMarketConfig?.live?.timeFrom?.toString()}
              />
              {errors.live?.timeFrom?.message && <InputError message={errors.live?.timeFrom.message.toString()} />}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Live To</Label>
              <Input
                {...register('live.timeTo')}
                type="datetime-local"
                defaultValue={appMarketConfig?.live?.timeTo?.toString()}
              />
              {errors.live?.timeTo?.message && <InputError message={errors.live?.timeTo.message.toString()} />}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Is Live</Label>
              <Input {...register('live.isLive')} type="checkbox" />
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
    </Modal>
  )
}
