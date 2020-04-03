const variantA = {
  itemBackgroundColor: '#ececec',
  itemBackgroundColorHover: 'white',
  navigateButtonColor: 'pink',
}

const params = new URLSearchParams(window.location.search)

const variant = params.get('variant')

switch (variant) {
  case 'A':
    window.theme = variantA
    break
  default:
    window.theme = {}
}
