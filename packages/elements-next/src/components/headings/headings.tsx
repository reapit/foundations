import React from 'react'
import { cx } from 'linaria'
import { elHeadingMain } from './__styles__/headings-styles'
import { elIsTextCentered } from '@/styles/typography'
import { elMB } from '@/styles/margins'

interface HeadingProps {
  /**
   * Optional class to override any defaults
   */
  className?: string
  /**
   * Aligns text to the center of the heading
   */
  isTextCentered?: boolean
}

export const HeadingMain: React.FC<HeadingProps> = ({ children, isTextCentered, className }) => (
  <h1 className={cx(elHeadingMain, elMB, isTextCentered && elIsTextCentered, className)}>{children}</h1>
)

export const SubHeadingMain: React.FC<HeadingProps> = ({ children, isTextCentered, className }) => (
  <h3 className={cx(elHeadingMain, isTextCentered && elIsTextCentered, className)}>{children}</h3>
)

export const HeadingSecondary: React.FC<HeadingProps> = ({ children, isTextCentered, className }) => (
  <h4 className={cx(elHeadingMain, isTextCentered && elIsTextCentered, className)}>{children}</h4>
)

export const SubHeadingSecondary: React.FC<HeadingProps> = ({ children, isTextCentered, className }) => (
  <h6 className={cx(elHeadingMain, isTextCentered && elIsTextCentered, className)}>{children}</h6>
)

export const Heading = {
  Main: HeadingMain,
  SubMain: SubHeadingMain,
  Secondary: HeadingSecondary,
  SubSecondary: SubHeadingSecondary,
} as { [key: string]: React.ReactNode }

export default Heading
