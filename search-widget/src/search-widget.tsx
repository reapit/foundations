import React from 'react';
import styled, { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    backgroundColor: '#00a569',
    titleColor: 'white',
    buttonTextColor: 'gray',
    buttonBackgroundColor: 'white',
    inputTextColor: 'gray',
    inputBackgroundColor: 'white',
  },
  font: {
    baseFontSize: '1rem',
    fontFamily: 'inherit',
    headingFontSize: ''
  }
}
const WidgetContainer = styled.div`
  background-color: ${props => props.theme.colors.backgroundColor };
  display: inline-block;
  width: 50rem;
  padding: 2rem 0;
  text-align: center;
  margin: auto 0;
  font-family: ${props => props.theme.font.fontFamily};
`

const Title = styled.div`
  color: ${props => props.theme.colors.titleColor };
  font-size: 2.5rem;
  margin: 0.7rem;
  font-family: inherit;
`

const Button = styled.button`
  width: 40%;
  height: 3rem;
  color: ${props => props.theme.colors.buttonTextColor };
  font-size: 1rem;
  background: ${props => props.theme.colors.buttonBackgroundColor };
  font-family: ${props => props.theme.font.fontFamily};
`

const ButtonContainer = styled.div`
  margin: 0.7rem;
`

const Input = styled.input`
  height: 3rem;
  width: 80%;
  font-size: 2rem;
  text-align: center;
  font-weight: 150;
  background: ${props => props.theme.colors.inputBackgroundColor };
  margin: 0.7rem;
  color: ${props => props.theme.colors.inputTextColor };
  font-family: ${props => props.theme.font.fontFamily};
`

const API_KEY = 'Bearer eyJraWQiOiJTSGNVVnpHamIyQXFFSW9MSFpEbHVwR0hHUlwvTmlLKzN0dTEybm5JcXZMOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5ZTQxZTlkNC1kMmY1LTRjZmMtOTcwYi0zNjE5Y2JmNGI1MWEiLCJldmVudF9pZCI6IjliNDg1NDk1LTEwZDUtNDkwNy1hODFhLTc5MzJhYzVkZWFiMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NzA2MTE4MDgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0yX0loRUh6U1Q3YiIsImV4cCI6MTU3MDY4MjQwMiwiaWF0IjoxNTcwNjc4ODAyLCJqdGkiOiJiYjkyYWVmYS00NjUxLTQxZmEtOWU3Mi1mNDgwNmFhMTJmZGUiLCJjbGllbnRfaWQiOiI1dHZnc2sxdTA2YnB1bWJsb2ZiN2s4bGU5ZCIsInVzZXJuYW1lIjoiOWU0MWU5ZDQtZDJmNS00Y2ZjLTk3MGItMzYxOWNiZjRiNTFhIn0.LxNnkgZI4_aHGaO4n6_QHNDGqffNxHjx4dCLTHandBgwLhR8fTZsaW_M9u3dXVGz3ZZtWY0R0NrzHqJAUg3J-g5rc4CMp-5f03kRduNCiULikBPYK4xdpaxXrvoTn2KhRM1tvfIGXYgv-Nwo289y93fZtU-UCqN_IBu2IpRILQStrYukt_8P6vMx-_0PlG9wUzujIVJ2XpgWvRU9cPgEm0hIRqN0W1jEH5kaYjeVEsxMamiQaw8KjFvbDAtkV_-yySfPNQwXXlJwXgz5XxgYC6yhlzn4y3WOPrbl2I2B8g94zImT8iLFmz_mrHNIi8cH68jnUguVFhfGem70m5s4hw'

const SEARCH_FOR_SALE_API = 'https://reapit.cloud.tyk.io/properties?PageSize=10&MarketingMode=sale&MarketingMode=sellingAndLetting&InternetAdvertising=true&SellingStatuses=forSale&SellingStatuses=underOffer&Address='
const SEARCH_TO_RENT_API = 'https://reapit.cloud.tyk.io/properties?PageSize=10&MarketingMode=letting&MarketingMode=sellingAndLetting&InternetAdvertising=true&LettingStatuses=forLet&LettingStatuses=underOffer&Address='

export type SearchForSaleParams = {
  setSearching: (value: boolean) => void
  inputValue: string
}

export const searchForSale = ({ setSearching, inputValue }: SearchForSaleParams) => async (event: any) => {
  setSearching(true)
  try{
    const response = await fetch(`${SEARCH_FOR_SALE_API}${inputValue}`, {
      headers: {
        Authorization: API_KEY
      }
    }
  )
    const result = await response.json()
    console.log(result)
    setSearching(false)
    return
  } catch (err) {
    console.log(err)
    setSearching(false)
  }
}

export type SearchToRentParams = {
  setSearching: (value: boolean) => void
  inputValue: string
}

export const searchToRent = ({ setSearching, inputValue }: SearchToRentParams) => async (event: React.SyntheticEvent) => {
  setSearching(true)
  try{
    const response = await fetch(`${SEARCH_TO_RENT_API}${inputValue}`, {
        headers: {
          Authorization: API_KEY
        }
      }
    )
    const result = response.json()
    console.log(result)
    setSearching(false)
  } catch (err) {
    console.log(err)
    setSearching(false)
  }
}

export const handleInputChange = (setInputValue: (value: string) => void) => (e: any) => {
  const value = e.target.value
  setInputValue(value)
}


const SearchWidget: React.FC = () => {
  const [isSearching, setSearching] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  return (
    // @ts-ignore
    <ThemeProvider theme={window.theme || theme}>
      <WidgetContainer>
      <Title>Find your perfect home</Title>
        <Input onChange={handleInputChange(setInputValue)} name="search" placeholder="enter your town or postcode"/>
        <ButtonContainer>
          <Button onClick={searchForSale({setSearching, inputValue})} disabled={isSearching}>FOR SALE</Button>
          <Button onClick={searchToRent({setSearching, inputValue})} disabled={isSearching}>TO RENT</Button>
        </ButtonContainer>
      </WidgetContainer>
    </ThemeProvider>
  );
}

export default SearchWidget;
