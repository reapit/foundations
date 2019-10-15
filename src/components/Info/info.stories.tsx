import React from 'react'
import { storiesOf } from '@storybook/react'
import { Info } from './index'

storiesOf('Info', module)
  .add('404', () => <Info infoType="404" />)
  .add('NoAppsInstalled', () => <Info infoType="INSTALLED_APPS_EMPTY" />)
