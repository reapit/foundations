import React from 'react'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

import { useAppPages } from '../../hooks/apps/use-app'
import { usePageId } from '../..//hooks/use-page-id'
import Delete from '@/components/icons/delete'
import { AppBuilderIconButton } from '../components'
import { useDeletePage } from '@/components/hooks/apps/use-update-app'

const Tab = styled.div<{ itemId?: any; isActive?: boolean }>`
  background: white;
  :not(:first-child) {
    margin-left: 2px;
  }

  padding: 7px;
  padding-left: 12px;
  border-radius: 4px;
  min-width: 134px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */

  display: flex;
  align-items: center;
  font-feature-settings: 'liga' off;

  /* Neutral/Black */

  color: #000000;

  cursor: pointer;
`

const TabActive = css`
  font-weight: 400;
  color: #646464;
  background: #f8f8f8;
`

const TabsContainer = styled.div`
  max-height: 32px;
  width: 100%;
  user-select: none;
`

const DeletePage = () => {
  const { appId, pageId, setPageId } = usePageId()
  const { deletePage, loading } = useDeletePage(appId)

  return (
    <AppBuilderIconButton
      style={{
        alignSelf: 'flex-end',
        background: 'none',
      }}
      loading={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this page?')) {
          deletePage(pageId).then(() => {
            setPageId('')
          })
        }
      }}
    >
      <Delete />
    </AppBuilderIconButton>
  )
}

const ArrowContainer = styled.div`
  width: 32px;
  height: 32px;
  background: #f8f8f8;
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg
    width="9"
    height="10"
    viewBox="0 0 9 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={flip ? { transform: 'scale(-1,1)' } : {}}
  >
    <path
      d="M6.10902 5.00208L2.19802 1.09108C2.06281 0.955854 2.06281 0.736617 2.19802 0.60139C2.33327 0.466203 2.55249 0.466203 2.68771 0.60139L6.84356 4.75723C6.97874 4.89246 6.97874 5.1117 6.84356 5.24693L2.68771 9.40277C2.55013 9.53564 2.33089 9.53183 2.19802 9.39425C2.06841 9.26003 2.06841 9.04727 2.19802 8.91308L6.10902 5.00208Z"
      fill="#646464"
      stroke="#646464"
      strokeWidth="0.3"
    />
  </svg>
)

type ArrowProps = {
  onClick: () => void
}

const RightArrow = (props: ArrowProps) => {
  return (
    <ArrowContainer {...props}>
      <Arrow />
    </ArrowContainer>
  )
}

const LeftArrow = (props: ArrowProps) => (
  <ArrowContainer {...props}>
    <Arrow flip />
  </ArrowContainer>
)

const ConnectedLeftArrow = () => {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } =
    React.useContext(VisibilityContext)

  const [disabled, setDisabled] = React.useState(!initComplete || (initComplete && isFirstItemVisible))
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible)
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators])

  return disabled ? null : <LeftArrow onClick={() => scrollPrev()} />
}

const ConnectedRightArrow = () => {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = React.useContext(VisibilityContext)

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(!visibleItemsWithoutSeparators.length && isLastItemVisible)
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible)
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators])

  return disabled ? null : <RightArrow onClick={() => scrollNext()} />
}

export const TabBar = ({ style }) => {
  const { appId, pageId, setPageId } = usePageId()
  const { pages } = useAppPages(appId)

  return (
    <div
      style={{
        ...style,
        maxHeight: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
      }}
    >
      <TabsContainer>
        <ScrollMenu LeftArrow={ConnectedLeftArrow} RightArrow={ConnectedRightArrow}>
          {(pages || []).map(({ id, name }) => (
            <Tab itemId={id} className={id !== pageId ? TabActive : ''} key={id} onClick={() => setPageId(id)}>
              {name}
            </Tab>
          ))}
        </ScrollMenu>
      </TabsContainer>
      <DeletePage />
    </div>
  )
}
