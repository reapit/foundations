import React from 'react'
import { render } from '@testing-library/react'
import {
  AccordionContainer,
  AccordionItem,
  AccordionTitle,
  AccordionTitleContentWrapper,
  AccordionTitleContent,
  AccordionContent,
  Accordion,
} from '..'
import { Icon } from '../../icon'
import { elMr1 } from '../../../styles/spacing'
import { elIsActive } from '../../../styles/states'

describe('Accordion basic usage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <AccordionContainer>
        <AccordionItem onClick={console.log}>
          <AccordionTitle>Accordion Item 1</AccordionTitle>
          <AccordionTitleContentWrapper>
            <AccordionTitleContent>
              <Icon className={elMr1} icon="carSolidSystem" />2
            </AccordionTitleContent>
            <AccordionTitleContent>
              <Icon className={elMr1} icon="usernameSolidSystem" />5
            </AccordionTitleContent>
            <AccordionTitleContent>
              <Icon icon="upSystem" />
            </AccordionTitleContent>
          </AccordionTitleContentWrapper>
        </AccordionItem>
        <AccordionContent className={elIsActive}>Accordion Content 1</AccordionContent>
        <AccordionItem onClick={console.log}>
          <AccordionTitle>Accordion Item 2</AccordionTitle>
          <AccordionTitleContentWrapper>
            <AccordionTitleContent>
              <Icon className={elMr1} icon="carSolidSystem" />2
            </AccordionTitleContent>
            <AccordionTitleContent>
              <Icon className={elMr1} icon="usernameSolidSystem" />5
            </AccordionTitleContent>
            <AccordionTitleContent>
              <Icon icon="downSystem" />
            </AccordionTitleContent>
          </AccordionTitleContentWrapper>
        </AccordionItem>
        <AccordionContent>Accordion Content 2</AccordionContent>
      </AccordionContainer>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Accordion react shorthand', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <Accordion
        items={[
          {
            title: 'Accordion Item 1',
            content: 'Accordion Content 1',
            titleItems: [
              <>
                <Icon className={elMr1} icon="carSolidSystem" />2
              </>,
              <>
                <Icon className={elMr1} icon="usernameSolidSystem" />5
              </>,
            ],
          },
          {
            title: 'Accordion Item 2',
            content: 'Accordion Content 2',
            titleItems: [
              <>
                <Icon className={elMr1} icon="carSolidSystem" />2
              </>,
              <>
                <Icon className={elMr1} icon="usernameSolidSystem" />5
              </>,
            ],
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
