import React, { Dispatch, FC, HTMLAttributes, MouseEvent, SetStateAction, useState } from 'react'
import { ElBreadCrumbItem, ElBreadCrumbContainer } from './__styles__'
import { Icon } from '../icon'
import { elMr2 } from '../../styles/spacing'
import { FlexContainer } from '../layout'

export interface BreadCrumbItem extends HTMLAttributes<HTMLDivElement> {
  text: string
  onClick: () => void
}

export interface BreadCrumbProps extends HTMLAttributes<HTMLDivElement> {
  items: BreadCrumbItem[]
  defaultActiveIndex?: number
}

export const handleNext = (setActive: Dispatch<SetStateAction<number>>, onClick: () => void, index: number) => (
  e: MouseEvent<HTMLDivElement>,
) => {
  e.preventDefault()
  setActive(index)
  onClick()
}

export const BreadCrumb: FC<BreadCrumbProps> = ({ items, defaultActiveIndex = 0, ...rest }) => {
  const [active, setActive] = useState<number>(defaultActiveIndex)

  return (
    <ElBreadCrumbContainer {...rest}>
      {items.map(({ onClick, text }, index) => {
        if (index > active) return null

        return (
          <FlexContainer isFlexAlignCenter key={index}>
            {Boolean(index) && <Icon className={elMr2} icon="nextSystem" fontSize="12px" />}
            <ElBreadCrumbItem onClick={handleNext(setActive, onClick, index)}>{text}</ElBreadCrumbItem>
          </FlexContainer>
        )
      })}
    </ElBreadCrumbContainer>
  )
}
