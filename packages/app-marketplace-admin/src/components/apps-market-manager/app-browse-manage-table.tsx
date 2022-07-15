import { ReapitConnectSession } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  FormLayout,
  Icon,
  IconNames,
  InputWrapFull,
  Label,
  Subtitle,
  Table,
} from '@reapit/elements'
import { AppsBrowseConfigEnum, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitUpdate } from '@reapit/utils-react'
import React, { FC, useState } from 'react'
import { colorSquare } from './app-browse.styles'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { shleemy } from 'shleemy'
import { cx } from '@linaria/core'
import { ElTagContainer, ElTag } from './app-browse.styles'

export const AppBrowseManageTable: FC<{
  type: AppsBrowseConfigEnum
  items: AppsBrowseConfigItemInterface[]
  setEditType: () => void
  setSelectedItem: (item?: AppsBrowseConfigItemInterface) => void
  deleteItem: (type: AppsBrowseConfigEnum, id: string) => void
  connectSession: ReapitConnectSession
}> = ({ type, items, setEditType, setSelectedItem, connectSession, deleteItem, ...rest }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const [deleteLoading, , send] = useReapitUpdate<AppsBrowseConfigItemInterface, AppsBrowseConfigItemInterface>({
    action: getActions(window.reapit.config.appEnv)[GetActionNames.postAppMarketAdmin],
    reapitConnectBrowserSession,
    method: 'DELETE',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  return (
    <div {...rest} className={cx(elMb11)}>
      <Subtitle>{type}</Subtitle>
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
              label: 'Apps',
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
            content: (
              <>
                <Subtitle>Filters</Subtitle>
                <FormLayout hasMargin>
                  <InputWrapFull>
                    <Label>Categories</Label>
                    <ElTagContainer>
                      {item.filters?.category ? (
                        item.filters?.category?.map((cat) => <ElTag key={cat}>{cat}</ElTag>)
                      ) : (
                        <ElTag>None</ElTag>
                      )}
                    </ElTagContainer>
                  </InputWrapFull>
                  <InputWrapFull>
                    <Label>Is Free</Label>
                    <BodyText hasGreyText>{item.filters?.isFree ? 'Yes' : 'No'}</BodyText>
                  </InputWrapFull>
                  <InputWrapFull>
                    <Label>Is Featured</Label>
                    <BodyText hasGreyText>{item.filters?.isFeatured ? 'Yes' : 'No'}</BodyText>
                  </InputWrapFull>
                </FormLayout>
                <Subtitle>Advertising Content</Subtitle>
                <FormLayout hasMargin>
                  <InputWrapFull>
                    <Label>Title</Label>
                    <BodyText hasGreyText>{item.content?.title}</BodyText>
                  </InputWrapFull>
                  <InputWrapFull>
                    <Label>Strapline</Label>
                    <BodyText hasGreyText>{item.content?.strapline}</BodyText>
                  </InputWrapFull>
                  <InputWrapFull>
                    <Label>Brand Colour</Label>
                    <BodyText hasGreyText>
                      {item.content?.brandColour && (
                        <span className={colorSquare} style={{ background: item.content?.brandColour }}></span>
                      )}
                      {item.content?.brandColour}
                    </BodyText>
                  </InputWrapFull>
                  <InputWrapFull>
                    <Label>Icon</Label>
                    {item.content?.iconName && <Icon icon={item.content.iconName as IconNames} />}
                    {item.content?.iconName && <BodyText hasGreyText>({item.content.iconName})</BodyText>}
                  </InputWrapFull>
                  <InputWrapFull>
                    <Label>Image</Label>
                    {item.content?.imageUrl ? (
                      <img src={item.content.imageUrl} />
                    ) : (
                      <BodyText hasGreyText>None</BodyText>
                    )}
                  </InputWrapFull>
                </FormLayout>
                <Subtitle>Live</Subtitle>
                <FormLayout>
                  <InputWrapFull>
                    <Label>Is Live</Label>
                    <BodyText hasGreyText>{item.live?.isLive ? 'Yes' : 'No'}</BodyText>
                  </InputWrapFull>
                  <InputWrapFull>
                    <Label>Time From</Label>
                    <BodyText hasGreyText>
                      {item.live?.timeFrom ? shleemy(item.live.timeFrom).forHumans : 'Not set'}
                    </BodyText>
                  </InputWrapFull>
                  <InputWrapFull>
                    <Label>Time To</Label>
                    <BodyText hasGreyText>
                      {item.live?.timeTo ? shleemy(item.live.timeTo).forHumans : 'Not set'}
                    </BodyText>
                  </InputWrapFull>
                </FormLayout>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setSelectedItem(item)
                    }}
                    intent="secondary"
                  >
                    Edit
                  </Button>
                  <Button
                    intent="danger"
                    onClick={async () => {
                      await send(item, {
                        uriParams: {
                          id: item.id,
                        },
                      })
                      deleteItem(item.configType, item.id as string)
                    }}
                    disabled={deleteLoading}
                    loading={deleteLoading}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </>
            ),
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
