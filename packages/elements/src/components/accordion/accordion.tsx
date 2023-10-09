import React, { Dispatch, FC, Fragment, HTMLAttributes, ReactNode, SetStateAction, useState } from 'react'
import { cx } from '@linaria/core'
import {
  ElAccordionContainer,
  ElAccordionContent,
  ElAccordionItem,
  ElAccordionTitle,
  ElAccordionTitleContent,
  ElAccordionTitleContentWrapper,
} from './__styles__'
import { elIsActive } from '../../styles/states'
import { Icon } from '../icon'

export interface AccordionBaseProps extends HTMLAttributes<HTMLDivElement> {}

export interface AccordionTitleItemProps {}

export interface AccordionItemProps {
  title: string
  titleItems?: ReactNode[]
  content: ReactNode
}

export interface AccordionProps extends AccordionBaseProps {
  items: AccordionItemProps[]
}

export const AccordionContainer: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionContainer {...rest}>{children}</ElAccordionContainer>
}

export const AccordionItem: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionItem {...rest}>{children}</ElAccordionItem>
}

export const AccordionTitle: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionTitle {...rest}>{children}</ElAccordionTitle>
}

export const AccordionTitleContentWrapper: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionTitleContentWrapper {...rest}>{children}</ElAccordionTitleContentWrapper>
}

export const AccordionTitleContent: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionTitleContent {...rest}>{children}</ElAccordionTitleContent>
}

export const AccordionContent: FC<AccordionBaseProps> = ({ children, ...rest }) => {
  return <ElAccordionContent {...rest}>{children}</ElAccordionContent>
}

export const handleSetOpenItem = (openItem: number, setOpenItem: Dispatch<SetStateAction<number | null>>) => () => {
  setOpenItem((currentItem) => {
    if (currentItem === openItem) {
      return null
    }
    return openItem
  })
}

export const Accordion: FC<AccordionProps> = ({ items, className, ...rest }) => {
  const [openItem, setOpenItem] = useState<number | null>(null)
  return (
    <ElAccordionContainer className={className} {...rest}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <ElAccordionItem onClick={handleSetOpenItem(index, setOpenItem)}>
            <ElAccordionTitle>{item.title}</ElAccordionTitle>
            <ElAccordionTitleContentWrapper>
              {item.titleItems &&
                item.titleItems.map((titleItem, innerIndex) => (
                  <ElAccordionTitleContent key={innerIndex}>{titleItem}</ElAccordionTitleContent>
                ))}
              <ElAccordionTitleContent>
                <Icon icon={openItem === index ? 'upSystem' : 'downSystem'} />
              </ElAccordionTitleContent>
            </ElAccordionTitleContentWrapper>
          </ElAccordionItem>
          <ElAccordionContent className={cx(openItem === index && elIsActive)}>{item.content}</ElAccordionContent>
        </Fragment>
      ))}
    </ElAccordionContainer>
  )
}
