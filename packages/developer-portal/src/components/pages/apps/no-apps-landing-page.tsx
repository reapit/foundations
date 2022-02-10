import {
  BodyText,
  Button,
  ButtonGroup,
  ColResponsive,
  elMb7,
  elMr5,
  FlexContainer,
  GridResponsive,
  Icon,
  Subtitle,
  Title,
} from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { useHistory } from 'react-router'
import Routes from '../../../constants/routes'
import { navigate } from '../../../utils/navigation'
import { StepContainer } from '../apps-new/__styles__'

export const handeSetShowWizard = (setShowWizard: Dispatch<SetStateAction<boolean>>, showWizard: boolean) => () => {
  setShowWizard(!showWizard)
}

export const NoAppsLandingPage: FC = () => {
  const history = useHistory()
  return (
    <GridResponsive>
      <ColResponsive
        spanMobile={4}
        spanTablet={4}
        spanDesktop={4}
        spanWideScreen={4}
        spanSuperWideScreen={5}
        span4KScreen={7}
      >
        <Title>Apps</Title>
        <StepContainer>
          <Subtitle hasBoldText>Create APP</Subtitle>
          <FlexContainer className={elMb7}>
            <Icon className={elMr5} icon="customerInfographic" iconSize="large" />
            <BodyText hasGreyText>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quia vero eos voluptatem voluptate, vitae
              id autem officia soluta fugit, impedit, ad facilis commodi distinctio esse sint consequatur! Architecto,
              aliquid?
            </BodyText>
            <ButtonGroup alignment="center">
              <Button intent="critical" size={2} onClick={navigate(history, Routes.APPS_NEW)} chevronRight>
                Create App
              </Button>
            </ButtonGroup>
          </FlexContainer>
          <Subtitle hasBoldText>View Docs</Subtitle>
          <FlexContainer className={elMb7}>
            <Icon className={elMr5} icon="myAppsInfographic" iconSize="large" />
            <BodyText hasGreyText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit perspiciatis minus commodi vitae! Maxime
              iusto, magni repellendus saepe blanditiis culpa sit aut explicabo ad vel delectus aperiam ipsam velit
              quae.
            </BodyText>
            <ButtonGroup alignment="center">
              <Button intent="secondary" size={2} chevronLeft>
                View Docs
              </Button>
            </ButtonGroup>
          </FlexContainer>
        </StepContainer>
      </ColResponsive>
      <ColResponsive
        spanMobile={4}
        spanTablet={4}
        spanDesktop={4}
        spanWideScreen={8}
        spanSuperWideScreen={11}
        span4KScreen={13}
      ></ColResponsive>
    </GridResponsive>
  )
}
