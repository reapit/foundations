import { ReapitConnectSession } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  Col,
  elMb11,
  elMb5,
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
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import React, { FC, useState } from 'react'
import { colorSquare, ImageContainer } from './app-browse.styles'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { shleemy } from 'shleemy'
import { cx } from '@linaria/core'
import { ElTagContainer, ElTag } from './app-browse.styles'

interface AppBrowseManageTableProps {
  type: AppsBrowseConfigEnum
  items: AppsBrowseConfigItemInterface[]
  setEditType: () => void
  setSelectedItem: (item?: AppsBrowseConfigItemInterface) => void
  deleteItem: (type: AppsBrowseConfigEnum, id: string) => void
  connectSession: ReapitConnectSession
}

interface ManageTableExpandableContentProps extends AppBrowseManageTableProps {
  configItem: AppsBrowseConfigItemInterface
}

export const ManageTableExpandableContent: FC<ManageTableExpandableContentProps> = (props) => {
  const { configItem, setSelectedItem, connectSession, deleteItem } = props
  const [selectedApps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', pageSize: 100, id: configItem?.filters?.id },
    fetchWhenTrue: [Array.isArray(configItem?.filters?.id), configItem?.filters?.id?.length],
  })

  const [deleteLoading, , send] = useReapitUpdate<AppsBrowseConfigItemInterface, AppsBrowseConfigItemInterface>({
    action: getActions(window.reapit.config.appEnv)[GetActionNames.postAppMarketAdmin],
    reapitConnectBrowserSession,
    method: 'DELETE',
    headers: {
      Authorization: connectSession?.idToken as string,
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
          <BodyText hasGreyText>
            {configItem.content?.brandColour ? (
              <span className={colorSquare} style={{ background: configItem.content?.brandColour }}></span>
            ) : (
              <BodyText hasGreyText>None Set</BodyText>
            )}
            {configItem.content?.brandColour}
          </BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Icon</Subtitle>
          {configItem.content?.iconName && <Icon icon={configItem.content.iconName as IconNames} fontSize="5em" />}
          {configItem.content?.iconName && <BodyText hasGreyText>({configItem.content.iconName})</BodyText>}
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
            {configItem.live?.timeFrom ? shleemy(configItem.live.timeFrom).forHumans : 'Not set'}
          </BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Time To</Subtitle>
          <BodyText hasGreyText>
            {configItem.live?.timeTo ? shleemy(configItem.live.timeTo).forHumans : 'Not set'}
          </BodyText>
        </Col>
      </Grid>
      <ButtonGroup>
        <Button
          onClick={() => {
            setSelectedItem(configItem)
          }}
          intent="secondary"
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
  const { type, items, setEditType, ...rest } = props
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div {...rest} className={cx(elMb11)}>
      <Subtitle hasCapitalisedText>{type.replace(/([^A-Z])([A-Z])/g, '$1 $2').toLowerCase()}</Subtitle>
      <Table
        indexExpandedRow={expandedIndex}
        setIndexExpandedRow={setExpandedIndex}
        rows={items.map((item) => ({
          cells: [
            {
              label: 'Title',
              value: item.content?.title,
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
                    ? `going live ${shleemy(item.live.timeFrom).forHumans}`
                    : item.live.timeTo && new Date(item.live.timeTo).getTime() > new Date().getTime()
                    ? `Completing ${shleemy(item.live.timeTo).forHumans}`
                    : 'Not Live'}
                </>
              ),
            },
          ],
          expandableContent: {
            content: <ManageTableExpandableContent {...props} configItem={item} />,
          },
        }))}
        numberColumns={6}
      />
      <br />
      <Button intent="primary" onClick={setEditType}>
        Add
      </Button>
    </div>
  )
}
