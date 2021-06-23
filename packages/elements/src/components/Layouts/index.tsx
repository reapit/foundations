import React, { HTMLAttributes, FC } from 'react'
import { cx } from 'linaria'
import { ElMainContainer, ElPageContainer, ElSecondaryNavContainer, ElMolecule, ElFlexContainer } from './__styles__'
import {
  elFlexRow,
  elFlexColumn,
  elFlexColumnReverse,
  elFlexRowReverse,
  elFlexWrap,
  elFlexNoWrap,
  elFlexWrapReverse,
  elFlexAuto,
  elFlexGrow0,
  elFlexInitial,
  elFlexGrow,
  elFlexShrink0,
  elFlexShrink,
  elFlexJustifyCenter,
  elFlexJustifyStart,
  elFlexJustifyEnd,
  elFlexJustifyBetween,
  elFlexJustifyAround,
  elFlexJustifyEvenly,
  elAlignCenter,
  elAlignStart,
  elAlignEnd,
} from '../../styles/flexbox'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {}

export interface ContainerFlexProps extends ContainerProps {
  isFlexRow?: boolean
  isFlexRowReverse?: boolean
  isFlexColumn?: boolean
  isFlexColumnReverse?: boolean
  isFlexWrap?: boolean
  isFlexNoWrap?: boolean
  isFlexWrapReverse?: boolean
  isFlexAuto?: boolean
  isFlexInitial?: boolean
  isFlexGrow0?: boolean
  isFlexGrow1?: boolean
  isFlexShrink0?: boolean
  isFlexShrink?: boolean
  isFlexJustifyCenter?: boolean
  isFlexJustifyEnd?: boolean
  isFlexJustifyBetween?: boolean
  isFlexJustifyAround?: boolean
  isFlexJustifyEvenly?: boolean
  isFlexAlignCenter?: boolean
  isFlexAlignStart?: boolean
  isFlexAlignEnd?: boolean
}

export const MainContainer: FC<ContainerProps> = ({ children, ...rest }) => (
  <ElMainContainer {...rest}>{children}</ElMainContainer>
)

export const PageContainer: FC<ContainerProps> = ({ children, ...rest }) => (
  <ElPageContainer {...rest}>{children}</ElPageContainer>
)

export const SecondaryNavContainer: FC<ContainerProps> = ({ children, ...rest }) => (
  <ElSecondaryNavContainer {...rest}>{children}</ElSecondaryNavContainer>
)

export const Molecule: FC<ContainerProps> = ({ children, ...rest }) => <ElMolecule {...rest}>{children}</ElMolecule>

export const FlexContainer: FC<ContainerFlexProps> = ({
  children,
  isFlexRow,
  isFlexRowReverse,
  isFlexColumn,
  isFlexColumnReverse,
  isFlexWrap,
  isFlexNoWrap,
  isFlexWrapReverse,
  isFlexAuto,
  isFlexInitial,
  isFlexGrow0,
  isFlexGrow1,
  isFlexShrink0,
  isFlexShrink,
  isFlexJustifyCenter,
  isFlexJustifyEnd,
  isFlexJustifyBetween,
  isFlexJustifyAround,
  isFlexJustifyEvenly,
  isFlexAlignCenter,
  isFlexAlignStart,
  isFlexAlignEnd,
  className,
  ...rest
}) => {
  const combinedClasses = cx(
    isFlexRow && elFlexRow,
    isFlexRowReverse && elFlexRowReverse,
    isFlexColumn && elFlexColumn,
    isFlexColumnReverse && elFlexColumnReverse,
    isFlexWrap && elFlexWrap,
    isFlexNoWrap && elFlexNoWrap,
    isFlexWrapReverse && elFlexWrapReverse,
    isFlexAuto && elFlexAuto,
    isFlexInitial && elFlexInitial,
    isFlexGrow0 && elFlexGrow0,
    isFlexGrow1 && elFlexGrow,
    isFlexShrink0 && elFlexShrink0,
    isFlexShrink && elFlexShrink,
    isFlexJustifyCenter && elFlexJustifyCenter,
    isFlexJustifyEnd && elFlexJustifyStart,
    isFlexJustifyBetween && elFlexJustifyEnd,
    isFlexJustifyAround && elFlexJustifyBetween,
    isFlexJustifyEvenly && elFlexJustifyAround,
    isFlexAlignCenter && elFlexJustifyEvenly,
    isFlexAlignStart && elAlignCenter,
    isFlexAlignEnd && elAlignStart,
    className && elAlignEnd,
  )

  return (
    <ElFlexContainer className={combinedClasses} {...rest}>
      {children}
    </ElFlexContainer>
  )
}
