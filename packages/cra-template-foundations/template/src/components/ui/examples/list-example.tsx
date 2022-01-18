import { Card, Col, elMb7, Grid, PersistantNotification, Tabs, Title } from '@reapit/elements'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'

export enum TabName {
  optionOne = 'optionOne',
  optionTwo = 'optionTwo',
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const handleChangeTab =
  (setTab: Dispatch<SetStateAction<TabName>>) => (event: ChangeEvent<HTMLInputElement>) => {
    setTab(event.target.value as TabName)
  }

export const ListExample: FC = () => {
  const [tab, setTab] = useState<TabName>(TabName.optionOne)
  return (
    <>
      <Title>List Options</Title>
      <PersistantNotification className={elMb7} isExpanded intent="secondary" isInline isFullWidth>
        Toggling the tabs will give you two examples as to how to lay out a list of options, complete with menus in a
        responsive grid.
      </PersistantNotification>
      <Tabs
        name="webhook-tabs"
        isFullWidth
        onChange={handleChangeTab(setTab)}
        options={[
          {
            id: 'tab-one',
            value: TabName.optionOne,
            text: 'List Option One',
            isChecked: tab === TabName.optionOne,
          },
          {
            id: 'tab-two',
            value: TabName.optionTwo,
            text: 'List Option Two',
            isChecked: tab === TabName.optionTwo,
          },
        ]}
      />
      <Grid>
        {items.map((item) => (
          <Col key={item}>
            {tab === TabName.optionOne ? (
              <Card
                hasMainCard
                mainContextMenuItems={[
                  {
                    icon: 'trashSystem',
                    onClick: () => console.log('Clicking'),
                    intent: 'danger',
                  },
                  {
                    icon: 'shareSystem',
                    onClick: () => console.log('Clicking'),
                  },
                ]}
                mainCardHeading="Main Heading"
                mainCardSubHeading="Main Subheading"
                mainCardSubHeadingAdditional="Main Subheading Additional"
                mainCardBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                mainCardImgUrl="https://via.placeholder.com/52x52.svg"
              />
            ) : (
              <Card
                hasListCard
                listCardHeading="List Card Heading"
                listCardSubHeading="List Card Sub Heading"
                listCardItems={[
                  {
                    listCardItemHeading: 'Applicant',
                    listCardItemSubHeading: 'Bob Smith',
                    listCardItemIcon: 'applicantInfographic',
                    onClick: () => console.log('Clicking'),
                  },
                  {
                    listCardItemHeading: 'Property',
                    listCardItemSubHeading: 'Some Address',
                    listCardItemIcon: 'houseInfographic',
                    onClick: () => console.log('Clicking'),
                  },
                ]}
                listContextMenuItems={[
                  {
                    icon: 'trashSystem',
                    onClick: () => console.log('Clicking'),
                    intent: 'danger',
                  },
                  {
                    icon: 'shareSystem',
                    onClick: () => console.log('Clicking'),
                  },
                ]}
              />
            )}
          </Col>
        ))}
      </Grid>
    </>
  )
}

export default ListExample
