import React from 'react'
import { RenderWithHeader } from '@/components/pages/developer-app-detail/app-detail/render-with-header'
import { Button } from '@reapit/elements'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'

export const DeveloperImageSection = () => <RenderWithHeader header="Developer">TBC</RenderWithHeader>

export const AboutDeveloperSection = () => (
  <RenderWithHeader header="About Developer">
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam aliquid culpa saepe asperiores debitis illo
      dolorum dolore incidunt officiis praesentium, nemo similique veritatis exercitationem perferendis non mollitia
      animi laboriosam perspiciatis.
    </p>
  </RenderWithHeader>
)

export const ContactDeveloperSection = () => (
  <RenderWithHeader header="Contact Developer">
    <Button type="button" variant="primary" className={clientAppDetailStyles.needHelpButton}>
      NEED HELP?
    </Button>
  </RenderWithHeader>
)
