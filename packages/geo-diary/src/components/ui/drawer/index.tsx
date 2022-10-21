import * as React from 'react'
import { cx } from '@linaria/core'
import { useSwipeable } from 'react-swipeable'
import IconButton from '../icon-button'
import * as styles from './__styles__'
import { Subtitle } from '@reapit/elements'

export interface IDrawerProps {
  isOpen: boolean
  handleClose: () => void
  children: React.ReactNode
}

const Drawer: React.FC<IDrawerProps> = ({ children, isOpen, handleClose }: IDrawerProps) => {
  const handlers = useSwipeable({
    onSwipedDown: () => {
      handleClose()
    },
    trackTouch: true,
  })

  const handleExit = (event: React.SyntheticEvent) => {
    event.stopPropagation()
    handleClose()
  }

  return (
    <>
      <div {...handlers} className={cx(styles.drawerBg, isOpen && styles.drawerBgOpen)} onClick={handleExit} />
      <div {...handlers} className={cx(styles.drawer, isOpen && styles.drawerOpen)}>
        {children}
      </div>
    </>
  )
}

export const DrawerHeader = ({ title, handleClose }: { title: string; handleClose: () => void }) => (
  <div className={styles.drawerHeader}>
    <Subtitle hasNoMargin>{title}</Subtitle>
    {handleClose && <IconButton size="small" icon="cancel" onClick={handleClose} />}
  </div>
)

export const DrawerBody = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.drawerBody}>{children}</div>
)

export default Drawer
