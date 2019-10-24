import * as React from 'react'
import Loader from '../loader'
import { oc } from 'ts-optchain'
import { AddressModel, PropertyModel } from '../types/property'
import styled from 'styled-components'
import { context } from '../context'
import { FaBed, FaToilet } from 'react-icons/fa'
import { ImgHandleError } from './img-handle-error'
import { SearchType } from '../hooks/search-store'

const { useContext } = React

const SearchResultContainer = styled.div`
  background: ${props => props.theme.colors.background};
`

const SearchResultTextContainer = styled.h1`
  color: ${props => props.theme.colors.primary};

  @media screen and (max-width: 1600px) {
    & {
      padding-top: 2.5rem;
    }
  }

  @media screen and (min-width: 1601px) {
    & {
      padding-left: 2.5rem;
    }
  }
  margin-top: 0;
  margin-bottom: 0;
`

const SearchResultItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  /* responsive desktop: 4 images */
  & > div {
    @media screen and (max-width: 1600px) {
      & {
        padding-right: 2.5rem;
      }
    }

    @media screen and (min-width: 1601px) {
      & {
        padding-left: 2.5rem;
      }
    }

    padding-top: 2.5rem;
    box-sizing: border-box;

    & > *:not(img) {
      margin-top: 0.7rem;
    }
  }

  /* 1 image in row */
  @media (max-width: 1024px) {
    & > div {
      width: 100%;
      & img {
        height: 300px;
      }
    }
  }

  /* 2 images in row */
  @media (min-width: 1024px) {
    & > div {
      width: 50%;
      & img {
        height: 250px;
      }
    }
  }

  /* 3 images in row */
  @media (min-width: 1800px) {
    & > div {
      width: 33.3%;
      & img {
        height: 8vw;
      }
    }
  }

  /* 4 images in row */
  @media (min-width: 2000px) {
    & > div {
      width: 25%;
    }
  }
`

const AddressPrimaryText = styled.span`
  margin-right: 0.7rem;
  font-weight: bold;
`

const AddressSecondaryText = styled.span`
  hyphens: auto;
  display: contents;
  color: ${props => props.theme.colors.secondary};
  font-size: 1.2rem;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 75px;
`

const PricingText = styled.span`
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
  font-weight: bold;
`

const NumBedTypeStyleText = styled.div`
  font-weight: bold;
`

const DescriptionText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  max-width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 130px;
  font-size: 1rem;
`

const IconContainer = styled.div`
  color: ${props => props.theme.colors.icon};
  display: flex;
  align-items: center;
  font-size: 1.2rem;

  svg {
    margin-right: 0.3rem;
  }

  svg:last-child {
    margin-left: 1rem;
  }
`

const SearchResultItemDiv = styled.div`
  cursor: pointer;
`

const SearchResultImageContainer = styled.div<{ isSelectedProperty: boolean }>`
  border: ${props => `2px solid ${props.theme.colors.jade}`};
  border-width: ${props => (props.isSelectedProperty ? '2px' : '0px')};
  width: 100%;
  border-radius: 5px;
`

export const combineAdress = (address: AddressModel | undefined): string => {
  if (!address) {
    return ''
  }

  const { line3, line4, postcode } = address
  let addressString = ''
  const addressParts = [line3, line4, postcode]
  for (let i = 0; i <= addressParts.length; i++) {
    addressString += addressParts[i] || ''
    if (addressParts[i + 1] && addressParts[i + 1] !== '') {
      addressString += ', '
    }
  }

  return addressString
}

export const getPrice = (result: PropertyModel, searchType: SearchType) => {
  if (searchType === 'Rent') {
    return (
      oc(result).letting.rent(0) + ' ' + oc(result).letting.rentFrequency('')
    )
  }

  return oc(result).selling.qualifier('') + ' ' + oc(result).selling.price(0)
}

export const combineNumberBedTypeStyle = (result: PropertyModel) => {
  return (
    oc(result).bedrooms(0) +
    ' ' +
    oc(result).style('') +
    ' ' +
    oc(result).type('')
  )
}

export const SearchResult = () => {
  const searchStore = useContext(context)

  if (!searchStore) {
    return <div />
  }

  const {
    isLoading,
    searchKeyWord,
    getCountResult,
    getResultArr,
    searchType,
    propertyImages,
    result: rawResult,
    selectedProperty,
    setSelectedProperty
  } = searchStore

  if (isLoading) {
    return <Loader />
  }

  const resultArr = getResultArr()

  if (!rawResult) {
    return null
  }

  return (
    <SearchResultContainer>
      <SearchResultTextContainer>
        {getCountResult()} Results showing for {searchKeyWord}, for {searchType}
      </SearchResultTextContainer>
      <SearchResultItemContainer>
        {resultArr.map(property => {
          const id = oc(property).id('')
          const propertyImage = propertyImages[id]
          const imageUrl = oc(propertyImage).url(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88xYAAssB20Ea4T8AAAAASUVORK5CYII='
          )

          const selectedPropertyId = oc(selectedProperty).id('')
          const isSelectedProperty = property.id === selectedPropertyId

          const onClick = () => {
            setSelectedProperty(property)
          }

          return (
            <SearchResultItemDiv key={property.id} onClick={onClick}>
              <SearchResultImageContainer
                isSelectedProperty={isSelectedProperty}
              >
                <ImgHandleError src={imageUrl} />
              </SearchResultImageContainer>
              <div>
                <AddressPrimaryText>
                  {oc(property).address.line2()}
                </AddressPrimaryText>
                <AddressSecondaryText>
                  {combineAdress(property.address)}
                </AddressSecondaryText>
              </div>
              <PricingText>{getPrice(property, searchType)}</PricingText>
              <NumBedTypeStyleText>
                {combineNumberBedTypeStyle(property)}
              </NumBedTypeStyleText>
              <DescriptionText>{property.description}</DescriptionText>
              <IconContainer>
                <FaBed /> {oc(property).bedrooms(0)}
                <FaToilet /> {oc(property).bathrooms(0)}
              </IconContainer>
            </SearchResultItemDiv>
          )
        })}
      </SearchResultItemContainer>
    </SearchResultContainer>
  )
}
