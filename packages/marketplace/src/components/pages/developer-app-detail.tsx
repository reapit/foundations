import * as React from 'react'
import { Grid, GridItem } from '@reapit/elements'

type DeveloperAppDetailProps = {}

const DeveloperAppDetail: React.FC<DeveloperAppDetailProps> = () => {
  return (
    <Grid>
      <GridItem>
        <Grid>
          <GridItem>Avatar</GridItem>
          <GridItem>Title</GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <Grid>
          <GridItem>SideBar</GridItem>
          <GridItem>Description</GridItem>
        </Grid>
      </GridItem>
    </Grid>
  )
}

export default DeveloperAppDetail
