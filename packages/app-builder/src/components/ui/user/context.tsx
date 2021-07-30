import { usePageId } from '@/core/usePageId'
import React from 'react'

const Context = () => {
  const { context } = usePageId()

  return <div>{JSON.stringify(context, null, '\t')}</div>
}

export default Context
