import { usePageId } from '@/components/hooks/use-page-id'
import React, { forwardRef } from 'react'
import { Loader } from '@reapit/elements'
import { useApp } from '@/components/hooks/apps/use-app'
import { styled } from '@linaria/react'
import { Link } from './link'

export type NavbarProps = {
  includedPageIds?: string[]
}

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const NavLink = styled(Link)`
  margin-right: 16px;
`

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(({ includedPageIds }, ref) => {
  const { appId } = usePageId()
  const { app, loading } = useApp(appId)

  if (loading) {
    return <Loader />
  }

  return (
    <NavContainer ref={ref}>
      {app?.pages
        .filter(({ id }) => includedPageIds && includedPageIds.includes(id))
        .map(({ id, name }) => (
          <NavLink width={1} key={id} destination={id}>
            {name || 'Home'}
          </NavLink>
        ))}
    </NavContainer>
  )
})
