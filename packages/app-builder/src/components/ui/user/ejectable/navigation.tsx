import { usePageId } from '@/components/hooks/use-page-id'
import React, { forwardRef } from 'react'
import {
  Loader,
  NavResponsive,
  ElNavContainer,
  SecondaryNavContainer,
  SecondaryNav,
  SecondaryNavItem,
  Title,
} from '@reapit/elements'
import { useNavConfig } from '@/components/hooks/use-nav-config'

export type NavigationProps = {}

export const Navigation = forwardRef<HTMLDivElement, NavigationProps>((_, ref) => {
  const { setPageId } = usePageId()
  const { navIndex, navSubIndex, subItems, options } = useNavConfig()

  if (!options) {
    return <Loader />
  }

  return (
    <>
      <ElNavContainer ref={ref} style={{ overflow: 'visible' }}>
        <NavResponsive
          style={{ flex: 1 }}
          defaultNavIndex={navIndex}
          defaultNavSubIndex={navSubIndex}
          options={options}
        />
      </ElNavContainer>
      {subItems && subItems.length > 1 && (
        <SecondaryNavContainer>
          <Title>{options.find((item) => item.itemIndex === navIndex)?.text}</Title>
          <SecondaryNav>
            {subItems.map((opt) => (
              <SecondaryNavItem
                style={{ textTransform: 'capitalize' }}
                active={opt.itemIndex === navSubIndex}
                key={opt.itemIndex}
                onClick={() => {
                  setPageId(opt.pageId)
                }}
              >
                {opt.text}
              </SecondaryNavItem>
            ))}
          </SecondaryNav>
        </SecondaryNavContainer>
      )}
    </>
  )
})
