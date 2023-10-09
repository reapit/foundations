import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cx } from '@linaria/core'
import { ElKeyValueIconWrap, ElKeyValueListWrap } from './__styles__'
import { IconNames, Icon } from '../icon'
import { ColHalf, Col, Grid } from '../grid'
import { TextSM, TextXS } from '../typography'
import { FlexContainer } from '../layout'
import { Intent } from '../../helpers/intent'

export interface KeyValueItem {
  key: string
  value: ReactNode
  iconName?: IconNames
  icon?: ReactNode
  intent?: Intent
}

export interface KeyValueListProps extends HTMLAttributes<HTMLDivElement> {
  items: KeyValueItem[]
  hasLargeGrid?: boolean
  hasSmallGrid?: boolean
}

export const KeyValueIconWrap: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElKeyValueIconWrap className={cx(className)} {...rest}>
    {children}
  </ElKeyValueIconWrap>
)

export const KeyValueListWrap: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElKeyValueListWrap className={cx(className)} {...rest}>
    {children}
  </ElKeyValueListWrap>
)

export const KeyValueList: FC<KeyValueListProps> = ({ className, items, hasLargeGrid, hasSmallGrid, ...rest }) => {
  return hasSmallGrid ? (
    <Grid className={cx(className)} {...rest}>
      {items.map(({ key, value, iconName, intent, icon }) => (
        <ColHalf key={key}>
          <FlexContainer>
            <KeyValueIconWrap>
              {icon ? (
                icon
              ) : iconName ? (
                <Icon fontSize="20px" intent={intent ?? 'primary'} icon={iconName} />
              ) : (
                <Icon fontSize="20px" icon="placeholderSmall" />
              )}
            </KeyValueIconWrap>
            <FlexContainer isFlexColumn>
              <TextXS hasGreyText>{key}</TextXS>
              <TextSM>{value}</TextSM>
            </FlexContainer>
          </FlexContainer>
        </ColHalf>
      ))}
    </Grid>
  ) : hasLargeGrid ? (
    <Grid className={cx(className)} {...rest}>
      {items.map(({ key, value, iconName, intent, icon }) => (
        <Col key={key}>
          <FlexContainer>
            <KeyValueIconWrap>
              {icon ? (
                icon
              ) : iconName ? (
                <Icon fontSize="20px" intent={intent ?? 'primary'} icon={iconName} />
              ) : (
                <Icon fontSize="20px" icon="placeholderSmall" />
              )}
            </KeyValueIconWrap>
            <FlexContainer isFlexColumn>
              <TextXS hasGreyText>{key}</TextXS>
              <TextSM>{value}</TextSM>
            </FlexContainer>
          </FlexContainer>
        </Col>
      ))}
    </Grid>
  ) : (
    <>
      {items.map(({ key, value, iconName, intent, icon }) => (
        <KeyValueListWrap key={key}>
          <KeyValueIconWrap>
            {icon ? (
              icon
            ) : iconName ? (
              <Icon fontSize="20px" intent={intent ?? 'primary'} icon={iconName} />
            ) : (
              <Icon fontSize="20px" icon="placeholderSmall" />
            )}
          </KeyValueIconWrap>
          <FlexContainer isFlexColumn>
            <TextXS hasGreyText>{key}</TextXS>
            <TextSM>{value}</TextSM>
          </FlexContainer>
        </KeyValueListWrap>
      ))}
    </>
  )
}
