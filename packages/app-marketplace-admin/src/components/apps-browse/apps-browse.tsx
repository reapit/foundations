import React, { FC, useEffect, useState } from 'react'
import {
  Title,
  PageContainer,
  Table,
  TableHeader,
  TableHeadersRow,
  TableRow,
  TableCell,
  TableRowContainer,
  useModal,
  Modal,
  Button,
  Loader,
  FormLayout,
  InputGroup,
  Label,
  Input,
  InputError,
  Subtitle,
  Select,
  ButtonGroup,
  MultiSelectInput,
  InputWrapFull,
  iconSet,
} from '@reapit/elements'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { AppsBrowseConfigItemInterface, AppsBrowseConfigEnum } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import { cx } from '@linaria/core'
import { appModal } from './modal.styles'
import { SketchPicker } from 'react-color'
import { reactPickerStyles } from './app-browse.styles'

const upsertAppMarketing =
  (
    configType: AppsBrowseConfigEnum,
    setLoading: (loading: boolean) => void,
    send: (app: AppsBrowseConfigItemInterface) => void,
  ) =>
  async (app: any) => {
    console.log('app', app)

    setLoading(true)

    const returned = await send({
      ...app,
      configType,
    })

    console.log('result', returned, returned)

    setLoading(false)
  }

const AppMarketingModel: FC<{
  app?: AppsBrowseConfigItemInterface
  modalIsOpen: boolean
  closeModal: () => void
  configType: AppsBrowseConfigEnum
  connectSession: ReapitConnectSession
}> = ({ app, modalIsOpen, connectSession, closeModal, configType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: app,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [color, setColor] = useState<string>(getValues('content.brandColour') || '#FF0000')

  useEffect(() => {
    setValue('content.brandColour', color)
  }, [color])

  const [, , send] = useReapitUpdate<AppsBrowseConfigItemInterface, AppsBrowseConfigItemInterface>({
    action: getActions(window.reapit.config.appEnv)[
      app?.id ? GetActionNames.postAppMarketAdmin : GetActionNames.getAppMarketAdmin
    ],
    method: app?.id ? 'PUT' : 'POST',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    reapitConnectBrowserSession,
    uriParams: {
      id: app?.id,
    },
  })

  return (
    <Modal
      className={cx(appModal)}
      isOpen={modalIsOpen}
      onModalClose={() => {
        reset()
        closeModal()
      }}
    >
      <Title>New Item</Title>
      <form onSubmit={handleSubmit(upsertAppMarketing(configType, setLoading, send))}>
        <Subtitle>Filters</Subtitle>
        <FormLayout>
          <InputWrapFull>
            <InputGroup>
              <Label>App</Label>
              <MultiSelectInput {...register('filters.id')} id="filters.id" options={[]} />
              {errors.id?.message && <InputError message={errors.id.message.toString()} />}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Categories</Label>
              <MultiSelectInput {...register('filters.category')} id="filters.category" options={[]} />
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
                className={cx(reactPickerStyles)}
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
              <Select {...register('content.iconName')}>
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
              <Input {...register('content.imageUrl')} type="file" />
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

const AppBrowseTable: FC<{
  type: AppsBrowseConfigEnum
  items: AppsBrowseConfigItemInterface[]
  setEditType: () => void
  setSelectedItem: (item?: AppsBrowseConfigItemInterface) => void
}> = ({ type, items, setEditType, setSelectedItem }) => {
  return (
    <>
      <Title>{type}</Title>
      <Table>
        <TableHeadersRow>
          <TableHeader>BrandColor</TableHeader>
          <TableHeader>Live</TableHeader>
          <TableHeader></TableHeader>
        </TableHeadersRow>
        {items.map((item) => (
          <TableRowContainer key={JSON.stringify(item)}>
            <TableRow>
              <TableCell>none</TableCell>
              <TableCell>{item.live.isLive ? 'Live' : 'not live'}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setSelectedItem(item)
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableRowContainer>
        ))}
      </Table>
      <br />
      <Button intent="primary" onClick={setEditType}>
        Add
      </Button>
    </>
  )
}

export const AppsBrowse: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [configType, setConfigType] = useState<AppsBrowseConfigEnum | undefined>()

  const [appMarketPlaceCmsConfig, appMarketPlaceCmsLoading] = useReapitGet<{
    items: AppsBrowseConfigItemInterface[]
  }>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppMarketAdmin],
    fetchWhenTrue: [connectSession],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })
  const { modalIsOpen, closeModal, openModal } = useModal()
  const [selectedItem, setSelectedItem] = useState<AppsBrowseConfigItemInterface | undefined>()

  useEffect(() => {
    typeof configType === 'undefined' && typeof selectedItem !== 'undefined' ? closeModal() : openModal()
  }, [configType, selectedItem])

  const starter: { [key in AppsBrowseConfigEnum]: [] } = Object.values(AppsBrowseConfigEnum).reduce<{
    [key in AppsBrowseConfigEnum]: []
  }>((ob, key) => {
    ob[key] = []

    return ob
  }, {} as { [key in AppsBrowseConfigEnum] })

  const sectionedItems = appMarketPlaceCmsConfig?.items?.reduce<{
    [key in AppsBrowseConfigEnum]: AppsBrowseConfigItemInterface[]
  }>((filtered, item) => {
    if (!filtered[item.configType]) return filtered

    filtered[item.configType].push(item)

    return filtered
  }, starter)

  return (
    <PageContainer>
      <Title>AppMarket Admin</Title>
      {appMarketPlaceCmsLoading && <Loader />}
      {sectionedItems &&
        (Object.values(AppsBrowseConfigEnum) as AppsBrowseConfigEnum[]).map((type: AppsBrowseConfigEnum) => (
          <AppBrowseTable
            key={`${type}-${JSON.stringify(sectionedItems[type])}`}
            type={type}
            items={sectionedItems[type]}
            setEditType={() => setConfigType(type)}
            setSelectedItem={setSelectedItem}
          />
        ))}
      <AppMarketingModel
        configType={configType as AppsBrowseConfigEnum}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        connectSession={connectSession as ReapitConnectSession}
        app={selectedItem}
      />
    </PageContainer>
  )
}
