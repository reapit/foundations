import * as React from 'react'
import Tooltip from 'rc-tooltip'

export interface CustomTagProps {
  label: string
  description: string
  link: string
  onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const CustomTag: React.FC<CustomTagProps> = ({ label, description, link, onClose }) => {
  const handleRemoveTag = (event: React.SyntheticEvent) => {
    event?.preventDefault()
    onClose()
  }

  return (
    <Tooltip
      prefixCls="reapit-tooltip"
      placement="bottomLeft"
      overlay={
        <span className="reapit-tooltip-content">
          {description}
          {'. '}
          {link && (
            <span>
              For more information on <b>{label}</b>, please{' '}
              <a className="reapit-tooltip-link" href={link} rel="noopener noreferrer" target="_blank">
                click here
              </a>
            </span>
          )}
        </span>
      }
    >
      <div className="custom-tag tags has-addons">
        <span className="tag is-light">{label}</span>
        <a href="" onClick={handleRemoveTag} className="tag is-light is-delete"></a>
      </div>
    </Tooltip>
  )
}

export default CustomTag
