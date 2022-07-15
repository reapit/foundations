import { ReapitConnectSession } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  CreateImageUploadModel,
  ElToggleItem,
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
  Toggle,
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
import React, { FC, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
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
      content: {
        ...app.content,
        brandColour: app.content?.brandColour?.hex || app.content?.brandColour,
      },
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
    reset,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      ...defaultValues,
      filters: {
        ...defaultValues.filters,
        category: defaultValues.filters?.category?.join(',') || '',
      },
      live: {
        ...(defaultValues?.live || {}),
        timeFrom: defaultValues?.live?.timeFrom?.toString().split(':00').shift(),
        timeTo: defaultValues?.live?.timeTo?.toString().split(':00').shift(),
      },
    },
  })

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
    fetchWhenTrue: [Array.isArray(defaultValues?.filters?.id)],
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

  const onFileUpload = async (params: CreateImageUploadModel) => {
    const res = await createImageUpload(params)

    return res
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
      onModalClose={() => {
        reset(undefined)
        closeModal()
      }}
    >
      <Title>New Item</Title>
      {modalIsOpen && (
        <form
          onSubmit={handleSubmit(
            upsertAppMarketing(defaultValues.configType, setLoading, send, closeModal, upsertItem),
          )}
        >
          <Subtitle>Filters</Subtitle>
          <BodyText hasGreyText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget pellentesque tortor. Sed non enim id
            arcu efficitur aliquet vel ac augue. Aenean non quam nec sapien faucibus volutpat vel ut dolor. Donec sit
            amet suscipit magna. Donec auctor pulvinar varius. Nulla dignissim in mauris vel vulputate.
          </BodyText>
          <FormLayout hasMargin>
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
              label="Search Apps"
            />
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
                <Toggle id="toggle-free" {...register('filters.isFree')} hasGreyBg>
                  <ElToggleItem>Free</ElToggleItem>
                  <ElToggleItem>Paid</ElToggleItem>
                </Toggle>
                {errors.filters?.isFree?.message && <InputError message={errors.filters?.isFree.message.toString()} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Is Featured</Label>
                <Toggle id="toggle-featured" {...register('filters.isFeatured')} hasGreyBg>
                  <ElToggleItem>Yes</ElToggleItem>
                  <ElToggleItem>No</ElToggleItem>
                </Toggle>
                {errors.filters?.isFeatured?.message && (
                  <InputError message={errors.filters?.isFeatured.message.toString()} />
                )}
              </InputGroup>
            </InputWrapFull>
          </FormLayout>
          <Subtitle>Advertising Content</Subtitle>
          <BodyText hasGreyText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget pellentesque tortor. Sed non enim id
            arcu efficitur aliquet vel ac augue. Aenean non quam nec sapien faucibus volutpat vel ut dolor. Donec sit
            amet suscipit magna. Donec auctor pulvinar varius. Nulla dignissim in mauris vel vulputate.
          </BodyText>
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
                <Input
                  {...register('content.title')}
                  // defaultValue={appMarketConfig?.content?.title}
                />
                {errors.content?.title?.message && <InputError message={errors.content?.title.message.toString()} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Strapline</Label>
                <Input
                  {...register('content.strapline')}
                  // defaultValue={appMarketConfig?.content?.strapline}
                />
                {errors.content?.strapline?.message && (
                  <InputError message={errors.content?.strapline.message.toString()} />
                )}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Icon</Label>
                <Select
                  {...register('content.iconName')}
                  // defaultValue={appMarketConfig?.content?.iconName}
                >
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
                <ImageCropperFileInput
                  label={'Image'}
                  {...register('content.imageUrl')}
                  onFileView={(image) => setImageView(image)}
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
          <BodyText hasGreyText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget pellentesque tortor. Sed non enim id
            arcu efficitur aliquet vel ac augue. Aenean non quam nec sapien faucibus volutpat vel ut dolor. Donec sit
            amet suscipit magna. Donec auctor pulvinar varius. Nulla dignissim in mauris vel vulputate.
          </BodyText>
          <FormLayout hasMargin>
            <InputWrapFull>
              <InputGroup>
                <Label>Live From</Label>
                <Input
                  {...register('live.timeFrom')}
                  type="datetime-local"
                  // defaultValue={appMarketConfig?.live?.timeFrom?.toString().split(':00').shift()}
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
                  // defaultValue={appMarketConfig?.live?.timeTo?.toString().split(':00').shift()}
                />
                {errors.live?.timeTo?.message && <InputError message={errors.live?.timeTo.message.toString()} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
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
