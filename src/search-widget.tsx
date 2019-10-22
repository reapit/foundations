import React, { useState } from 'react';
import { Loader } from './loader'
import styled, { ThemeProvider } from 'styled-components'
import { oc } from 'ts-optchain';
import { Theme } from './theme'
import { API_URL, IMAGE_API_URL } from './constants'

import { useSearchStore } from './hooks/search-store'
import { SearchResult } from './search-result'
import { context } from './context'
import { PropertyModel } from './types/property';
import { PagedResultPropertyImageModel_, PropertyImageModel } from './types/propertyImage';
import { GoogleMap } from './map/google-map'
import { createPortal } from 'react-dom'

const BaseStyle = styled.div`
  color: ${props => props.theme.colors.base};
  font-size: ${props => props.theme.base.font.sizes.base};
  font-family: ${props => props.theme.base.font.family};


  & h1 {
    font-size: ${props => props.theme.base.font.sizes.headings.h1};
  }

  & h2 {
    font-size: ${props => props.theme.base.font.sizes.headings.h2};
  }

  & h3 {
    font-size: ${props => props.theme.base.font.sizes.headings.h3};
  }

  & h4 {
    font-size: ${props => props.theme.base.font.sizes.headings.h4};
  }

  & h5 {
    font-size: ${props => props.theme.base.font.sizes.headings.h5};
  }

  & h6 {
    font-size: ${props => props.theme.base.font.sizes.headings.h6};
  }
`

const WidgetContainer = styled.div`
  background-color: ${props => props.theme.colors.primary};
  display: inline-block;
  width: 50rem;
  padding: 2rem 0;
  text-align: center;
  margin: auto 0;
`

const Title = styled.h1`
  color: ${props => props.theme.colors.widgetHeading};
  margin: 0.7rem;
  font-family: inherit;
`

const Button = styled.button`
  width: 40%;
  height: 3rem;
  color: ${props => props.theme.button.color};
  font-size: 1rem;
  background: ${props => props.theme.button.background};
  font-family: inherit;
`

const ButtonContainer = styled.div`
  margin: 0.7rem;
  color: ${props => props.theme.colors.base};
`

const Input = styled.input`
  padding: 1rem;
  width: 80%;
  font-size: 2rem;
  text-align: center;
  font-weight: 150;
  background: ${props => props.theme.colors.inputBackgroundColor};
  margin: 0.7rem;
  color: ${props => props.theme.colors.base};
  font-family: inherit;
`

const SearchResultContainer = styled.div`
  display: flex;

  @media screen and (max-width: 1600px) {
    & {
      flex-direction: column;
    }
  }
`


export type TabItem = 'SEARCH_RESULT' | 'MAP'

const Tab = styled.div<{ isActive: boolean }>`
  padding: 1rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  border-width: ${props => props.isActive ? '3px' : '1px'}
`

const TabContent = styled.div<{ isActive: boolean }>`
  width: 100%;
  @media screen and (max-width: 1600px) {
    & {
      display: ${props => props.isActive ? 'block' : 'none'};

    }
  }
`

const TabContainer = styled.div`
  display: flex;

  @media screen and (min-width: 1601px) {
    display: none;
  }
`

const SearchWidget: React.FC<{ API_KEY: string, theme: Theme }> = ({ API_KEY, theme }) => {
  const [searchKeyword, _setSearchKeyword] = useState('')
  const searchStore = useSearchStore()
  const { setSelectedProperty, setFetchResult, setFetchError, setStartFetching, setPropertyImages, isLoading, selectedProperty, result } = searchStore

  const [activeTab, setActiveTab] = useState<TabItem>('MAP')


  const getPropertyImages = async (result: PropertyModel[]) => {
    const propertyIds = result.map(property => oc(property).id(''))

    const url = new URL(IMAGE_API_URL)
    url.searchParams.append('propertyId', propertyIds.join(','))

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: API_KEY
      },
    }
    )

    const parsedResponse: PagedResultPropertyImageModel_ = await response.json()
    if (!parsedResponse.data) {
      return {}
    }

    const imageMap: Record<string, PropertyImageModel> = {}
    for (let propertyImage of parsedResponse.data) {
      const propertyId = oc(propertyImage).propertyId('invalid')
      imageMap[propertyId] = propertyImage
    }


    return imageMap
  }


  const searchForSale = async () => {
    setSelectedProperty(null)
    setStartFetching()

    const url = new URL(API_URL)
    url.searchParams.append('SellingStatuses', ['forSale', 'underOffer'].join(','))
    url.searchParams.append('InternetAdvertising', "true")
    url.searchParams.append('PageSize', '8')
    url.searchParams.append('marketingMode', ['selling', 'sellingAndLetting'].join(','))
    url.searchParams.append('Address', searchKeyword)

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: API_KEY
        }
      }
      )
      const result = await response.json()

      const propertyImages = await getPropertyImages(result.data)
      setPropertyImages(propertyImages)
      setFetchResult(result, propertyImages, searchKeyword, 'Sale')
    } catch (err) {
      console.log(err)
      setFetchError(err)
    }
  }

  const searchToRent = async () => {
    setSelectedProperty(null)
    setStartFetching()

    const url = new URL('https://reapit.cloud.tyk.io/properties')
    url.searchParams.append('LettingStatuses', ['toLet', 'underOffer'].join(','))
    url.searchParams.append('internetAdvertising', "true")
    url.searchParams.append('PageSize', '8')
    url.searchParams.append('marketingMode', ['letting', 'sellingAndLetting'].join(','))
    url.searchParams.append('Address', searchKeyword)

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: API_KEY
        }
      }
      )
      const result = await response.json()
      const propertyImages = await getPropertyImages(result.data)
      setPropertyImages(propertyImages)
      setFetchResult(result, propertyImages, searchKeyword, 'Rent')
    } catch (err) {
      console.log(err)
      setFetchError(err)
    }
  }

  const searchResultContainer = document.getElementById('search-result-container')
  const onTabMapClick = () => setActiveTab('MAP')
  const onTabSearchResultClick = () => setActiveTab('SEARCH_RESULT')



  return (
    <ThemeProvider theme={theme}>
      <BaseStyle>
        <context.Provider value={{ ...searchStore, theme }}>
          <WidgetContainer>
            <Title>Find your perfect home</Title>
            <Input onChange={(e) => {
              const value = e.target.value
              _setSearchKeyword(value)
            }} name="search" placeholder="enter your town or postcode" />
            <ButtonContainer>
              <Button onClick={searchForSale} disabled={Boolean(isLoading)}>FOR SALE</Button>
              <Button onClick={searchToRent} disabled={Boolean(isLoading)}>TO RENT</Button>
            </ButtonContainer>
          </WidgetContainer>
          {searchResultContainer && createPortal(
            <BaseStyle>
              {isLoading && <Loader />}
              {!isLoading && result &&
                <div>
                  <TabContainer>
                    <Tab onClick={onTabMapClick} isActive={activeTab === 'MAP'}>Map</Tab>
                    <Tab onClick={onTabSearchResultClick} isActive={activeTab === 'SEARCH_RESULT'}>Results</Tab>
                  </TabContainer>
                  <SearchResultContainer>
                    <TabContent isActive={activeTab === 'MAP'}>
                      <GoogleMap params={{ key: process.env.REACT_APP_MAP_API_KEY }} property={selectedProperty} />
                    </TabContent>
                    <TabContent isActive={activeTab === 'SEARCH_RESULT'}>
                      <SearchResult />
                    </TabContent>
                  </SearchResultContainer>
                </div>
              }
            </BaseStyle>
            , searchResultContainer)}
        </context.Provider>
      </BaseStyle>
    </ThemeProvider>
  );
}

export default SearchWidget;
