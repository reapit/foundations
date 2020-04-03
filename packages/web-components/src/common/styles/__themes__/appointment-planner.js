const variantA = {
  hoverBackgroundColor: 'green',
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
