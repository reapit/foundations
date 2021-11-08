import React from 'react'
import { render } from '@testing-library/react'
import { HelperWidgetContent } from '../helper-widget-content'
import { helperWidgetConfig } from '../config'
import { HelperContentType } from '../helper-widget'

describe('HelperWidgetContent', () => {
  it('should match a snapshot for videos', () => {
    expect(
      render(
        <HelperWidgetContent contentType={HelperContentType.videos} config={helperWidgetConfig.developerPortal[1]} />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for docs', () => {
    expect(
      render(
        <HelperWidgetContent contentType={HelperContentType.docs} config={helperWidgetConfig.developerPortal[1]} />,
      ),
    ).toMatchSnapshot()
  })
})
