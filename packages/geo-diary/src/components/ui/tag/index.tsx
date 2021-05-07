import * as React from 'react'
import * as styles from './__styles__'

export interface TagProps {
  label: string
}

const Tag: React.FC<TagProps> = ({ label }: TagProps) => {
  return <span className={styles.tagContainer}>{label}</span>
}

export default Tag
