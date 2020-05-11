import * as React from 'react'
import {
  FlexContainerBasic,
  TabConfig,
  Tabs,
  PortalProvider,
  Button,
  Modal,
  LevelRight,
  Formik,
  Form,
  Input,
} from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { initializeBlocks } from '../../core/initialize-components'
import { H3 } from '../../../../elements/src/components/Typography/index'
import { Level, LevelLeft } from '../../../../elements/src/components/Layout/index'

export type TabConfigParams = Pick<TabConfig, 'tabIdentifier' | 'displayText'> & {
  activeTab: string
  handleChangeTab: React.Dispatch<React.SetStateAction<string>>
}

const DEFAULT_IDENTIFIER = 'index'

export const loadEditor = async (
  setHasLoadedEditor: React.Dispatch<React.SetStateAction<boolean>>,
  identifier = DEFAULT_IDENTIFIER,
) => {
  const { initializeEditor } = await import('../../core/editor')
  const editor = initializeEditor({ identifier })
  initializeBlocks(editor)
  setHasLoadedEditor(true)
}

export const genTabConfig = ({
  activeTab,
  tabIdentifier,
  handleChangeTab,
  displayText,
}: TabConfigParams): TabConfig => ({
  tabIdentifier,
  displayText,
  onTabClick: handleChangeTab,
  active: activeTab === tabIdentifier,
})

export const addNewPage = (
  pageName: string,
  tabConfigs: TabConfig[],
  setTabConfigs: React.Dispatch<React.SetStateAction<TabConfig[]>>,
  handleChangeTab: React.Dispatch<React.SetStateAction<string>>,
) => {
  const newConfig = genTabConfig({
    activeTab: pageName.toUpperCase(),
    handleChangeTab,
    displayText: pageName,
    tabIdentifier: pageName.toUpperCase(),
  })
  const deactivatedTabs = tabConfigs.map(tab => {
    return {
      active: false,
      ...tab,
    }
  })

  setTabConfigs([...deactivatedTabs, newConfig])
}

export const EditorPage: React.FunctionComponent = () => {
  const [hasLoadedEditor, setHasLoadedEditor] = React.useState(false)
  const [activeTab, handleChangeTab] = React.useState('HOME')
  const [tabConfigs, setTabConfigs] = React.useState([] as TabConfig[])
  const [modalVisible, setModalVisible] = React.useState(false)

  if (!hasLoadedEditor) {
    tabConfigs.push(
      genTabConfig({
        activeTab,
        handleChangeTab,
        displayText: 'Home',
        tabIdentifier: activeTab,
      }),
    )
    loadEditor(setHasLoadedEditor)
  }

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasBackground flexColumn>
        <FlexContainerBasic hasBackground flexColumn hasPadding>
          <PortalProvider>
            <Level>
              <LevelLeft>
                <H3>Site Builder</H3>
              </LevelLeft>
              <LevelRight>
                <Button variant="primary" type="button" onClick={() => setModalVisible(true)}>
                  Add page
                </Button>
              </LevelRight>
            </Level>
            <Modal
              tapOutsideToDissmiss
              visible={modalVisible}
              afterClose={() => setModalVisible(false)}
              title="Modal Title"
            >
              <Formik
                initialValues={{ pageName: '' }}
                onSubmit={({ pageName }) => {
                  addNewPage(pageName, tabConfigs, setTabConfigs, handleChangeTab)
                }}
              >
                {() => (
                  <Form>
                    <Input
                      id="pageName"
                      type="text"
                      placeholder="Page name here"
                      name="pageName"
                      labelText="Page Name"
                      required
                    />
                  </Form>
                )}
              </Formik>
            </Modal>
          </PortalProvider>
          <Tabs tabConfigs={tabConfigs} />
        </FlexContainerBasic>
        <div id={DEFAULT_IDENTIFIER}></div>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default EditorPage
