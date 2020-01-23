import React from 'react'
import { GITTER } from '@/constants/gitter'
import Sidecar from 'gitter-sidecar'
import styles from '@/styles/pages/forum.scss?mod'
import { H3, SubTitleH5 } from '@reapit/elements'

export const Forum: React.FunctionComponent = () => {
  const roomRef = React.createRef<HTMLDivElement>()
  const [room, setRoom] = React.useState()

  React.useEffect(() => {
    if (roomRef.current && roomRef.current instanceof HTMLDivElement && !room) {
      setRoom(
        new Sidecar({
          room: GITTER.REAPIT_ROOM_NAME,
          targetElement: roomRef.current,
          showChatByDefault: true,
          useStyles: false
        })
      )
    }
  }, [])

  return (
    <div className={styles['forum-container']}>
      <H3>Forum</H3>
      <SubTitleH5>
        Welcome to the Reapit Foundations Community. The chat room below is intended as a place for developers to
        discuss working with the Reapit Platform. Our developers might drop by from time to time but if you want to
        report bugs or request features, please head to our “help” section.
      </SubTitleH5>
      <div className={styles['gitter-container']} ref={roomRef}></div>
    </div>
  )
}

export default Forum
