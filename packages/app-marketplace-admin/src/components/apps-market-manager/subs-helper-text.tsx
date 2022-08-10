import { AppsBrowseConfigEnum } from '@reapit/foundations-ts-definitions'
import React, { FC } from 'react'
import { BodyText } from '@reapit/elements'

interface HelperTextProps {
  type: AppsBrowseConfigEnum
}

export const SubsHelperText: FC<HelperTextProps> = ({ type }) => {
  switch (type) {
    case AppsBrowseConfigEnum.FEATURED_HERO:
      return (
        <>
          <BodyText hasGreyText>
            Featured Hero apps are the first thing you will see in on the browse apps page and therefore the most
            prominant and important. There should be only 1 Featured Hero set to live at any given time.
          </BodyText>
        </>
      )

    case AppsBrowseConfigEnum.HERO:
      return (
        <>
          <BodyText hasGreyText>
            Hero apps are of secondary prominance to the Featured Hero. There should only be 2 Heros set to live at any
            given time
          </BodyText>
        </>
      )

    case AppsBrowseConfigEnum.FILTERS:
      return (
        <>
          <BodyText hasGreyText>
            App Filters are tiles that on the user clicking, set a pre-defined set of filters is applied to the page
            which will then render the filtered results as a related collection.
          </BodyText>
          <BodyText hasGreyText>
            You can have any number of Filter Collections live however, 6 is advised in line with the design.
          </BodyText>
        </>
      )

    case AppsBrowseConfigEnum.FEATURED:
      return (
        <>
          <BodyText hasGreyText>
            Featured apps are lists of apps, grouped as a collection that sit below the filter collections typically.
            They have slightly larger tiles and slightly greater prominence than Simple Apps.
          </BodyText>
          <BodyText hasGreyText>
            You can add as many to a collection as you like however, the list will be paginatied by the UI at some
            resolutions in line with the design. All apps selected will be returned when hitting the See All link.
          </BodyText>
        </>
      )

    case AppsBrowseConfigEnum.SIMPLE:
      return (
        <>
          <BodyText hasGreyText>
            Simple apps behave almost identically to featured apps however, they are of slightly less prominence on the
            page.
          </BodyText>
          <BodyText hasGreyText></BodyText>
        </>
      )
  }
}

export const ModalHelperText: FC<HelperTextProps> = ({ type }) => {
  switch (type) {
    case AppsBrowseConfigEnum.FEATURED_HERO:
    case AppsBrowseConfigEnum.HERO:
      return (
        <>
          <BodyText hasGreyText>Featured Hero and Hero apps, should be confgured to include;</BodyText>
          <BodyText hasGreyText>- A title, to sit above the Hero Item</BodyText>
          <BodyText hasGreyText>- An app specified from the apps search and select box</BodyText>
          <BodyText hasGreyText>- A brand colour as a hex colour selected in the colour picker</BodyText>
          <BodyText hasGreyText>- A marketing strapline to sit below the icon of the App</BodyText>
          <BodyText hasGreyText>
            - An image uploaded that looks good at all resolutions. You should test this by re-sizing the browser from
            mobile to widescreen
          </BodyText>
        </>
      )

    case AppsBrowseConfigEnum.FILTERS:
      return (
        <>
          <BodyText hasGreyText>App Filters should be configured to include;</BodyText>
          <BodyText hasGreyText>
            - A set of filters eg categories, or named apps that you want to return when the tile is clicked on. The
            simplest way to do this is to specify exactly the apps you want in the collection by name.
          </BodyText>
          <BodyText hasGreyText>- A title that describes the collection</BodyText>
          <BodyText hasGreyText>- A marketing strapline</BodyText>
          <BodyText hasGreyText>- A suitable icon from the dropdown list</BodyText>
        </>
      )

    case AppsBrowseConfigEnum.FEATURED:
    case AppsBrowseConfigEnum.SIMPLE:
      return (
        <>
          <BodyText hasGreyText>Featured and simple apps should be configured to include;</BodyText>
          <BodyText hasGreyText>
            - A set of filters eg categories, or named apps that you want to return when the See All link is clicked on.
            The simplest way to do this is to specify exactly the apps you want in the collection by name.
          </BodyText>
          <BodyText hasGreyText>- A title that describes the collection</BodyText>
        </>
      )
  }
}
