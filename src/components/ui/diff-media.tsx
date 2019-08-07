import * as React from 'react'
import styles from '@/styles/blocks/diff-media.scss?mod'

export interface DiffMediaProps {
  currentMedia?: string
  changedMedia?: string
  type?: string
}

const DiffMedia = ({ currentMedia, changedMedia, type }: DiffMediaProps) => {
  const blockStyle = type === 'icon' ? styles.iconBlock : styles.mediaBlock
  const imageStyle = type === 'icon' ? styles.iconImage : styles.mediaImage

  return (
    <div className={styles.container}>
      <div className={`${styles.block} ${blockStyle} ${styles.red}`}>
        <div className={`${styles.image} ${imageStyle}`} style={{ backgroundImage: `url(${currentMedia})` }} />
      </div>
      <span className={styles.arrow}>&#8594;</span>
      <div className={`${styles.block} ${blockStyle} ${changedMedia ? styles.green : styles.empty}`}>
        <div className={`${styles.image} ${imageStyle}`} style={{ backgroundImage: `url(${changedMedia})` }} />
      </div>
    </div>
  )
}

export default DiffMedia
