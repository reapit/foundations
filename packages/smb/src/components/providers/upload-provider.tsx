import * as React from 'react'
import { UploadStateContext, UploadDispatchContext } from '@/context'
import { UploadProgress } from '@reapit/elements'
import { UploadResultModal } from '@/components/ui/upload-result-modal'
import { reducer, initialState } from '@/reducers/update-provider'
import { resetState } from '@/actions/update-provider'

export type UploadProviderProps = { children: JSX.Element }

export const handleCloseModal = (setCompleted, dispatch) => () => {
  dispatch(resetState())
  setCompleted(false)
}

function UploadProvider({ children }: UploadProviderProps) {
  const [isCompleted, setCompleted] = React.useState(false)
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { status, totalItem, completedItem, uploadResult } = state

  React.useEffect(() => {
    if (status === 'UPLOADED' && !isCompleted) {
      setCompleted(true)
    }
  }, [status])

  return (
    <UploadStateContext.Provider value={state}>
      <UploadDispatchContext.Provider value={dispatch}>
        {children}
        <UploadProgress
          visible={status === 'UPLOADING'}
          percentage={(completedItem * 100) / totalItem}
          totalCount={totalItem}
          completedCount={completedItem}
        />
        <UploadResultModal
          visible={isCompleted}
          results={uploadResult}
          onCloseClick={handleCloseModal(setCompleted, dispatch)}
        />
      </UploadDispatchContext.Provider>
    </UploadStateContext.Provider>
  )
}

export default UploadProvider
