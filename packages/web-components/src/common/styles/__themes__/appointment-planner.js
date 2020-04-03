const variantA = {
  itemBackgroundColor: '#ececec',
  itemBackgroundColorHover: 'white',
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
