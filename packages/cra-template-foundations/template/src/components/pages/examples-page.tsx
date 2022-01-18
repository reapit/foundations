import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Route } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import FormExample from '../ui/examples/form-example'
import TableExample from '../ui/examples/table-example'
import ListExample from '../ui/examples/list-example'
import {
  BodyText,
  Button,
  elHFull,
  elMb5,
  elMb9,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Title,
} from '@reapit/elements'
import { navigate, openNewPage } from '../../utils/navigation'

const ExamplesPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>UI Examples</Title>
        <SecondaryNav className={elMb9}>
          <SecondaryNavItem onClick={navigate(history, Routes.TABLE)} active={pathname === Routes.TABLE}>
            Table
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.LIST)} active={pathname.includes(Routes.LIST)}>
            List
          </SecondaryNavItem>
          <SecondaryNavItem onClick={navigate(history, Routes.FORM)} active={pathname.includes(Routes.FORM)}>
            Form
          </SecondaryNavItem>
        </SecondaryNav>
        <Icon className={elMb5} icon="designInfographic" iconSize="large" />
        <BodyText hasGreyText>
          The examples on this page are taken from the Elements doucmentation and demonstrate how they fit into a
          standard layout. You just need to link up with your data source to get started.
        </BodyText>
        <Button className={elMb5} intent="critical" onClick={openNewPage('https://elements.reapit.cloud')}>
          Visit Elements
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Route path={Routes.TABLE} component={TableExample} exact />
        <Route path={Routes.LIST} component={ListExample} exact />
        <Route path={Routes.FORM} component={FormExample} exact />
      </PageContainer>
    </FlexContainer>
  )
}

export default ExamplesPage
