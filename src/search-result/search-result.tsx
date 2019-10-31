import * as React from 'react'
import Loader from '../loader'
import { AddressModel, PropertyModel } from '../types/property'
import styled from 'styled-components'
import { context } from '../context'
import { FaBed, FaToilet } from 'react-icons/fa'
import { ImgHandleError } from './img-handle-error'
import { SearchType } from '../hooks/search-store'

const { useContext } = React
const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0
})

const SearchResultContainer = styled.div`
  background: ${props => props.theme.colors.background};
`

const clampTextOneLineStyles = `
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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

    padding-bottom: 2.5rem;
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

const ImageFlag = styled.div`
  background: #00a569;
  text-align: center;
  position: absolute;
  width: 200px;
  padding: 20px;
  top: 30px;
  right: -60px;
  transform: rotate(45deg);
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
`

const AddressPrimaryText = styled.span`
  font-size: 18px;
  font-weight: bold !important;
  margin-right: 5px;
`

const AddressSecondaryText = styled.div`
  hyphens: auto;
  display: contents;
  color: ${props => props.theme.colors.secondary};

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 65px;
  line-height: 22px;
  font-size: 18px;
`

const PricingText = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
  font-weight: bold;
  ${clampTextOneLineStyles}
`

const NumBedTypeStyleText = styled.div`
  font-weight: bold;
  font-size: 18px;
  ${clampTextOneLineStyles}
`

const DescriptionText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  max-width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 130px;
  font-size: 16px;
  line-height: 22px;
`

const IconContainer = styled.div`
  color: ${props => props.theme.colors.icon};
  display: flex;
  align-items: center;

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
  margin-top: 0px !important;
  width: 100%;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`

export const combineAdress = (address: AddressModel | undefined): string => {
  if (!address) {
    return ''
  }

  const { line2, line3, line4, postcode } = address
  let addressString = ''
  const addressParts = [line2, line3, line4, postcode]
  for (let i = 0; i <= addressParts.length; i++) {
    addressString += addressParts[i] || ''
    if (addressParts[i + 1] && addressParts[i + 1] !== '') {
      addressString += ', '
    }
  }

  return addressString
}

export const formatPriceAndQuantifier = (price: number, quantifier: string) => {
  const formattedPrice = currencyFormatter.format(price)
  switch (quantifier) {
    case 'askingPrice':
      return formattedPrice
    case 'priceOnApplication':
      return 'POA'
    case 'guidePrice':
      return `Guide Price ${formattedPrice}`
    case 'offersInRegion':
      return `OIRO ${formattedPrice}`
    case 'offersOver':
      return `Offers Over ${formattedPrice}`
    case 'offersInExcess':
      return `OIEO ${formattedPrice}`
    case 'fixedPrice':
      return `Fixed Price ${formattedPrice}`
    case 'priceReducedTo':
      return formattedPrice
    default:
      return price + ' ' + quantifier
  }
}

export const getPrice = (result: PropertyModel, searchType: SearchType) => {
  if (searchType === 'Rent') {
    const rent = (result && result.letting && result.letting.rent) || 0
    const rentFrequency =
      (result && result.letting && result.letting.rentFrequency) || ''
    return `${rent}' '${rentFrequency}`
  }

  const price = (result && result.selling && result.selling.price) || 0
  const qualifier = (result && result.selling && result.selling.qualifier) || ''
  return formatPriceAndQuantifier(price, qualifier)
}

export const formatType = (style: string) => {
  switch (style) {
    case 'house':
      return 'House'
    case 'bungalow':
      return 'Bungalow'
    case 'flatApartment':
      return 'Flat/Apartment'
    case 'maisonette':
      return 'Maisonette'
    case 'land':
      return 'Land'
    case 'farm':
      return 'Farm'
    case 'developmentPlot':
      return 'Development Plot'
    case 'cottage':
      return 'Cottage'
    default:
      return style
  }
}

export const formatStyle = (style: string) => {
  switch (style) {
    case 'terraced':
      return 'Terraced'
    case 'endTerrace':
      return 'End of Terrace'
    case 'detached':
      return 'Detached'
    case 'semiDetached':
      return 'Semi Detached'
    case 'linkDetached':
      return 'Link Detached'
    case 'basement':
      return 'Basement'
    case 'groundFloor':
      return 'Ground floor'
    case 'firstFloor':
      return 'First floor'
    case 'upperFloor':
      return 'Upper floor'
    case 'upperFloorWithLift':
      return 'Upper floor with lift'
    default:
      return style
  }
}

export const combineNumberBedTypeStyle = (result: PropertyModel) => {
  const style = ((result && result.style) || []).map(formatStyle).join(' ')
  const type = ((result && result.type) || []).map(formatType).join(' ')
  const numberBedRoom = (result && result.bedrooms) || 0
  return numberBedRoom + ' Bed ' + style + ' ' + type
}

export const SearchResult = () => {
  const searchStore = useContext(context)

  if (!searchStore) {
    return <div />
  }

  const {
    isLoading,
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
      <SearchResultItemContainer>
        {resultArr.map((property: PropertyModel) => {
          const id = (property && property.id) || ''
          const propertyImage = propertyImages[id]
          const imageUrl =
            (propertyImage && propertyImage.url) ||
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88xYAAssB20Ea4T8AAAAASUVORK5CYII='

          const sellingStatus =
            (property && property.selling && property.selling.status) || ''
          const lettingStatus =
            (property && property.letting && property.letting.status) || ''
          const selectedPropertyId =
            (selectedProperty && selectedProperty.id) || ''

          const isSelectedProperty = property.id === selectedPropertyId

          const onClick = () => {
            setSelectedProperty(property)
          }

          return (
            <SearchResultItemDiv key={property.id} onClick={onClick}>
              <SearchResultImageContainer
                isSelectedProperty={isSelectedProperty}
              >
                {sellingStatus === 'underOffer' && (
                  <ImageFlag>Under Offer</ImageFlag>
                )}
                {lettingStatus === 'underOffer' && (
                  <ImageFlag>Let Agreed</ImageFlag>
                )}
                <ImgHandleError src={imageUrl} />
              </SearchResultImageContainer>
              <div>
                <AddressSecondaryText>
                  <AddressPrimaryText>
                    {(property && property.address && property.address.line1) ||
                      ''}
                  </AddressPrimaryText>
                  {combineAdress(property.address)}
                </AddressSecondaryText>
              </div>
              <PricingText>{getPrice(property, searchType)}</PricingText>
              <NumBedTypeStyleText>
                {combineNumberBedTypeStyle(property)}
              </NumBedTypeStyleText>
              <DescriptionText>{property.description}</DescriptionText>
              <IconContainer>
                <FaBed /> {(property && property.bedrooms) || 0}
                <FaToilet /> {(property && property.bathrooms) || 0}
              </IconContainer>
            </SearchResultItemDiv>
          )
        })}
      </SearchResultItemContainer>
    </SearchResultContainer>
  )
}
