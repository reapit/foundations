import { KeyAnimation } from '@reapit/utils-react'
import React, { FC, useState } from 'react'
import connectImage from '@/assets/images/reapit-connect.png'
import {
  FlexContainer,
  Subtitle,
  Icon,
  useModal,
  BodyText,
  elMb7,
  elPx6,
  elMr5,
  SmallText,
  Title,
} from '@reapit/elements'
import { onLoginButtonClick } from './login'
import { LoginContainer, LoginContentWrapper, LoginImageContainer, LoginRoleTile } from './__styles__'
import { cx } from '@linaria/core'

export const SelectRolePage: FC = () => {
  const [keyStep, setKeyStep] = useState<1 | 2 | 3>(1)
  const { Modal, openModal } = useModal()

  return (
    <LoginContainer>
      <LoginImageContainer>
        <KeyAnimation step={keyStep} />
      </LoginImageContainer>
      <LoginContentWrapper
        onMouseOver={() => {
          setKeyStep(3)
        }}
        onMouseOut={() => {
          setKeyStep(1)
        }}
      >
        <img src={connectImage} alt="Reapit Connect Graphic" />
        <Title hasNoMargin hasCenteredText>
          Select an option
        </Title>
        <Subtitle hasCenteredText>that best describes you to register</Subtitle>
        <LoginRoleTile>
          <FlexContainer onClick={openModal}>
            <Icon className={elMr5} fontSize="4rem" icon="newCustomerInfographic" />
            <FlexContainer isFlexJustifyCenter isFlexColumn>
              <BodyText>Prospective Customer</BodyText>
              <SmallText hasGreyText hasNoMargin>
                Interested in Reapit Products, not currently a subscriber
              </SmallText>
            </FlexContainer>
          </FlexContainer>
        </LoginRoleTile>
        <LoginRoleTile>
          <FlexContainer onClick={onLoginButtonClick()}>
            <Icon className={elMr5} fontSize="4rem" icon="foundationsCustomerInfographic" />
            <FlexContainer isFlexJustifyCenter isFlexColumn>
              <BodyText>Existing Customer</BodyText>
              <SmallText hasGreyText hasNoMargin>
                Existing Reapit AgencyCloud (desktop CRM) subscriber
              </SmallText>
            </FlexContainer>
          </FlexContainer>
        </LoginRoleTile>
        <LoginRoleTile>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSetMK5HFLBINWZfVvOO5iblXj8YWWgnKdt0rbFeJkxnZm0MaQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FlexContainer>
              <Icon className={elMr5} fontSize="4rem" icon="webDeveloperInfographic" />
              <FlexContainer isFlexJustifyCenter isFlexColumn>
                <BodyText>Third-party developer</BodyText>
                <SmallText hasGreyText hasNoMargin>
                  Working on-behalf of a Reapit customer, e.g. website developer
                </SmallText>
              </FlexContainer>
            </FlexContainer>
          </a>
        </LoginRoleTile>
        <LoginRoleTile>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSetMK5HFLBINWZfVvOO5iblXj8YWWgnKdt0rbFeJkxnZm0MaQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FlexContainer>
              <Icon className={elMr5} fontSize="4rem" icon="propTechInfographic" />
              <FlexContainer isFlexJustifyCenter isFlexColumn>
                <BodyText>PropTech</BodyText>
                <SmallText hasGreyText hasNoMargin>
                  Independent company building an app or integration
                </SmallText>
              </FlexContainer>
            </FlexContainer>
          </a>
        </LoginRoleTile>
      </LoginContentWrapper>
      <Modal title="Submit Email">
        <FlexContainer className={cx(elMb7, elPx6)}>
          <Icon className={elMr5} fontSize="4rem" icon="newCustomerInfographic" />
          <FlexContainer isFlexJustifyCenter isFlexColumn>
            <BodyText>New Customer</BodyText>
            <BodyText hasGreyText>
              To find out more about Developer Portal, AgencyCloud and the AppMarket, just enter your email address and
              we will be in touch:
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
