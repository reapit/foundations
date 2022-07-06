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
  MultiSelect,
  InputWrapFull,
  iconSet,
} from '@reapit/elements'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { AppsBrowseConfigItemInterface, AppsBrowseConfigType } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import { cx } from '@linaria/core'
import { appModal } from './modal.styles'
import { BlockPicker } from 'react-color'

const upsertAppMarketing =
  (
    configType: AppsBrowseConfigType,
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
  configType: AppsBrowseConfigType
  connectSession: ReapitConnectSession
}> = ({ app, modalIsOpen, connectSession, closeModal, configType }) => {
  console.log('configType', configType)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
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
    method: 'POST',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    reapitConnectBrowserSession,
    uriParams: {
      id: app?.id,
    },
  })

  return (
    <Modal className={cx(appModal)} isOpen={modalIsOpen} onModalClose={() => closeModal()}>
      <Title>New Item</Title>
      <form onSubmit={handleSubmit(upsertAppMarketing(configType, setLoading, send))}>
        <Subtitle>Filters</Subtitle>
        <FormLayout>
          <InputWrapFull>
            <InputGroup>
              <Label>App</Label>
              <MultiSelect {...register('id')} />
              {errors.id?.message && <InputError message={errors.id.message.toString()} />}
            </InputGroup>
          </InputWrapFull>
          <InputWrapFull>
            <InputGroup>
              <Label>Categories</Label>
              <MultiSelect {...register('filters.category')} />
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
              <BlockPicker
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
              <Input {...register('live')} type="checkbox" />
              {errors.live?.message && <InputError message={errors.live.message.toString()} />}
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
  type: AppsBrowseConfigType
  items: AppsBrowseConfigItemInterface[]
  setEditType: () => void
}> = ({ type, items, setEditType }) => {
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
                <Button>Edit</Button>
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
  const [configType, setConfigType] = useState<AppsBrowseConfigType | undefined>()

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

  useEffect(() => {
    typeof configType === 'undefined' ? closeModal() : openModal()
  }, [configType])

  const starter: { [key in AppsBrowseConfigType]: [] } = Object.values(AppsBrowseConfigType).reduce<{
    [key in AppsBrowseConfigType]: []
  }>((ob, key) => {
    ob[key] = []

    return ob
  }, {} as { [key in AppsBrowseConfigType] })

  const sectionedItems = appMarketPlaceCmsConfig?.items?.reduce<{
    [key in AppsBrowseConfigType]: AppsBrowseConfigItemInterface[]
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
        (Object.keys(AppsBrowseConfigType) as AppsBrowseConfigType[]).map((type: AppsBrowseConfigType) => (
          <AppBrowseTable
            key={JSON.stringify(sectionedItems[type])}
            type={type}
            items={sectionedItems[type]}
            setEditType={() => setConfigType(type)}
          />
        ))}
      <AppMarketingModel
        configType={configType as AppsBrowseConfigType}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        connectSession={connectSession as ReapitConnectSession}
      />
    </PageContainer>
  )
}
