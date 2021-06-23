import * as React from 'react'

export interface UploadProgressProps {
  visible: boolean
  percentage?: number
  totalCount?: number
  completedCount?: number
}

const MAX = 100
const MIN = 0

export const UploadProgress: React.FC<UploadProgressProps> = ({
  visible,
  percentage = 0,
  totalCount = 0,
  completedCount = 0,
}) => {
  let validPercentage = percentage
  if (percentage > MAX) {
    validPercentage = MAX
  }
  if (percentage < MIN) {
    validPercentage = MIN
  }

  return (
    <div className={`upload-progress has-background-info ${visible ? 'visible' : ''}`}>
      <span>Uploading...</span>
      <div className="upload-progress-inner">
        <div className="upload-progress-bg" style={{ width: `${validPercentage}%` }}></div>
      </div>
      <span>{`Complete ${completedCount}/${totalCount}`}</span>
    </div>
  )
}
