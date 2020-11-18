import React from 'react'
import { useSelector } from 'react-redux'
import { selectDeveloperListState } from '@/selector/admin'

export interface MemberNameCellProps {
  cell: { value: string }
}

const MemberNameCell: React.FC<MemberNameCellProps> = ({ cell: { value } }) => {
  const DeveloperListState = useSelector(selectDeveloperListState)
  const { data } = DeveloperListState
  const developer = data.find(dev => dev.id === value)

  if (!developer) return null

  return <p>{developer.name}</p>
}

export default MemberNameCell
