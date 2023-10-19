import { ReapitConnectSession } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  Col,
  elMb11,
  elMb5,
  FlexContainer,
  Grid,
  Icon,
  IconNames,
  Subtitle,
  Table,
} from '@reapit/elements'
import {
  AppsBrowseConfigEnum,
  AppsBrowseConfigItemInterface,
  AppSummaryModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import {
  SendFunction,
  UpdateReturnTypeEnum,
  useReapitGet,
  useReapitUpdate,
  GetActionNames,
  getActions,
} from '@reapit/use-reapit-data'
import React, { FC, useState } from 'react'
import { colorSquare, iconButton, ImageContainer, ElTagContainer, ElTag } from './app-browse.styles'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { SubsHelperText } from './subs-helper-text'
import { openNewPage } from '../../utils/navigation'
import dayjs from 'dayjs'

interface AppBrowseManageTableProps {
  type: AppsBrowseConfigEnum
  items: AppsBrowseConfigItemInterface[]
  setEditType: () => void
  setSelectedItem: (item?: AppsBrowseConfigItemInterface) => void
  deleteItem: (type: AppsBrowseConfigEnum, id: string) => void
  connectSession: ReapitConnectSession
  setItems: (items: AppsBrowseConfigItemInterface[]) => void
}

interface ManageTableExpandableContentProps extends AppBrowseManageTableProps {
  configItem: AppsBrowseConfigItemInterface
}

const findAndReplace = <T extends any>(
  array: Array<T>,
  condition: (item) => boolean,
  replace: (item) => T,
): Array<T> => {
  return array.map((value) => {
    if (condition(value)) {
      return replace(value)
    }
    return value
  })
}

export const updatedItemIndex = async <T extends { index?: number; id?: string }>({
  currentItem,
  allItems,
  setItems,
  updateIndexing,
  direction = 'up',
  defaultIndex,
}: {
  currentItem: T
  allItems: T[]
  setItems: (val: T[]) => void
  updateIndexing: SendFunction<T[], T[] | boolean>
  direction: 'up' | 'down'
  defaultIndex: number
}): Promise<void> => {
  const nextArrayIndex = allItems.indexOf(currentItem) + (direction === 'up' ? -1 : +1)

  if (nextArrayIndex < 0 || nextArrayIndex > allItems.length) {
    return
  }

  const nextItem = allItems[nextArrayIndex]

  if (!nextItem) {
    return
  }

  const currentIndex = currentItem.index || defaultIndex
  const nextIndex =
    nextItem.index && nextItem.index === currentIndex
      ? nextItem.index + (direction === 'up' ? -1 : +1)
      : nextItem.index || defaultIndex + (direction === 'up' ? -1 : +1)

  const results = await updateIndexing(
    findAndReplace(
      allItems,
      (i) => [currentItem.id, nextItem.id].includes(i.id),
      (i) => {
        return i.id === currentItem.id
          ? {
              ...i,
              index: nextIndex,
            }
          : {
              ...i,
              index: currentIndex,
            }
      },
    ),
    {
      uriParams: { id: '' },
    },
  )

  if (results && typeof results !== 'boolean') {
    setItems(results)
  }
}

export const ManageTableExpandableContent: FC<ManageTableExpandableContentProps> = (props) => {
  const { configItem, setSelectedItem, connectSession, deleteItem } = props
  const [selectedApps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', pageSize: 100, id: configItem?.filters?.id },
    fetchWhenTrue: [Array.isArray(configItem?.filters?.id), configItem?.filters?.id?.length],
  })

  const [deleteLoading, , send] = useReapitUpdate<AppsBrowseConfigItemInterface, AppsBrowseConfigItemInterface>({
    action: getActions[GetActionNames.postAppMarketAdmin],
    reapitConnectBrowserSession,
    method: 'DELETE',
    headers: {
      Authorization: connectSession?.idToken,
    },
  })

  return (
    <>
      <Subtitle hasBoldText>Filters</Subtitle>
      <Grid className={elMb5}>
        <Col>
          <Subtitle hasNoMargin>Apps</Subtitle>
          <ElTagContainer>
            {configItem.filters?.id ? (
              configItem.filters?.id?.map((app) => {
                const appName = selectedApps?.data?.find(({ id }) => app === id)?.name
                return <ElTag key={app}>{appName}</ElTag>
              })
            ) : (
              <ElTag>None</ElTag>
            )}
          </ElTagContainer>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Categories</Subtitle>
          <ElTagContainer>
            {configItem.filters?.category ? (
              configItem.filters?.category?.map((cat) => <ElTag key={cat}>{cat}</ElTag>)
            ) : (
              <ElTag>None</ElTag>
            )}
          </ElTagContainer>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Is Free</Subtitle>
          <BodyText hasGreyText>
            {configItem.filters?.isFree === undefined ? 'Not Applied' : configItem.filters?.isFree ? 'Yes' : 'No'}
          </BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Is Featured</Subtitle>
          <BodyText hasGreyText>
            {configItem.filters?.isFeatured === undefined
              ? 'Not Applied'
              : configItem.filters?.isFeatured
              ? 'Yes'
              : 'No'}
          </BodyText>
        </Col>
      </Grid>
      <Subtitle hasBoldText>Advertising Content</Subtitle>
      <Grid className={elMb5}>
        <Col>
          <Subtitle hasNoMargin>Title</Subtitle>
          <BodyText hasGreyText>{configItem.content?.title}</BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Strapline</Subtitle>
          <BodyText hasGreyText>{configItem.content?.strapline}</BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Brand Colour</Subtitle>
          {configItem.content?.brandColour ? (
            <BodyText hasGreyText>
              <span className={colorSquare} style={{ background: configItem.content?.brandColour }}></span>
            </BodyText>
          ) : (
            <BodyText hasGreyText>None Set</BodyText>
          )}
          {configItem.content?.brandColour}
        </Col>
        <Col>
          <Subtitle hasNoMargin>Icon</Subtitle>
          {configItem.content?.iconName && <Icon icon={configItem.content.iconName as IconNames} fontSize="5em" />}
          {!configItem.content?.iconName && <BodyText hasGreyText>None Set</BodyText>}
        </Col>
        <Col>
          <Subtitle hasNoMargin>Image</Subtitle>
          {configItem.content?.imageUrl ? (
            <ImageContainer>
              <img src={configItem.content.imageUrl} />
            </ImageContainer>
          ) : (
            <BodyText hasGreyText>None</BodyText>
          )}
        </Col>
      </Grid>
      <Subtitle hasBoldText>Live in AppMarket</Subtitle>
      <Grid className={elMb5}>
        <Col>
          <Subtitle hasNoMargin>Is Live</Subtitle>
          <BodyText hasGreyText>{configItem.live?.isLive ? 'Yes' : 'No'}</BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Time From</Subtitle>
          <BodyText hasGreyText>
            {configItem.live?.timeFrom ? dayjs(configItem.live.timeFrom).format('DD-MM-YYYY HH:mm') : 'Not set'}
          </BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Time To</Subtitle>
          <BodyText hasGreyText>
            {configItem.live?.timeTo ? dayjs(configItem.live.timeTo).format('DD-MM-YYYY HH:mm') : 'Not set'}
          </BodyText>
        </Col>
      </Grid>
      <ButtonGroup>
        <Button onClick={openNewPage(`${process.env.marketplaceUrl}/apps?previewId=${configItem.id}`)} intent="default">
          Preview
        </Button>
        <Button
          onClick={() => {
            setSelectedItem(configItem)
          }}
          intent="primary"
        >
          Edit
        </Button>
        <Button
          intent="danger"
          onClick={async () => {
            await send(configItem, {
              uriParams: {
                id: configItem.id,
              },
            })
            deleteItem(configItem.configType, configItem.id as string)
          }}
          disabled={deleteLoading}
          loading={deleteLoading}
        >
          Delete
        </Button>
      </ButtonGroup>
    </>
  )
}

export const AppBrowseManageTable: FC<AppBrowseManageTableProps> = (props) => {
  const { type, items, setEditType } = props
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const [indexLoading, , updateIndexing] = useReapitUpdate<
    AppsBrowseConfigItemInterface[],
    AppsBrowseConfigItemInterface[]
  >({
    action: getActions[GetActionNames.postAppMarketAdmin],
    reapitConnectBrowserSession,
    method: 'PUT',
    headers: {
      Authorization: props.connectSession?.idToken,
    },
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })

  const sortedItems = [
    ...items.sort((a, b) => {
      return typeof a.index !== 'undefined' && typeof b.index !== 'undefined' && a.index < b.index ? -1 : 1
    }),
  ]

  return (
    <div className={elMb11}>
      <Subtitle hasCapitalisedText>{type.replace(/([^A-Z])([A-Z])/g, '$1 $2').toLowerCase()}</Subtitle>
      <SubsHelperText type={type} />
      <Table
        indexExpandedRow={expandedIndex}
        setIndexExpandedRow={setExpandedIndex}
        rows={sortedItems.map((item, index, all) => ({
          cells: [
            {
              label: 'Title',
              value: item.content?.title,
            },
            {
              label: 'Order',
              value: item.index,
              children: (
                <FlexContainer isFlexJustifyCenter>
                  <Button
                    className={iconButton}
                    disabled={indexLoading}
                    onClick={async () => {
                      updatedItemIndex<AppsBrowseConfigItemInterface>({
                        currentItem: item,
                        allItems: all,
                        direction: 'up',
                        defaultIndex: index,
                        updateIndexing,
                        setItems: props.setItems,
                      })
                    }}
                  >
                    <Icon icon="arrowUpSystem" />
                  </Button>
                  <Button
                    className={iconButton}
                    disabled={indexLoading}
                    onClick={async () => {
                      updatedItemIndex<AppsBrowseConfigItemInterface>({
                        currentItem: item,
                        allItems: all,
                        direction: 'down',
                        defaultIndex: index,
                        updateIndexing,
                        setItems: props.setItems,
                      })
                    }}
                  >
                    <Icon icon="arrowDownSystem" />
                  </Button>
                </FlexContainer>
              ),
            },
            {
              label: 'Brand Colour',
              value: item.content?.brandColour,
              children: (
                <>
                  {item.content?.brandColour && (
                    <span className={colorSquare} style={{ background: item.content?.brandColour }}></span>
                  )}
                  {item.content?.brandColour}
                </>
              ),
            },
            {
              label: 'Number Apps Selected',
              value: item.filters?.id?.length || 0,
            },
            {
              label: 'Categories',
              value: item.filters?.category?.join(', '),
            },
            {
              label: 'Live',
              value: item.live.isLive,
              children: (
                <>
                  {item.live.isLive
                    ? 'Live'
                    : item.live.timeFrom && new Date(item.live.timeFrom).getTime() > new Date().getTime()
                    ? `Going Live ${dayjs(item.live.timeFrom).format('DD-MM-YYYY HH:mm')}`
                    : item.live.timeTo && new Date(item.live.timeTo).getTime() > new Date().getTime()
                    ? `Completing ${dayjs(item.live.timeTo).format('DD-MM-YYYY HH:mm')}`
                    : 'Not Live'}
                </>
              ),
            },
          ],
          expandableContent: {
            content: <ManageTableExpandableContent {...props} configItem={item} />,
          },
        }))}
        numberColumns={7}
      />
      <br />
      <Button intent="primary" onClick={setEditType}>
        Add
      </Button>
    </div>
  )
}
