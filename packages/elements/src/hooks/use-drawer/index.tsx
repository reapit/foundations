import React, { FC, useMemo, useState } from 'react'
import { Drawer, DrawerProps } from '../../components/drawer'
import { Portal } from '../use-portal'

export type UseDrawer = [
  Drawer: FC<Partial<DrawerProps>>,
  openDrawer: () => void,
  closeDrawer: () => void,
  drawerIsOpen: boolean,
]

export const useDrawer = (id?: string): UseDrawer => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const portalId = id ?? 'root'
  const closeDrawer = () => setDrawerIsOpen(false)
  const openDrawer = () => setDrawerIsOpen(true)

  const DrawerComponent: FC<Partial<DrawerProps>> = ({
    children,
    isOpen = drawerIsOpen,
    onDrawerClose = closeDrawer,
    ...rest
  }) => (
    <Portal id={portalId}>
      <Drawer isOpen={isOpen} onDrawerClose={onDrawerClose} {...rest}>
        {children}
      </Drawer>
    </Portal>
  )

  return useMemo(() => [DrawerComponent, openDrawer, closeDrawer, drawerIsOpen], [drawerIsOpen])
}
