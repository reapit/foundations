import {
  BodyText,
  Button,
  ButtonGroup,
  ColResponsive,
  elMb11,
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
import videoImage from '../../../assets/images/desktop/video-placeholder.svg'

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
          <FlexContainer isFlexColumn isFlexJustifyAround>
            <div className={elMb7}>
              <div className={elMb11}>
                <Subtitle hasBoldText hasNoMargin>
                  Create APP
                </Subtitle>
              </div>
              <FlexContainer isFlexColumn className={elMb11}>
                <FlexContainer>
                  <Icon className={elMr5} icon="welcomeInfographic" iconSize="large" />
                  <BodyText hasGreyText>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quia vero eos voluptatem voluptate,
                    vitae id autem officia soluta fugit, impedit, ad facilis commodi distinctio esse sint consequatur!
                    Architecto, aliquid?
                  </BodyText>
                </FlexContainer>
                <div className={elMb11}>
                  <BodyText hasGreyText hasNoMargin>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quia vero eos voluptatem voluptate,
                    vitae id autem officia soluta fugit, impedit, ad facilis commodi distinctio esse sint consequatur!
                    Architecto, aliquid?
                  </BodyText>
                </div>
                <ButtonGroup alignment="left">
                  <Button intent="critical" size={2} onClick={navigate(history, Routes.APPS_NEW)} chevronRight>
                    Create App
                  </Button>
                </ButtonGroup>
              </FlexContainer>
            </div>
            <div>
              <div className={elMb11}>
                <Subtitle hasBoldText hasNoMargin>
                  View Docs
                </Subtitle>
              </div>
              <FlexContainer isFlexColumn className={elMb11}>
                <FlexContainer>
                  <Icon className={elMr5} icon="myAppsInfographic" iconSize="large" />
                  <BodyText hasGreyText>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit perspiciatis minus commodi vitae!
                    Maxime iusto, magni repellendus saepe blanditiis culpa sit aut explicabo ad vel delectus aperiam
                    ipsam velit quae.
                  </BodyText>
                </FlexContainer>
                <div className={elMb11}>
                  <BodyText hasGreyText hasNoMargin>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quia vero eos voluptatem voluptate,
                    vitae id autem officia soluta fugit, impedit, ad facilis commodi distinctio esse sint consequatur!
                    Architecto, aliquid?
                  </BodyText>
                </div>
                <ButtonGroup alignment="left">
                  <Button intent="primary" size={2}>
                    View Docs
                  </Button>
                </ButtonGroup>
              </FlexContainer>
            </div>
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
      >
        <Title>About Foundations</Title>
        <BodyText hasGreyText>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quia vero eos voluptatem voluptate, vitae id
          autem officia soluta fugit, impedit, ad facilis commodi distinctio esse sint consequatur! Architecto, aliquid?
        </BodyText>
        <BodyText>
          <img src={videoImage} style={{ width: '100%' }} alt="Video placeholder" />
        </BodyText>
        <BodyText hasGreyText>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quia vero eos voluptatem voluptate, vitae id
          autem officia soluta fugit, impedit, ad facilis commodi distinctio esse sint consequatur! Architecto, aliquid?
        </BodyText>
        <BodyText hasGreyText>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quia vero eos voluptatem voluptate, vitae id
          autem officia soluta fugit, impedit, ad facilis commodi distinctio esse sint consequatur! Architecto, aliquid?
        </BodyText>
      </ColResponsive>
    </GridResponsive>
  )
}
