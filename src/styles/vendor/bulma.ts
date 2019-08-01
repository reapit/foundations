import bulmaStyles from './bulma.scss?mod'

/**
 * This file is to map bulma CSS classes to TS. Am doing this for 2 reasons;
 * 1: camelCasing not supported in prod (purgeCSS issue) so avoids janky syntax of composing bulma["some class"]
 * 2: Better intellisense as I can import bulma from here and autocomplete on classes I want to use
 * FYI the fallback strings are just so we get nice Jest snapshots rather than a bunch of undefined
 * css classes.
 */

const bulma = {
  // Layout
  container: bulmaStyles.container || 'container',
  isRight: bulmaStyles['is-right'] || 'isRight',

  // Levels
  level: bulmaStyles.level || 'level',
  levelLeft: bulmaStyles['level-left'] || 'levelLeft',
  levelRight: bulmaStyles['level-right'] || 'levelRight',

  // Tiles
  tile: bulmaStyles.tile || 'tile',
  isParent: bulmaStyles['is-parent'] || 'isParent',
  isChild: bulmaStyles['is-child'] || 'isChild',
  isAncestor: bulmaStyles['is-ancestor'] || 'isAncestor',
  isVertical: bulmaStyles['is-vertical'] || 'isVertical',

  // Columns
  columns: bulmaStyles.columns || 'columns',
  column: bulmaStyles.column || 'column',
  isMultiLine: bulmaStyles['is-multiline'] || 'isMultiLine',
  isFullTablet: bulmaStyles['is-full-tablet'] || 'isFullTablet',
  isHalfDesktop: bulmaStyles['is-half-desktop'] || 'isHalfDesktop',
  isThirdWidescreen: bulmaStyles['is-one-third-widescreen'] || 'isThirdWidescreen',
  isQuarterFullhd: bulmaStyles['is-one-quarter-fullhd'] || 'isQuarterFullhd',

  // Utility classes
  isMedium: bulmaStyles['is-medium'] || 'isMedium',
  isRounded: bulmaStyles['is-rounded'] || 'isRounded',
  isPrimary: bulmaStyles['is-primary'] || 'isPrimary',
  isLink: bulmaStyles['is-link'] || 'isLink',
  isSecondary: bulmaStyles['is-secondary'] || 'isSecondary',
  isLoading: bulmaStyles['is-loading'] || 'isLoading',
  isDanger: bulmaStyles['is-danger'] || 'isDanger',
  isActive: bulmaStyles['is-active'] || 'isActive',
  isLarge: bulmaStyles['is-large'] || 'isLarge',
  isCentered: bulmaStyles['is-centered'] || 'isCentered',
  isCurrent: bulmaStyles['is-current'] || 'isCurrent',
  isDisabled: bulmaStyles['is-disalbed'] || 'isDisabled',
  isRelative: bulmaStyles['is-relative'] || 'isRelative',
  isHidden: bulmaStyles['is-hidden'] || 'isHidden',
  isSmall: bulmaStyles['is-small'] || 'isSmall',

  // Form
  button: bulmaStyles['button'] || 'button',
  field: bulmaStyles.field || 'field',
  input: bulmaStyles.input || 'input',
  textarea: bulmaStyles.textarea || 'textarea',
  control: bulmaStyles.control || 'control',
  delete: bulmaStyles.delete || 'delete',
  label: bulmaStyles.label || 'form',

  // Card
  card: bulmaStyles.card || 'card',
  cardImage: bulmaStyles['card-image'] || 'cardImage',
  cardContent: bulmaStyles['card-content'] || 'cardContent',
  cardFooter: bulmaStyles['card-footer'] || 'cardFooter',
  cardFooterItem: bulmaStyles['card-footer-item'] || 'cardFooterItem',

  // Media
  media: bulmaStyles.media || 'media',
  mediaLeft: bulmaStyles['media-left'] || 'mediaLeft',
  mediaContent: bulmaStyles['media-content'] || 'mediaContent',

  // Image
  image: bulmaStyles.image || 'image',
  is2by1: bulmaStyles['is-2by1'] || 'is2by1',
  is4by3: bulmaStyles['is-4by3'] || 'is4by3',
  is48x48: bulmaStyles['is-48x48'] || 'is48x48',
  is64x64: bulmaStyles['is-64x64'] || 'is64x64',
  is96x96: bulmaStyles['is-96x96'] || 'is96x96',
  is128x128: bulmaStyles['is-128x128'] || 'is128x128',

  // Titles
  title: bulmaStyles.title || 'title',
  subtitle: bulmaStyles.subtitle || 'subtitle',

  // Typography
  isH1: bulmaStyles['is-1'] || 'is1',
  is2: bulmaStyles['is-2'] || 'is2',
  is3: bulmaStyles['is-3'] || 'is3',
  is4: bulmaStyles['is-4'] || 'is4',
  is5: bulmaStyles['is-5'] || 'is5',
  is6: bulmaStyles['is-6'] || 'is6',
  content: bulmaStyles.content || 'content',

  // Navbar
  // navbar: bulmaStyles.navbar || 'navbar',
  // navbarBrand: bulmaStyles['navbar-brand'] || 'navbarBrand',
  // navbarItem: bulmaStyles['navbar-item'] || 'navbarItem',
  // navbarLink: bulmaStyles['navbar-link'] || 'navbarLink',
  // navbarDropdown: bulmaStyles['navbar-dropdown'] || 'navbarDropdown',
  // navbarDivider: bulmaStyles['navbar-divider'] || 'navbarDivider',
  // navbarStart: bulmaStyles['navbar-start'] || 'navbarStart',
  // navbarEnd: bulmaStyles['navbar-end'] || 'navbarEnd',

  // Menu
  hasDropdown: bulmaStyles.hasDropdown || 'hasDropdown',

  // Tabs
  tabs: bulmaStyles.tabs || 'tabs',
  isToggle: bulmaStyles['is-toggle'] || 'isToggle',
  isFullwidth: bulmaStyles['is-fullwidth'] || 'isFullwidth',

  // Modal
  modal: bulmaStyles.modal || 'modal',
  modalBackground: bulmaStyles.modalBackground || 'modal-background',
  modalCard: bulmaStyles.modalCard || 'modal-card',
  modalCardHead: bulmaStyles.modalCardHead || 'modal-card-head',
  modalCardTitle: bulmaStyles.modalCardTitle || 'modal-card-title',
  modalCardBody: bulmaStyles.modalCardBody || 'modal-card-body',
  modalCardFoot: bulmaStyles.modalCardFoot || 'modal-card-foot',
  modalClose: bulmaStyles.modalClose || 'modal-close',
  modalContent: bulmaStyles.modalContent || 'modal-content',

  // box
  box: bulmaStyles.box || 'box',

  // Text colors
  hasTextPrimary: bulmaStyles.hasTextPrimary || 'has-text-primary',
  hasTextDanger: bulmaStyles.hasTextDanger || 'has-text-danger',
  hasTextLink: bulmaStyles.hasTextLink || 'has-text-link',
  hasTextGrey: bulmaStyles.hasTextGrey || 'has-text-grey',

  // Fileupload
  hasFile: bulmaStyles['has-file'] || 'hasFile',
  hasName: bulmaStyles['has-name'] || 'hasName',
  file: bulmaStyles['file'] || 'file',
  fileInput: bulmaStyles['file-input'] || 'fileInput',
  fileLabel: bulmaStyles['file-label'] || 'fileLabel',
  fileCta: bulmaStyles['file-cta'] || 'fileCta',
  fileIcon: bulmaStyles['file-icon'] || 'fileIcon',
  fileName: bulmaStyles['file-name'] || 'fileName',

  // Notification
  notification: bulmaStyles.notification || 'notification',

  // pagination
  pagination: bulmaStyles['pagination'] || 'pagination',
  paginationList: bulmaStyles['pagination-list'] || 'paginationList',
  paginationPrevious: bulmaStyles['pagination-previous'] || 'paginationPrevious',
  paginationNext: bulmaStyles['pagination-next'] || 'paginationNext',
  paginationLink: bulmaStyles['pagination-link'] || 'paginationLink',
  paginationEllipsis: bulmaStyles['pagination-ellipsis'] || 'paginationEllipsis',

  // checkbox
  checkbox: bulmaStyles['checkbox'] || 'checkbox',

  // table
  table: bulmaStyles['table'] || 'table',
  isBordered: bulmaStyles['is-bordered'] || 'isBordered',

  // Menu
  menu: bulmaStyles['menu'] || 'menu',
  menuLabel: bulmaStyles['menu-label'] || 'menuLabel',
  menuList: bulmaStyles['menu-list'] || 'menuList'
}

export default bulma
