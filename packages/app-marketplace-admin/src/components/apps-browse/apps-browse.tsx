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
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitGet } from '@reapit/utils-react'
import { AppsBrowseConfigItemInterface, AppsBrowseConfigType } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import { cx } from '@linaria/core'
import { appModal } from './modal.styles'
import { BlockPicker } from 'react-color'

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

  const sectionedItems = appMarketPlaceCmsConfig?.items.reduce<{ [key in AppsBrowseConfigType]: AppsBrowseConfigItemInterface[] }>(
    (filtered, item) => {
      filtered[item.configType].push(item)

      return filtered
    },
    starter,
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

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
      <Modal className={cx(appModal)} isOpen={modalIsOpen} onModalClose={() => closeModal()}>
        <Title>New Item</Title>
        <form>
          <Subtitle>Filters</Subtitle>
          <FormLayout>
            <InputWrapFull>
              <InputGroup>
                <Label>App</Label>
                <MultiSelect {...register('id')} />
                {errors.id?.message && <InputError message={errors.id.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Categories</Label>
                <MultiSelect {...register('categories')} />
                {errors.categories?.message && <InputError message={errors.categories.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Is Free</Label>
                <Input {...register('isFree')} type="checkbox" />
                {errors.isFree?.message && <InputError message={errors.isFree.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Is Featured</Label>
                <Input {...register('isFeatured')} type="checkbox" />
                {errors.isFeatured?.message && <InputError message={errors.isFeatured.message} />}
              </InputGroup>
            </InputWrapFull>
          </FormLayout>
          <Subtitle>Advertising Content</Subtitle>
          <FormLayout>
            <InputWrapFull>
              <InputGroup>
                <Label>Brand Colour</Label>
                <BlockPicker {...register('brandColor')} />
                {errors.brandColor?.message && <InputError message={errors.brandColor.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Title</Label>
                <Input {...register('title')} />
                {errors.title?.message && <InputError message={errors.title.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Strapline</Label>
                <Input {...register('strapline')} />
                {errors.strapline?.message && <InputError message={errors.strapline.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Icon</Label>
                <Select {...register('icon')}>
                  <option></option>
                  {Object.keys(iconSet).map((iconName) => <option key={iconName} value={iconName}>{iconName}</option>)}
                </Select>
                {errors.icon?.message && <InputError message={errors.icon.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Image</Label>
                <Input {...register('image')} type="file" />
                {errors.image?.message && <InputError message={errors.image.message} />}
              </InputGroup>
            </InputWrapFull>
          </FormLayout>
          <Subtitle>Live</Subtitle>
          <FormLayout>
            <InputWrapFull>
              <InputGroup>
                <Label>Live From</Label>
                <Input {...register('liveFrom')} type="datetime-local" />
                {errors.liveFrom?.message && <InputError message={errors.liveFrom.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Live To</Label>
                <Input {...register('liveTo')} type="datetime-local" />
                {errors.liveTo?.message && <InputError message={errors.liveTo.message} />}
              </InputGroup>
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup>
                <Label>Is Live</Label>
                <Input {...register('live')} type="checkbox" />
                {errors.live?.message && <InputError message={errors.live.message} />}
              </InputGroup>
            </InputWrapFull>
          </FormLayout>
          <ButtonGroup>
            <Button intent="primary">Save</Button>
          </ButtonGroup>
        </form>
      </Modal>
    </PageContainer>
  )
}
