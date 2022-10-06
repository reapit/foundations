import { useAppPages } from '@/components/hooks/apps/use-app'
import { usePageId } from '@/components/hooks/use-page-id'
import Plus from '@/components/icons/plus'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import { elFlex, elFlex1, elFlexAlignCenter, elFlexJustifyStart, elM2 } from '@reapit/elements'
import React, { useEffect } from 'react'
import { AppBuilderIconButtonWithText } from '../components'

const ToggleContainer = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 4px;
`

const ComponentsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.91342 9.12891H18.0103C19.067 9.12891 19.9237 10.1856 19.9237 11.0423V18.0858C19.9237 19.1425 19.067 19.9992 18.0103 19.9992H1.91342C0.85673 19.9992 0 18.9425 0 18.0858V11.0423C0 9.98564 0.856692 9.12891 1.91342 9.12891Z"
      fill="currentColor"
    />
    <path
      d="M2.51969 7.39584H17.4063C17.6445 7.39584 17.8646 7.26876 17.9837 7.06251C18.1027 6.85611 18.1027 6.60208 17.9837 6.39584C17.8646 6.18943 17.6445 6.0625 17.4063 6.0625H2.51969C2.28144 6.0625 2.06136 6.18943 1.94231 6.39584C1.82327 6.60209 1.82327 6.85611 1.94231 7.06251C2.06136 7.26876 2.28145 7.39584 2.51969 7.39584Z"
      fill="currentColor"
    />
    <path
      d="M4.8931 4.28647H15.033C15.2712 4.28647 15.4913 4.15953 15.6104 3.95313C15.7294 3.74688 15.7294 3.49286 15.6104 3.28646C15.4913 3.08021 15.2712 2.95312 15.033 2.95312H4.8931C4.65486 2.95312 4.43478 3.08021 4.31573 3.28646C4.19668 3.49286 4.19668 3.74688 4.31573 3.95313C4.43478 4.15953 4.65486 4.28647 4.8931 4.28647Z"
      fill="currentColor"
    />
    <path
      d="M7.84997 1.33334H12.0767C12.3148 1.33334 12.5348 1.20626 12.6539 1.00001C12.7731 0.793754 12.7731 0.539585 12.6539 0.333336C12.5348 0.127083 12.3148 0 12.0767 0H7.84997C7.61187 0 7.3918 0.127083 7.27275 0.333336C7.15355 0.539589 7.15355 0.793758 7.27275 1.00001C7.3918 1.20626 7.61188 1.33334 7.84997 1.33334Z"
      fill="currentColor"
    />
  </svg>
)

export const PageSelector = ({
  showNewPage,
  setShowNewPage,
}: {
  showNewPage: boolean
  setShowNewPage: (snp: boolean) => void
}) => {
  const { appId, pageId, setPageId } = usePageId()
  const { pages } = useAppPages(appId)

  useEffect(() => {
    const currentPageExists = pages?.some((page) => page.id === pageId)
    const firstPageId = pages && pages[0] && pages[0].id
    if (!currentPageExists && firstPageId) {
      setPageId(firstPageId)
    }
  }, [pages, pageId])

  return (
    <div className={cx(elFlex1, elFlex, elFlexAlignCenter, elFlexJustifyStart)}>
      <ToggleContainer>
        <AppBuilderIconButtonWithText isActive={showNewPage} className={elM2} onClick={() => setShowNewPage(true)}>
          <Plus />
          New Page
        </AppBuilderIconButtonWithText>

        <AppBuilderIconButtonWithText isActive={!showNewPage} className={elM2} onClick={() => setShowNewPage(false)}>
          <ComponentsIcon />
          Components
        </AppBuilderIconButtonWithText>
      </ToggleContainer>
    </div>
  )
}
