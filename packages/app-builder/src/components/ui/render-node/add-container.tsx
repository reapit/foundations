import { NAV_NODE } from '@/components/hooks/apps/node-helpers'
import { ROOT_NODE } from '@craftjs/core'
import React from 'react'
import { HeaderContainer, FooterContainer, BodyContainer, RootContainer, NavigationContainer } from './styles'

export const AddContainer = ({ nodeId, children }: { nodeId: string; children: React.ReactChild }) => {
  const isHeader = nodeId === 'header'
  const isFooter = nodeId === 'footer'
  const isBody = nodeId === 'body'
  const isNavigation = nodeId === NAV_NODE
  const isRoot = nodeId === ROOT_NODE

  return (
    <>
      {isHeader && <HeaderContainer>{children}</HeaderContainer>}
      {isFooter && <FooterContainer>{children}</FooterContainer>}
      {isBody && <BodyContainer>{children}</BodyContainer>}
      {isRoot && <RootContainer>{children}</RootContainer>}
      {isNavigation && <NavigationContainer>{children}</NavigationContainer>}
      {!isHeader && !isFooter && !isBody && !isRoot && !isNavigation && children}
    </>
  )
}
