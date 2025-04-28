import { cx } from '@linaria/core'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb6,
  FormLayout,
  InputWrapFull,
  InputWrapHalf,
  Subtitle,
} from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

export interface CopyState {
  Text: string
}

export const handleCopyCode = (setCopyState: Dispatch<SetStateAction<CopyState>>, key: keyof CopyState) => () => {
  setCopyState({
    ...defaultCopyState,
    [key]: 'Copied',
  })

  setTimeout(() => {
    setCopyState((currentState) => ({
      ...currentState,
      [key]: 'Copy',
    }))
  }, 5000)
}

export const defaultCopyState = {
  Text: 'Copy',
}

export const DnsSettingsPage: FC<{
  dnsInfo: {
    customDomain: string
    cloudfrontUrl: string
    certificate: any
  }
}> = ({ dnsInfo }) => {
  const [copyState, setCopyState] = useState<CopyState>(defaultCopyState)

  const copyText = `
      TYPE\r\nCNAME\r\nNAME\r\n${dnsInfo.customDomain}\r\nVALUE\n\r${dnsInfo.cloudfrontUrl}\r\n\r\n
      ${dnsInfo.certificate?.DomainValidationOptions?.map((domain) => `TYPE\r\n${domain?.ResourceRecord?.Type}\r\nNAME\r\n${domain?.ResourceRecord?.Name}\r\nVALUE\r\n${domain?.ResourceRecord?.Value}\r\n\r\n`)}
    `

  return (
    <>
      <FormLayout className={cx(elMb6)}>
        <InputWrapFull>
          <BodyText hasGreyText>
            Your custom DNS setup was completed on IaaS. For your custom domain to be working, you will now you need to
            notify your relevent Dev Ops team about the records mentioned below.
          </BodyText>
        </InputWrapFull>
        <InputWrapHalf>
          <Subtitle>Type</Subtitle>
          <BodyText hasGreyText>CNAME</BodyText>
        </InputWrapHalf>
        <InputWrapHalf>
          <Subtitle>Name</Subtitle>
          <BodyText hasGreyText>{dnsInfo.customDomain}</BodyText>
        </InputWrapHalf>
        <InputWrapHalf>
          <Subtitle>Value</Subtitle>
          <BodyText hasGreyText>{dnsInfo.cloudfrontUrl}</BodyText>
        </InputWrapHalf>
      </FormLayout>
      {dnsInfo.certificate?.DomainValidationOptions?.map((domain, index) => (
        <FormLayout
          className={cx(elMb6)}
          key={`${domain?.ResourceRecord?.Name}.${domain?.ResourceRecord?.Value}.${index}`}
        >
          <InputWrapHalf>
            <Subtitle>Type</Subtitle>
            <BodyText hasGreyText>{domain?.ResourceRecord?.Type}</BodyText>
          </InputWrapHalf>
          <InputWrapHalf>
            <Subtitle>Name</Subtitle>
            <BodyText hasGreyText>{domain?.ResourceRecord?.Name}</BodyText>
          </InputWrapHalf>
          <InputWrapHalf>
            <Subtitle> Value</Subtitle>
            <BodyText hasGreyText>{domain?.ResourceRecord?.Value}</BodyText>
          </InputWrapHalf>
        </FormLayout>
      ))}
      <FormLayout>
        <InputWrapFull>
          <CopyToClipboard text={copyText} onCopy={handleCopyCode(setCopyState, 'Text')}>
            <Button intent="default">{copyState.Text}</Button>
          </CopyToClipboard>
        </InputWrapFull>
        <InputWrapFull>
          <BodyText>Use the buttons below to create a jira ticket for your respective region.</BodyText>
          <ButtonGroup>
            <Button intent="primary">Create Jira Ticket UKI</Button>
            <Button intent="primary">Create Jira Ticket ANZ</Button>
          </ButtonGroup>
        </InputWrapFull>
      </FormLayout>
    </>
  )
}
