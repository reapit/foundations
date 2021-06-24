import React, { FC, useState } from 'react'
import { UseNavMobileSubMenuStory } from '../nnav/use-nav.stories'
import { SecondaryNav, SecondaryNavItem } from '../secondary-nav'
import { NavStateProvider } from '../../hooks/use-nav-state'
import { MediaStateProvider } from '../../hooks/use-media-query'
import { FlexContainer, MainContainer, Molecule, PageContainer, SecondaryNavContainer } from '.'
import { GridDemoBlock } from '../grid/grid.stories'
import { Grid, Col } from '../grid'

export const LayoutCompleteExample: FC = () => {
  const [selectedItem, setSelectedItem] = useState(1)

  return (
    <NavStateProvider>
      <MediaStateProvider>
        <MainContainer>
          <UseNavMobileSubMenuStory />
          <FlexContainer>
            <SecondaryNavContainer>
              <SecondaryNav>
                <SecondaryNavItem active={selectedItem === 1} onClick={() => setSelectedItem(1)}>
                  App List
                </SecondaryNavItem>
                <SecondaryNavItem active={selectedItem === 2} onClick={() => setSelectedItem(2)}>
                  Create App
                </SecondaryNavItem>
              </SecondaryNav>
            </SecondaryNavContainer>
            <PageContainer>
              <Molecule>
                <GridDemoBlock />
              </Molecule>
              <Grid>
                <Col>
                  <FlexContainer>
                    <Molecule>
                      <GridDemoBlock />
                    </Molecule>
                    <Molecule>
                      <GridDemoBlock />
                    </Molecule>
                  </FlexContainer>
                </Col>
                <Col>
                  <FlexContainer>
                    <Molecule>
                      <GridDemoBlock />
                    </Molecule>
                    <Molecule>
                      <GridDemoBlock />
                    </Molecule>
                  </FlexContainer>
                </Col>
                <Col>
                  <FlexContainer>
                    <Molecule>
                      <GridDemoBlock />
                    </Molecule>
                    <Molecule>
                      <GridDemoBlock />
                    </Molecule>
                  </FlexContainer>
                </Col>
                <Col>
                  <FlexContainer>
                    <Molecule>
                      <GridDemoBlock />
                    </Molecule>
                    <Molecule>
                      <GridDemoBlock />
                    </Molecule>
                  </FlexContainer>
                </Col>
                <Col>
                  <Molecule>
                    <GridDemoBlock />
                  </Molecule>
                </Col>
                <Col>
                  <Molecule>
                    <GridDemoBlock />
                  </Molecule>
                </Col>
                <Col>
                  <Molecule>
                    <GridDemoBlock />
                  </Molecule>
                </Col>
                <Col>
                  <Molecule>
                    <GridDemoBlock />
                  </Molecule>
                </Col>
              </Grid>
              <Molecule>
                <GridDemoBlock />
              </Molecule>
            </PageContainer>
          </FlexContainer>
        </MainContainer>
      </MediaStateProvider>
    </NavStateProvider>
  )
}
