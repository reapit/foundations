import * as React from 'react'
import {
  FlexContainerBasic,
  H3,
  Level,
  LevelLeft,
  GridFourCol,
  GridFourColItem,
  Tile,
  ReapitLogo,
  Content,
  Button,
} from '@reapit/elements'
import { clipboardCopy } from '@/utils/clipboard-copy'
import ErrorBoundary from '@/components/hocs/error-boundary'
import agentImage from '@/assets/images/agent-and-sons-preview.png'
import { reapitAndSons } from '@/assets/html/reapit-and-sons'

export const handleClipboardCopy = (setCopiedTheme: (copiedTheme: boolean) => void) => {
  clipboardCopy(reapitAndSons)
  setCopiedTheme(true)
}

export const GalleryPage: React.FunctionComponent = () => {
  const [copiedTheme, setCopiedTheme] = React.useState(false)
  return (
    <ErrorBoundary>
      <FlexContainerBasic hasBackground flexColumn hasPadding>
        <Level>
          <LevelLeft>
            <H3>Gallery</H3>
          </LevelLeft>
        </Level>
        <GridFourCol>
          <GridFourColItem>
            <Tile heading="Agent & Sons" subHeading="Reapit Ltd" image={<ReapitLogo className="image" />}>
              <Content>
                <p>Basic agent site from Reapit</p>
                <img src={agentImage} />
                <Button
                  type="button"
                  variant="info"
                  onClick={() => {
                    handleClipboardCopy(setCopiedTheme)
                  }}
                  disabled={false}
                  loading={false}
                  fullWidth={false}
                >
                  {copiedTheme ? 'Copied to clipboard!' : 'Copy this theme'}
                </Button>
              </Content>
            </Tile>
          </GridFourColItem>
        </GridFourCol>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default GalleryPage
