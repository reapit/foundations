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
import { initializeEditor } from '../../core/editor'

export const DEFAULT_IDENTIFIER = 'HOME'
export const LOCAL_STORAGE_KEY = 'REAPIT_SITE_BUILDER_PAGES'

export interface TabConfigParams {
  activeTab: string
  tabs: string[]
  handleChangeTab: React.Dispatch<React.SetStateAction<string>>
  setEditor: React.Dispatch<React.SetStateAction<any>>
  editor: any
}

export interface AddNewTabParams {
  tabIdentifier: string
  tabs: string[]
  setTabs: React.Dispatch<React.SetStateAction<string[]>>
}

export const loadEditor = async (setEditor: React.Dispatch<React.SetStateAction<any>>, identifier: string) => {
  const editor = await initializeEditor({ identifier })
  initializeBlocks(editor)
  setEditor(editor)
}

export const genTabConfig = ({ activeTab, tabs, handleChangeTab, setEditor, editor }: TabConfigParams): TabConfig[] =>
  tabs.map(tab => {
    const tabIdentifier = tab.toUpperCase()
    return {
      tabIdentifier,
      displayText: tab,
      onTabClick: () => {
        handleChangeTab(tabIdentifier)
        editor.destroy()
        setEditor(null)
      },
      active: activeTab === tabIdentifier,
    }
  })

export const setTabsLocalStorage = (tabs: string[]) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabs))
}

export const getTabsLocalStorage = (): string[] => {
  try {
    const tabs = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (tabs) {
      return JSON.parse(tabs)
    }
    return [DEFAULT_IDENTIFIER]
  } catch {
    console.error('Failed to get tabs from local storage')
    return [DEFAULT_IDENTIFIER]
  }
}

export const addNewPage = ({ tabIdentifier, tabs, setTabs }: AddNewTabParams) => {
  const newTabs = [...tabs, tabIdentifier.toUpperCase()]
  setTabs(newTabs)
  setTabsLocalStorage(newTabs)
}

export const EditorPage: React.FunctionComponent = () => {
  const restoredTabs = getTabsLocalStorage()
  const [editor, setEditor] = React.useState(null)
  const [activeTab, handleChangeTab] = React.useState(DEFAULT_IDENTIFIER)
  const [tabs, setTabs] = React.useState(restoredTabs)
  const [modalVisible, setModalVisible] = React.useState(false)

  if (!editor) {
    loadEditor(setEditor, activeTab)
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
                initialValues={{ tabIdentifier: '' }}
                onSubmit={({ tabIdentifier }) => {
                  addNewPage({ setTabs, tabIdentifier, tabs })
                  setModalVisible(false)
                }}
              >
                {() => (
                  <Form>
                    <Input
                      id="tabIdentifier"
                      type="text"
                      placeholder="Page name here"
                      name="tabIdentifier"
                      labelText="Page Name"
                      required
                    />
                  </Form>
                )}
              </Formik>
            </Modal>
          </PortalProvider>
          <Tabs tabConfigs={genTabConfig({ activeTab, tabs, handleChangeTab, setEditor, editor })} />
        </FlexContainerBasic>
        <div id={activeTab.toLowerCase()} />
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default EditorPage
