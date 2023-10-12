import React, { FC, Fragment, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import {
  ElPageHeaderContainer,
  ElPageHeaderSeparator,
  ElPageHeaderTitleContainer,
  ElPageHeaderWrap,
} from './__styles__'
import { Text2XL, TextL, TextBase, TypographyProps } from '../typography'
import { FlexContainer } from '../layout'
import { Avatar, AvatarProps } from '../avatar'
import { Tag, TagGroup, TagProps } from '../tag'
import { Button, ButtonGroup, ButtonProps } from '../button'
import { BreadCrumb, BreadCrumbProps } from '../breadcrumb'
import { elMb6, elMr3 } from '../../styles/spacing'

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  avatar?: AvatarProps
  pageTitle: TypographyProps
  pageSubtitle?: TypographyProps
  pageInfo?: TypographyProps[]
  breadcrumb?: BreadCrumbProps
  tags?: TagProps[]
  buttons?: ButtonProps[]
}

export const PageHeaderWrap: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElPageHeaderWrap className={cx(className)} {...rest}>
    {children}
  </ElPageHeaderWrap>
)

export const PageHeaderContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElPageHeaderContainer className={cx(className)} {...rest}>
    {children}
  </ElPageHeaderContainer>
)

export const PageHeaderTitleContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElPageHeaderTitleContainer className={cx(className)} {...rest}>
    {children}
  </ElPageHeaderTitleContainer>
)

export const PageHeader: FC<PageHeaderProps> = ({
  avatar,
  pageTitle,
  pageSubtitle,
  pageInfo,
  breadcrumb,
  tags,
  buttons,
  ...rest
}) => {
  return (
    <PageHeaderWrap {...rest}>
      {breadcrumb && <BreadCrumb className={elMb6} {...breadcrumb} />}
      <PageHeaderContainer>
        <PageHeaderContainer>
          {avatar && <Avatar {...avatar} />}
          <FlexContainer isFlexColumn>
            <PageHeaderTitleContainer>
              {pageTitle && <Text2XL className={elMr3} {...pageTitle} />}
              {tags && (
                <TagGroup>
                  {tags.map(({ children, ...rest }, index) => (
                    <Tag key={index} {...rest}>
                      {children}
                    </Tag>
                  ))}
                </TagGroup>
              )}
            </PageHeaderTitleContainer>
            {pageSubtitle && <TextL {...pageSubtitle} />}
            {pageInfo && (
              <FlexContainer>
                {pageInfo.map(({ ...rest }, index) => (
                  <Fragment key={index}>
                    <TextBase {...rest} />
                    {index !== pageInfo.length - 1 && <ElPageHeaderSeparator />}
                  </Fragment>
                ))}
              </FlexContainer>
            )}
          </FlexContainer>
        </PageHeaderContainer>
        {buttons && (
          <ButtonGroup>
            {buttons.map(({ children, ...rest }, index) => (
              <Button buttonSize="small" key={index} {...rest}>
                {children}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </PageHeaderContainer>
    </PageHeaderWrap>
  )
}
