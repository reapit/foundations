import React, { FC } from 'react'
import { FlexContainer, Subtitle, Icon, useModal, BodyText, elMb7, elPx6, elMr5, SmallText } from '@reapit/elements'
import { onLoginButtonClick } from '.'
import { LoginContainer, LoginContentWrapper, LoginRoleTile } from './__styles__'
import { cx } from '@linaria/core'

export const SelectRolePage: FC = () => {
  const { Modal, openModal } = useModal()

  return (
    <LoginContainer>
      <LoginContentWrapper>
        <Icon className={elMb7} height="40px" width="200px" icon="reapitLogoInfographic" />
        <Subtitle hasNoMargin hasCenteredText>
          Select an option to register
        </Subtitle>
        <BodyText hasCenteredText>that best describes you</BodyText>
        <LoginRoleTile>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScn5aNAt2hem0j-zRFhxd8i6ToaJOCYu5ktIN9PVyHuXuPI-w/viewform?vc=0&c=0&w=1&flr=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FlexContainer>
              <Icon className={elMr5} fontSize="4rem" icon="propTechInfographic" />
              <FlexContainer isFlexJustifyCenter isFlexColumn>
                <BodyText>PropTech</BodyText>
                <SmallText tag="div" hasGreyText hasNoMargin>
                  Independent company building an app or integration
                </SmallText>
              </FlexContainer>
            </FlexContainer>
          </a>
        </LoginRoleTile>
        <LoginRoleTile>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeeQekfhqqkHsRESphhLvBGrBekzDcPtmJtE3CC6mNEUe-s5A/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FlexContainer>
              <Icon className={elMr5} fontSize="4rem" icon="webDeveloperInfographic" />
              <FlexContainer isFlexJustifyCenter isFlexColumn>
                <BodyText>Third-party developer</BodyText>
                <SmallText tag="div" hasGreyText hasNoMargin>
                  Working on behalf of a Reapit agent to build either a private app or website feed
                </SmallText>
              </FlexContainer>
            </FlexContainer>
          </a>
        </LoginRoleTile>
        <LoginRoleTile>
          <FlexContainer onClick={onLoginButtonClick}>
            <Icon className={elMr5} fontSize="4rem" icon="foundationsCustomerInfographic" />
            <FlexContainer isFlexJustifyCenter isFlexColumn>
              <BodyText>Existing Customer</BodyText>
              <SmallText tag="div" hasGreyText hasNoMargin>
                Estate agency with an existing Reapit CRM subscription
              </SmallText>
            </FlexContainer>
          </FlexContainer>
        </LoginRoleTile>
        <LoginRoleTile>
          <FlexContainer onClick={openModal}>
            <Icon className={elMr5} fontSize="4rem" icon="newCustomerInfographic" />
            <FlexContainer isFlexJustifyCenter isFlexColumn>
              <BodyText>Prospective Customer</BodyText>
              <SmallText tag="div" hasGreyText hasNoMargin>
                Interested in Reapit Products, not currently a subscriber
              </SmallText>
            </FlexContainer>
          </FlexContainer>
        </LoginRoleTile>
      </LoginContentWrapper>
      <Modal title="Submit Email">
        <FlexContainer className={cx(elMb7, elPx6)}>
          <Icon className={elMr5} fontSize="4rem" icon="newCustomerInfographic" />
          <FlexContainer isFlexJustifyCenter isFlexColumn>
            <BodyText>New Customer</BodyText>
            <BodyText hasGreyText>
              To find out more about DeveloperPortal, Reapit CRM and the AppMarket, just enter your email address and we
              will be in touch:
            </BodyText>
          </FlexContainer>
        </FlexContainer>
        <iframe
          id="form-frame"
          src="https://go.reapit.com/l/894351/2022-02-08/8k4vw"
          title="Reg Form"
          width="100%"
          height="320px"
          frameBorder="0"
          style={{ border: 0 }}
        />
      </Modal>
    </LoginContainer>
  )
}

export default SelectRolePage
