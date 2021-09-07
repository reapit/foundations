import { usePageId } from '@/components/hooks/use-page-id'
import React from 'react'

const Context = () => {
  const { context } = usePageId()

  return <div>{JSON.stringify(context, null, '\t')}</div>
}

export default Context
