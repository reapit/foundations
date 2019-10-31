import React, { useState, useRef } from 'react'
import Loader from '../loader'
import styled, { ThemeProvider } from 'styled-components'
import { Theme } from '../theme'
import { API_URL, IMAGE_API_URL } from '../constants'
import { useSearchStore } from '../hooks/search-store'
import { SearchResult } from '../search-result'
import { context } from '../context'
import { PropertyModel } from '../types/property'
import {
  PagedResultPropertyImageModel_,
  PropertyImageModel
} from '../types/propertyImage'
import { GoogleMap } from '../map/google-map'
import { createPortal } from 'react-dom'
import scrollIntoView from '../utils/scroll-into-view'

const SearchResultTextContainer = styled.h1`
  color: ${props => props.theme.colors.searchResult};

  @media screen and (max-width: 1600px) {
    & {
      padding-top: 2rem;
    }
  }

  padding-bottom: 2rem;

  margin-top: 0;
  margin-bottom: 0;
`

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
  background-color: ${props => props.theme.searchWidget.backgroundColor};
  display: inline-block;
  min-width: 40rem;
  padding: 1.5rem 0;
  text-align: center;
  margin: auto 0;
`

const Error = styled.div`
  color: white;
  font-size: 0.8rem;
  text-align: left;
  margin-left: 1rem;
`

const Title = styled.h1`
  color: ${props => props.theme.colors.widgetHeading};
  font-family: inherit;
  margin: 0rem;
`

const Subtitle = styled.div`
  color: ${props => props.theme.colors.widgetHeading}
  font-style: italic;
  font-size: 1rem;
  margin: 0.5rem 0rem 2rem 0rem;
`

const Button = styled.button`
  height: 3rem;
  color: ${props => props.theme.button.color};
  font-size: 1rem;
  background: ${props => props.theme.button.background};
  font-family: inherit;
  margin-left: 1rem;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.3);
  border: none;
  font-weight: bold;
  padding: 0.7rem;
  min-width: 6rem;
`

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  color: ${props => props.theme.colors.base};
`

const Input = styled.input`
  border: none;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
  width: 60%;
  font-size: 1rem;
  text-align: center;
  font-weight: 150;
  background: ${props => props.theme.colors.inputBackgroundColor};
  color: ${props => props.theme.colors.base};
  font-family: inherit;
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
  &:focus::-moz-placeholder {
    color: transparent;
  }
  &:focus::-moz-placeholder {
    color: transparent;
  }
  &:focus {
    border-color: ${props => props.theme.button.background};
    outline-color: ${props => props.theme.button.background};
  }
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
  border-width: ${props => (props.isActive ? '3px' : '1px')};
`

const TabContent = styled.div<{ isActive: boolean }>`
  width: 100%;
  @media screen and (max-width: 1600px) {
    & {
      display: ${props => (props.isActive ? 'block' : 'none')};
    }
  }
`

const TabContainer = styled.div`
  display: flex;

  @media screen and (min-width: 1601px) {
    display: none;
  }
`

const SearchWidget: React.FC<{ API_KEY: string; theme: Theme }> = ({
  API_KEY,
  theme
}) => {
  const [searchKeyword, _setSearchKeyword] = useState('')
  const searchStore = useSearchStore()
  const {
    searchKeyWord,
    searchType,
    getCountResult,
    setSelectedProperty,
    setFetchResult,
    setFetchError,
    setStartFetching,
    setPropertyImages,
    isLoading,
    selectedProperty,
    result
  } = searchStore

  const [activeTab, setActiveTab] = useState<TabItem>('MAP')
  const [error, setError] = useState<string>('')
  const searchInputRef = useRef(null)

  const getPropertyImages = async (result: PropertyModel[]) => {
    const propertyIds = result.map(
      (property: PropertyModel) => property && property.id
    )

    const url = new URL(IMAGE_API_URL)
    url.searchParams.append('propertyIds', propertyIds.join(','))

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: API_KEY
      }
    })

    const parsedResponse: PagedResultPropertyImageModel_ = await response.json()
    if (!parsedResponse.data) {
      return {}
    }

    const imageMap: Record<string, PropertyImageModel> = {}
    for (let propertyImage of parsedResponse.data) {
      const propertyId = (propertyImage && propertyImage.id) || 'invalid'
      imageMap[propertyId] = propertyImage
    }

    return imageMap
  }

  const searchForSale = async () => {
    if (error) {
      setError('')
    }
    if (searchKeyword === '') {
      setError('*Please enter an area')
      //@ts-ignore
      searchInputRef.current.focus()
      return
    }
    setSelectedProperty(null)
    setStartFetching()
    const resultElement = document.getElementById('search-result-container')
    if (resultElement) {
      const scrollingElement =
        document.scrollingElement || document.documentElement
      scrollIntoView(
        scrollingElement,
        'scrollTop',
        '',
        0,
        resultElement.offsetTop,
        500,
        true
      )
    }
    const url = new URL(API_URL)
    url.searchParams.append(
      'SellingStatuses',
      ['forSale', 'underOffer'].join(',')
    )
    url.searchParams.append('InternetAdvertising', 'true')
    url.searchParams.append('PageSize', '8')
    url.searchParams.append(
      'marketingMode',
      ['selling', 'sellingAndLetting'].join(',')
    )
    url.searchParams.append('Address', searchKeyword)

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: API_KEY
        }
      })
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
    if (error) {
      setError('')
    }
    if (searchKeyword === '') {
      setError('*Please enter an area')
      //@ts-ignore
      searchInputRef.current.focus()
      return
    }
    setSelectedProperty(null)
    setStartFetching()
    const resultElement = document.getElementById('search-result-container')
    if (resultElement) {
      const scrollingElement =
        document.scrollingElement || document.documentElement
      scrollIntoView(
        scrollingElement,
        'scrollTop',
        '',
        0,
        resultElement.offsetTop,
        500,
        true
      )
    }
    const url = new URL('https://reapit.cloud.tyk.io/properties')
    url.searchParams.append(
      'LettingStatuses',
      ['toLet', 'underOffer'].join(',')
    )
    url.searchParams.append('internetAdvertising', 'true')
    url.searchParams.append('PageSize', '8')
    url.searchParams.append(
      'marketingMode',
      ['letting', 'sellingAndLetting'].join(',')
    )
    url.searchParams.append('Address', searchKeyword)

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: API_KEY
        }
      })
      const result = await response.json()
      const propertyImages = await getPropertyImages(result.data)
      setPropertyImages(propertyImages)
      setFetchResult(result, propertyImages, searchKeyword, 'Rent')
    } catch (err) {
      console.log(err)
      setFetchError(err)
    }
  }

  const searchResultContainer = document.getElementById(
    'search-result-container'
  )
  const onTabMapClick = () => setActiveTab('MAP')
  const onTabSearchResultClick = () => setActiveTab('SEARCH_RESULT')

  return (
    <ThemeProvider theme={theme}>
      <BaseStyle>
        <context.Provider value={{ ...searchStore, theme }}>
          <WidgetContainer>
            <Title>Find your perfect home</Title>
            <Subtitle>Search for a property from Agent and Sons</Subtitle>
            <FormContainer>
              <Input
                ref={searchInputRef}
                onChange={e => {
                  const value = e.target.value
                  _setSearchKeyword(value)
                }}
                name="search"
                placeholder="e.g Town or Postcode"
              />
              <Button onClick={searchForSale} disabled={Boolean(isLoading)}>
                FOR SALE
              </Button>
              <Button onClick={searchToRent} disabled={Boolean(isLoading)}>
                TO RENT
              </Button>
            </FormContainer>
            {error !== '' && <Error>{error}</Error>}
          </WidgetContainer>
          {searchResultContainer &&
            createPortal(
              <BaseStyle>
                {isLoading && <Loader />}
                {!isLoading && result && (
                  <div>
                    <TabContainer>
                      <Tab
                        onClick={onTabMapClick}
                        isActive={activeTab === 'MAP'}
                      >
                        Map
                      </Tab>
                      <Tab
                        onClick={onTabSearchResultClick}
                        isActive={activeTab === 'SEARCH_RESULT'}
                      >
                        Results
                      </Tab>
                    </TabContainer>
                    <SearchResultTextContainer>
                      {getCountResult()} Results showing for {searchKeyWord},
                      for {searchType}
                    </SearchResultTextContainer>
                    <SearchResultContainer>
                      <TabContent isActive={activeTab === 'MAP'}>
                        <GoogleMap
                          params={{ key: process.env.REACT_APP_MAP_API_KEY }}
                          property={selectedProperty}
                          properties={result.data || []}
                        />
                      </TabContent>
                      <TabContent isActive={activeTab === 'SEARCH_RESULT'}>
                        <SearchResult />
                      </TabContent>
                    </SearchResultContainer>
                  </div>
                )}
              </BaseStyle>,
              searchResultContainer
            )}
        </context.Provider>
      </BaseStyle>
    </ThemeProvider>
  )
}

export default SearchWidget
