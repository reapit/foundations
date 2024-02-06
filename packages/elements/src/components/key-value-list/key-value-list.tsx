import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cx } from '@linaria/core'
import { ElKeyValueIconWrap, ElKeyValueListWrap } from './__styles__'
import { IconNames, Icon } from '../icon'
import { ColHalf, Col, Grid } from '../grid'
import { TextSM, TextXS } from '../typography'
import { FlexContainer } from '../layout'
import { Intent } from '../../helpers/intent'
import { elTextEllipsis } from '../../styles/typography'

export interface KeyValueItem {
  key: string
  value: ReactNode
  iconName?: IconNames
  icon?: ReactNode
  intent?: Intent
  colSize?: 'half' | 'full'
  textEllipsis?: boolean
}

export interface KeyValueContentProps {
  item: KeyValueItem
}

export interface KeyValueListProps extends HTMLAttributes<HTMLDivElement> {
  items: KeyValueItem[]
  hasGrid?: boolean
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

export const KeyValueContent: FC<KeyValueContentProps> = ({
  item: { intent, iconName, icon, value, key, textEllipsis },
}) => (
  <>
    <KeyValueIconWrap>
      {icon ? (
        icon
      ) : iconName ? (
        <Icon intent={intent ?? 'primary'} icon={iconName} />
      ) : (
        <Icon icon="placeholderSmall" />
      )}
    </KeyValueIconWrap>
    <FlexContainer isFlexColumn>
      <TextXS className={cx(textEllipsis && elTextEllipsis)} hasGreyText>
        {key}
      </TextXS>
      <TextSM className={cx(textEllipsis && elTextEllipsis)}>{value}</TextSM>
    </FlexContainer>
  </>
)

export const KeyValueList: FC<KeyValueListProps> = ({ className, items, hasGrid, ...rest }) => {
  return hasGrid ? (
    <Grid className={cx(className)} {...rest}>
      {items.map((item) => {
        return item.colSize === 'half' ? (
          <ColHalf key={item.key}>
            <FlexContainer>
              <KeyValueContent item={item} />
            </FlexContainer>
          </ColHalf>
        ) : (
          <Col key={item.key}>
            <FlexContainer>
              <KeyValueContent item={item} />
            </FlexContainer>
          </Col>
        )
      })}
    </Grid>
  ) : (
    <>
      {items.map((item) => (
        <KeyValueListWrap key={item.key}>
          <KeyValueContent item={item} />
        </KeyValueListWrap>
      ))}
    </>
  )
}
