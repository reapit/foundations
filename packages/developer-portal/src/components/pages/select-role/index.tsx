import { KeyAnimation } from '@reapit/utils-react'
import React, { FC, useState } from 'react'
import { container } from '../login/__styles__/login'
import connectImage from '@/assets/images/reapit-connect.png'
import {
  FlexContainer,
  Subtitle,
  Icon,
  useModal,
  ButtonGroup,
  Button,
  BodyText,
  elMb7,
  elPx6,
  elMr5,
  SmallText,
} from '@reapit/elements'
import { onLoginButtonClick } from '../login/login'
import { RegisterContentWrapper, RegisterImageContainer, RegisterRoleTile } from './__styles__'
import { cx } from '@linaria/core'

export const SelectRolePage: FC = () => {
  const [keyStep, setKeyStep] = useState<1 | 2 | 3>(1)
  const { Modal, openModal, closeModal } = useModal()

  return (
    <div className={container}>
      <RegisterImageContainer>
        <KeyAnimation step={keyStep} />
      </RegisterImageContainer>
      <RegisterContentWrapper>
        <img src={connectImage} alt="Reapit Connect Graphic" />
        <Subtitle hasBoldText>Select an option that best describes you to register</Subtitle>
        <FlexContainer
          isFlexWrap
          onMouseOver={() => {
            setKeyStep(3)
          }}
          onMouseOut={() => {
            setKeyStep(1)
          }}
        >
          <RegisterRoleTile>
            <FlexContainer onClick={openModal}>
              <Icon className={elMr5} fontSize="4rem" icon="newCustomerInfographic" />
              <FlexContainer isFlexJustifyCenter isFlexColumn>
                <BodyText>Prospective Customer</BodyText>
                <SmallText hasGreyText>Interested in Reapit Products, not currently a subscriber</SmallText>
              </FlexContainer>
            </FlexContainer>
          </RegisterRoleTile>
          <RegisterRoleTile>
            <FlexContainer onClick={onLoginButtonClick()}>
              <Icon className={elMr5} fontSize="4rem" icon="foundationsCustomerInfographic" />
              <FlexContainer isFlexJustifyCenter isFlexColumn>
                <BodyText>Existing Customer</BodyText>
                <SmallText hasGreyText>Existing Reapit AgencyCloud (desktop CRM) subscriber</SmallText>
              </FlexContainer>
            </FlexContainer>
          </RegisterRoleTile>
          <RegisterRoleTile>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSetMK5HFLBINWZfVvOO5iblXj8YWWgnKdt0rbFeJkxnZm0MaQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FlexContainer>
                <Icon className={elMr5} fontSize="4rem" icon="webDeveloperInfographic" />
                <FlexContainer isFlexJustifyCenter isFlexColumn>
                  <BodyText>Third-party developer</BodyText>
                  <SmallText hasGreyText>Working on-behalf of a Reapit customer, e.g. website developer</SmallText>
                </FlexContainer>
              </FlexContainer>
            </a>
          </RegisterRoleTile>
          <RegisterRoleTile>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSetMK5HFLBINWZfVvOO5iblXj8YWWgnKdt0rbFeJkxnZm0MaQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FlexContainer>
                <Icon className={elMr5} fontSize="4rem" icon="propTechInfographic" />
                <FlexContainer isFlexJustifyCenter isFlexColumn>
                  <BodyText>PropTech</BodyText>
                  <SmallText hasGreyText>Independent company building an app or integration</SmallText>
                </FlexContainer>
              </FlexContainer>
            </a>
          </RegisterRoleTile>
        </FlexContainer>
      </RegisterContentWrapper>
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
          src="https://go.reapit.com/l/894351/2021-08-03/2lny5"
          title="Email Form"
          width="100%"
          frameBorder="0"
          style={{ border: 0 }}
        />
        <ButtonGroup alignment="center">
          <Button intent="secondary" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  )
}

export default SelectRolePage
