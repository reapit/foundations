/** Had to use common js for these imports, as the tsc compliler kept throwing this error. 
 * ../elements/src/components/icon/icons.ts:199:46 - error TS2307: Cannot find module '../../assets/system-icons/
 *  tickSystem.svg' or its corresponding type declarations.
 import { ReactComponent as tickSystem } from '../../assets/system-icons/tickSystem.svg'
 The usual declare module '*.svg' fix wasn't being respected and I couldn't work out why. Really killing me.
 */
const { ReactComponent: accountMenu } = require('../../assets/menu-icons/accountMenu.svg')
const { ReactComponent: addSolidSystem } = require('../../assets/system-icons/addSolidSystem.svg')
const { ReactComponent: addSystem } = require('../../assets/system-icons/addSystem.svg')
const { ReactComponent: agencyCloudInfographic } = require('../../assets/infographic-icons/agencyCloudInfographic.svg')
const { ReactComponent: analyticsMenu } = require('../../assets/menu-icons/analyticsMenu.svg')
const { ReactComponent: apiDocsInfographic } = require('../../assets/infographic-icons/apiDocsInfographic.svg')
const { ReactComponent: apiInfographic } = require('../../assets/infographic-icons/apiInfographic.svg')
const { ReactComponent: apiMenu } = require('../../assets/menu-icons/apiMenu.svg')
const { ReactComponent: appCategoryInfographic } = require('../../assets/infographic-icons/appCategoryInfographic.svg')
const { ReactComponent: appInfographic } = require('../../assets/infographic-icons/appInfographic.svg')
const { ReactComponent: appInfographicAlt } = require('../../assets/infographic-icons/appInfographicAlt.svg')
const { ReactComponent: applicantInfographic } = require('../../assets/infographic-icons/applicantInfographic.svg')
const {
  ReactComponent: appMarketDarkInfographic,
} = require('../../assets/infographic-icons/appMarketDarkInfographic.svg')
const { ReactComponent: appMarketInfographic } = require('../../assets/infographic-icons/appMarketInfographic.svg')
const {
  ReactComponent: appSettingsAuthDarkInfographic,
} = require('../../assets/infographic-icons/appSettingsAuthDarkInfographic.svg')
const {
  ReactComponent: appSettingsAuthInfographic,
} = require('../../assets/infographic-icons/appSettingsAuthInfographic.svg')
const { ReactComponent: appsMenu } = require('../../assets/menu-icons/appsMenu.svg')
const { ReactComponent: appTypeInfographic } = require('../../assets/infographic-icons/appTypeInfographic.svg')
const { ReactComponent: arrowDownSolidSystem } = require('../../assets/system-icons/arrowDownSolidSystem.svg')
const { ReactComponent: arrowDownSystem } = require('../../assets/system-icons/arrowDownSystem.svg')
const { ReactComponent: arrowLeftSolidSystem } = require('../../assets/system-icons/arrowLeftSolidSystem.svg')
const { ReactComponent: arrowLeftSystem } = require('../../assets/system-icons/arrowLeftSystem.svg')
const { ReactComponent: arrowRightSolidSystem } = require('../../assets/system-icons/arrowRightSolidSystem.svg')
const { ReactComponent: arrowRightSystem } = require('../../assets/system-icons/arrowRightSystem.svg')
const { ReactComponent: arrowUpSolidSystem } = require('../../assets/system-icons/arrowUpSolidSystem.svg')
const { ReactComponent: arrowUpSystem } = require('../../assets/system-icons/arrowUpSystem.svg')
const { ReactComponent: asteriskSolidSystem } = require('../../assets/system-icons/asteriskSolidSystem.svg')
const { ReactComponent: asteriskSystem } = require('../../assets/system-icons/asteriskSystem.svg')
const {
  ReactComponent: authenticatedInfographic,
} = require('../../assets/infographic-icons/authenticatedInfographic.svg')
const { ReactComponent: authenticationSolidSystem } = require('../../assets/system-icons/authenticationSolidSystem.svg')
const { ReactComponent: authenticationSystem } = require('../../assets/system-icons/authenticationSystem.svg')
const { ReactComponent: backSolidSystem } = require('../../assets/system-icons/backSolidSystem.svg')
const { ReactComponent: backSystem } = require('../../assets/system-icons/backSystem.svg')
const { ReactComponent: barnInfographic } = require('../../assets/infographic-icons/barnInfographic.svg')
const { ReactComponent: bulletListSolidSystem } = require('../../assets/system-icons/bulletListSolidSystem.svg')
const { ReactComponent: bulletListSystem } = require('../../assets/system-icons/bulletListSystem.svg')
const { ReactComponent: bungalowInfographic } = require('../../assets/infographic-icons/bungalowInfographic.svg')
const { ReactComponent: calendarSolidSystem } = require('../../assets/system-icons/calendarSolidSystem.svg')
const { ReactComponent: calendarSystem } = require('../../assets/system-icons/calendarSystem.svg')
const { ReactComponent: cancelSolidSystem } = require('../../assets/system-icons/cancelSolidSystem.svg')
const { ReactComponent: cancelSystem } = require('../../assets/system-icons/cancelSystem.svg')
const { ReactComponent: carSolidSystem } = require('../../assets/system-icons/carSolidSystem.svg')
const { ReactComponent: carSystem } = require('../../assets/system-icons/carSystem.svg')
const { ReactComponent: checkSolidSystem } = require('../../assets/system-icons/checkSolidSystem.svg')
const { ReactComponent: checkSystem } = require('../../assets/system-icons/checkSystem.svg')
const { ReactComponent: circleSolidSystem } = require('../../assets/system-icons/circleSolidSystem.svg')
const { ReactComponent: circleSystem } = require('../../assets/system-icons/circleSystem.svg')
const { ReactComponent: closeSolidSystem } = require('../../assets/system-icons/closeSolidSystem.svg')
const { ReactComponent: closeSystem } = require('../../assets/system-icons/closeSystem.svg')
const { ReactComponent: cloudSolidSystem } = require('../../assets/system-icons/cloudSolidSystem.svg')
const { ReactComponent: cloudSystem } = require('../../assets/system-icons/cloudSystem.svg')
const { ReactComponent: codeInfographic } = require('../../assets/infographic-icons/codeInfographic.svg')
const { ReactComponent: companySolidSystem } = require('../../assets/system-icons/companySolidSystem.svg')
const { ReactComponent: companySystem } = require('../../assets/system-icons/companySystem.svg')
const { ReactComponent: cottageInfographic } = require('../../assets/infographic-icons/cottageInfographic.svg')
const { ReactComponent: crmInfographic } = require('../../assets/infographic-icons/crmInfographic.svg')
const { ReactComponent: customerInfographic } = require('../../assets/infographic-icons/customerInfographic.svg')
const { ReactComponent: dataMenu } = require('../../assets/menu-icons/dataMenu.svg')
const { ReactComponent: defaultMenu } = require('../../assets/menu-icons/defaultMenu.svg')
const { ReactComponent: designInfographic } = require('../../assets/infographic-icons/designInfographic.svg')
const { ReactComponent: desktopMenu } = require('../../assets/menu-icons/desktopMenu.svg')
const {
  ReactComponent: developerAppsInfographic,
} = require('../../assets/infographic-icons/developerAppsInfographic.svg')
const { ReactComponent: developersMenu } = require('../../assets/menu-icons/developersMenu.svg')
const { ReactComponent: developmentInfographic } = require('../../assets/infographic-icons/developmentInfographic.svg')
const { ReactComponent: devicesInfographic } = require('../../assets/infographic-icons/devicesInfographic.svg')
const { ReactComponent: docsAnimated1 } = require('../../assets/animated-icons/docsAnimated1.svg')
const { ReactComponent: docsAnimated2 } = require('../../assets/animated-icons/docsAnimated2.svg')
const { ReactComponent: docsInfographic } = require('../../assets/infographic-icons/docsInfographic.svg')
const { ReactComponent: docsMenu } = require('../../assets/menu-icons/docsMenu.svg')
const { ReactComponent: dollarSolidSystem } = require('../../assets/system-icons/dollarSolidSystem.svg')
const { ReactComponent: dollarSystem } = require('../../assets/system-icons/dollarSystem.svg')
const { ReactComponent: doorLockInfographic } = require('../../assets/infographic-icons/doorLockInfographic.svg')
const { ReactComponent: downloadSolidSystem } = require('../../assets/system-icons/downloadSolidSystem.svg')
const { ReactComponent: downloadSystem } = require('../../assets/system-icons/downloadSystem.svg')
const { ReactComponent: downSolidSystem } = require('../../assets/system-icons/downSolidSystem.svg')
const { ReactComponent: downSystem } = require('../../assets/system-icons/downSystem.svg')
const {
  ReactComponent: editAppCancelInfographic,
} = require('../../assets/infographic-icons/editAppCancelInfographic.svg')
const { ReactComponent: editAppInfographic } = require('../../assets/infographic-icons/editAppInfographic.svg')
const { ReactComponent: editSolidSystem } = require('../../assets/system-icons/editSolidSystem.svg')
const { ReactComponent: editSystem } = require('../../assets/system-icons/editSystem.svg')
const { ReactComponent: elementsInfographic } = require('../../assets/infographic-icons/elementsInfographic.svg')
const { ReactComponent: emailSolidSystem } = require('../../assets/system-icons/emailSolidSystem.svg')
const { ReactComponent: emailSystem } = require('../../assets/system-icons/emailSystem.svg')
const { ReactComponent: errorSolidSystem } = require('../../assets/system-icons/errorSolidSystem.svg')
const { ReactComponent: errorSystem } = require('../../assets/system-icons/errorSystem.svg')
const { ReactComponent: euroSolidSystem } = require('../../assets/system-icons/euroSolidSystem.svg')
const { ReactComponent: euroSystem } = require('../../assets/system-icons/euroSystem.svg')
const { ReactComponent: farmInfographic } = require('../../assets/infographic-icons/farmInfographic.svg')
const { ReactComponent: favouriteSolidSystem } = require('../../assets/system-icons/favouriteSolidSystem.svg')
const { ReactComponent: favouriteSystem } = require('../../assets/system-icons/favouriteSystem.svg')
const { ReactComponent: feedAltInfographic } = require('../../assets/infographic-icons/feedAltInfographic.svg')
const { ReactComponent: feedInfographic } = require('../../assets/infographic-icons/feedInfographic.svg')
const { ReactComponent: filterSolidSystem } = require('../../assets/system-icons/filterSolidSystem.svg')
const { ReactComponent: filterSystem } = require('../../assets/system-icons/filterSystem.svg')
const { ReactComponent: flatInfographic } = require('../../assets/infographic-icons/flatInfographic.svg')
const {
  ReactComponent: foundationsCustomerInfographic,
} = require('../../assets/infographic-icons/foundationsCustomerInfographic.svg')
const { ReactComponent: geoLocationSolidSystem } = require('../../assets/system-icons/geoLocationSolidSystem.svg')
const { ReactComponent: geoLocationSystem } = require('../../assets/system-icons/geoLocationSystem.svg')
const { ReactComponent: githubSolidSystem } = require('../../assets/system-icons/githubSolidSystem.svg')
const { ReactComponent: githubSystem } = require('../../assets/system-icons/githubSystem.svg')
const { ReactComponent: globeInfographic } = require('../../assets/infographic-icons/globeInfographic.svg')
const { ReactComponent: graphQlInfographic } = require('../../assets/infographic-icons/graphQlInfographic.svg')
const { ReactComponent: hamburgerMenu } = require('../../assets/menu-icons/hamburgerMenu.svg')
const { ReactComponent: hamburgerMenuSolidSystem } = require('../../assets/system-icons/hamburgerMenuSolidSystem.svg')
const { ReactComponent: hamburgerMenuSystem } = require('../../assets/system-icons/hamburgerMenuSystem.svg')
const { ReactComponent: hamburgerOpenMenu } = require('../../assets/menu-icons/hamburgerOpenMenu.svg')
const { ReactComponent: helpMenu } = require('../../assets/menu-icons/helpMenu.svg')
const { ReactComponent: hideSolidSystem } = require('../../assets/system-icons/hideSolidSystem.svg')
const { ReactComponent: hideSystem } = require('../../assets/system-icons/hideSystem.svg')
const { ReactComponent: homeSolidSystem } = require('../../assets/system-icons/homeSolidSystem.svg')
const { ReactComponent: homeSystem } = require('../../assets/system-icons/homeSystem.svg')
const { ReactComponent: houseInfographic } = require('../../assets/infographic-icons/houseInfographic.svg')
const { ReactComponent: htmlInfographic } = require('../../assets/infographic-icons/htmlInfographic.svg')
const { ReactComponent: infoSolidSystem } = require('../../assets/system-icons/infoSolidSystem.svg')
const { ReactComponent: infoSystem } = require('../../assets/system-icons/infoSystem.svg')
const { ReactComponent: installedMenu } = require('../../assets/menu-icons/installedMenu.svg')
const { ReactComponent: landInfographic } = require('../../assets/infographic-icons/landInfographic.svg')
const { ReactComponent: landlordInfographic } = require('../../assets/infographic-icons/landlordInfographic.svg')
const {
  ReactComponent: leadGenerationInfographic,
} = require('../../assets/infographic-icons/leadGenerationInfographic.svg')
const { ReactComponent: linkSolidSystem } = require('../../assets/system-icons/linkSolidSystem.svg')
const { ReactComponent: linkSystem } = require('../../assets/system-icons/linkSystem.svg')
const { ReactComponent: listInfographic } = require('../../assets/infographic-icons/listInfographic.svg')
const { ReactComponent: lockedInfographic } = require('../../assets/infographic-icons/lockedInfographic.svg')
const { ReactComponent: lockSolidSystem } = require('../../assets/system-icons/lockSolidSystem.svg')
const { ReactComponent: lockSystem } = require('../../assets/system-icons/lockSystem.svg')
const { ReactComponent: logoKeyInfographic } = require('../../assets/infographic-icons/logoKeyInfographic.svg')
const {
  ReactComponent: logoSettingsInfographic,
} = require('../../assets/infographic-icons/logoSettingsInfographic.svg')
const { ReactComponent: logoutMenu } = require('../../assets/menu-icons/logoutMenu.svg')
const { ReactComponent: mailInfographic } = require('../../assets/infographic-icons/mailInfographic.svg')
const { ReactComponent: maisonetteInfographic } = require('../../assets/infographic-icons/maisonetteInfographic.svg')
const {
  ReactComponent: manageAppListingInfographic,
} = require('../../assets/infographic-icons/manageAppListingInfographic.svg')
const { ReactComponent: manageMenu } = require('../../assets/menu-icons/manageMenu.svg')
const {
  ReactComponent: manageWebhooksInfographic,
} = require('../../assets/infographic-icons/manageWebhooksInfographic.svg')
const { ReactComponent: mapMenu } = require('../../assets/menu-icons/mapMenu.svg')
const { ReactComponent: marketingInfographic } = require('../../assets/infographic-icons/marketingInfographic.svg')
const {
  ReactComponent: marketplaceAppACInfographic,
} = require('../../assets/infographic-icons/marketplaceAppACInfographic.svg')
const { ReactComponent: marketplaceMenu } = require('../../assets/menu-icons/marketplaceMenu.svg')
const { ReactComponent: messageSolidSystem } = require('../../assets/system-icons/messageSolidSystem.svg')
const { ReactComponent: messageSystem } = require('../../assets/system-icons/messageSystem.svg')
const { ReactComponent: moreSolidSystem } = require('../../assets/system-icons/moreSolidSystem.svg')
const { ReactComponent: moreSystem } = require('../../assets/system-icons/moreSystem.svg')
const { ReactComponent: myAccountMenu } = require('../../assets/menu-icons/myAccountMenu.svg')
const { ReactComponent: myAppsInfographic } = require('../../assets/infographic-icons/myAppsInfographic.svg')
const { ReactComponent: newCustomerInfographic } = require('../../assets/infographic-icons/newCustomerInfographic.svg')
const { ReactComponent: nextSolidSystem } = require('../../assets/system-icons/nextSolidSystem.svg')
const { ReactComponent: nextSystem } = require('../../assets/system-icons/nextSystem.svg')
const { ReactComponent: officesMenu } = require('../../assets/menu-icons/officesMenu.svg')
const { ReactComponent: paymentsMenu } = require('../../assets/menu-icons/paymentsMenu.svg')
const { ReactComponent: paymentSolidSystem } = require('../../assets/system-icons/paymentSolidSystem.svg')
const { ReactComponent: paymentSystem } = require('../../assets/system-icons/paymentSystem.svg')
const { ReactComponent: phoneInfographic } = require('../../assets/infographic-icons/phoneInfographic.svg')
const { ReactComponent: phoneSolidSystem } = require('../../assets/system-icons/phoneSolidSystem.svg')
const { ReactComponent: phoneSystem } = require('../../assets/system-icons/phoneSystem.svg')
const { ReactComponent: pinSolidSystem } = require('../../assets/system-icons/pinSolidSystem.svg')
const { ReactComponent: pinSystem } = require('../../assets/system-icons/pinSystem.svg')
const { ReactComponent: platformApiInfographic } = require('../../assets/infographic-icons/platformApiInfographic.svg')
const { ReactComponent: poundSolidSystem } = require('../../assets/system-icons/poundSolidSystem.svg')
const { ReactComponent: poundSystem } = require('../../assets/system-icons/poundSystem.svg')
const { ReactComponent: previewSystem } = require('../../assets/system-icons/previewSystem.svg')
const {
  ReactComponent: productivityInfographic,
} = require('../../assets/infographic-icons/productivityInfographic.svg')
const { ReactComponent: profileMenu } = require('../../assets/menu-icons/profileMenu.svg')
const {
  ReactComponent: propertyManagementInfographic,
} = require('../../assets/infographic-icons/propertyManagementInfographic.svg')
const { ReactComponent: propTechInfographic } = require('../../assets/infographic-icons/propTechInfographic.svg')
const { ReactComponent: questionSolidSystem } = require('../../assets/system-icons/questionSolidSystem.svg')
const { ReactComponent: questionSystem } = require('../../assets/system-icons/questionSystem.svg')
const {
  ReactComponent: reapitConnectInfographic,
} = require('../../assets/infographic-icons/reapitConnectInfographic.svg')
const {
  ReactComponent: reapitConnectSettingsDevicesDarkInfographic,
} = require('../../assets/infographic-icons/reapitConnectSettingsDevicesDarkInfographic.svg')
const {
  ReactComponent: reapitConnectSettingsDevicesInfographic,
} = require('../../assets/infographic-icons/reapitConnectSettingsDevicesInfographic.svg')
const { ReactComponent: reapitLogoInfographic } = require('../../assets/infographic-icons/reapitLogoInfographic.svg')
const { ReactComponent: reapitLogoMenu } = require('../../assets/menu-icons/reapitLogoMenu.svg')
const { ReactComponent: reapitLogoSelectedMenu } = require('../../assets/menu-icons/reapitLogoSelectedMenu.svg')
const { ReactComponent: reapitLogoTextMenu } = require('../../assets/menu-icons/reapitLogoTextMenu.svg')
const { ReactComponent: reapitUserInfographic } = require('../../assets/infographic-icons/reapitUserInfographic.svg')
const { ReactComponent: refreshInfographic } = require('../../assets/infographic-icons/refreshInfographic.svg')
const { ReactComponent: refreshSolidSystem } = require('../../assets/system-icons/refreshSolidSystem.svg')
const { ReactComponent: refreshSystem } = require('../../assets/system-icons/refreshSystem.svg')
const { ReactComponent: reportInfographic } = require('../../assets/infographic-icons/reportInfographic.svg')
const { ReactComponent: reportingInfographic } = require('../../assets/infographic-icons/reportingInfographic.svg')
const { ReactComponent: resultsMenu } = require('../../assets/menu-icons/resultsMenu.svg')
const {
  ReactComponent: salesProgressionInfographic,
} = require('../../assets/infographic-icons/salesProgressionInfographic.svg')
const { ReactComponent: saveSystem } = require('../../assets/system-icons/saveSystem.svg')
const { ReactComponent: searchMenu } = require('../../assets/menu-icons/searchMenu.svg')
const { ReactComponent: searchSolidSystem } = require('../../assets/system-icons/searchSolidSystem.svg')
const { ReactComponent: searchSystem } = require('../../assets/system-icons/searchSystem.svg')
const { ReactComponent: securityTokenSolidSystem } = require('../../assets/system-icons/securityTokenSolidSystem.svg')
const { ReactComponent: securityTokenSystem } = require('../../assets/system-icons/securityTokenSystem.svg')
const { ReactComponent: selectInfographic } = require('../../assets/infographic-icons/selectInfographic.svg')
const { ReactComponent: serverInfographic } = require('../../assets/infographic-icons/serverInfographic.svg')
const { ReactComponent: settingsSolidSystem } = require('../../assets/system-icons/settingsSolidSystem.svg')
const { ReactComponent: settingsSystem } = require('../../assets/system-icons/settingsSystem.svg')
const {
  ReactComponent: sharedEntitiesInfographic,
} = require('../../assets/infographic-icons/sharedEntitiesInfographic.svg')
const { ReactComponent: shareSolidSystem } = require('../../assets/system-icons/shareSolidSystem.svg')
const { ReactComponent: shareSystem } = require('../../assets/system-icons/shareSystem.svg')
const { ReactComponent: shieldInfographic } = require('../../assets/infographic-icons/shieldInfographic.svg')
const { ReactComponent: sortSolidSystem } = require('../../assets/system-icons/sortSolidSystem.svg')
const { ReactComponent: sortSystem } = require('../../assets/system-icons/sortSystem.svg')
const { ReactComponent: supportMenu } = require('../../assets/menu-icons/supportMenu.svg')
const { ReactComponent: tickSolidSystem } = require('../../assets/system-icons/tickSolidSystem.svg')
const { ReactComponent: tickSystem } = require('../../assets/system-icons/tickSystem.svg')
const { ReactComponent: trashSolidSystem } = require('../../assets/system-icons/trashSolidSystem.svg')
const { ReactComponent: trashSystem } = require('../../assets/system-icons/trashSystem.svg')
const { ReactComponent: uiMenu } = require('../../assets/menu-icons/uiMenu.svg')
const { ReactComponent: upSolidSystem } = require('../../assets/system-icons/upSolidSystem.svg')
const { ReactComponent: upSystem } = require('../../assets/system-icons/upSystem.svg')
const { ReactComponent: userAuthInfographic } = require('../../assets/infographic-icons/userAuthInfographic.svg')
const { ReactComponent: userDeviceInfographic } = require('../../assets/infographic-icons/userDeviceInfographic.svg')
const { ReactComponent: userHouseInfographic } = require('../../assets/infographic-icons/userHouseInfographic.svg')
const { ReactComponent: userInfographic } = require('../../assets/infographic-icons/userInfographic.svg')
const { ReactComponent: usernameSolidSystem } = require('../../assets/system-icons/usernameSolidSystem.svg')
const { ReactComponent: usernameSystem } = require('../../assets/system-icons/usernameSystem.svg')
const { ReactComponent: usersMenu } = require('../../assets/menu-icons/usersMenu.svg')
const {
  ReactComponent: utilityRegistrationInfographic,
} = require('../../assets/infographic-icons/utilityRegistrationInfographic.svg')
const { ReactComponent: vendorInfographic } = require('../../assets/infographic-icons/vendorInfographic.svg')
const { ReactComponent: videoSolidSystem } = require('../../assets/system-icons/videoSolidSystem.svg')
const { ReactComponent: videoSystem } = require('../../assets/system-icons/videoSystem.svg')
const { ReactComponent: viewSolidSystem } = require('../../assets/system-icons/viewSolidSystem.svg')
const { ReactComponent: viewSystem } = require('../../assets/system-icons/viewSystem.svg')
const { ReactComponent: walkingSolidSystem } = require('../../assets/system-icons/walkingSolidSystem.svg')
const { ReactComponent: walkingSystem } = require('../../assets/system-icons/walkingSystem.svg')
const { ReactComponent: warningSolidSystem } = require('../../assets/system-icons/warningSolidSystem.svg')
const { ReactComponent: warningSystem } = require('../../assets/system-icons/warningSystem.svg')
const {
  ReactComponent: webDeveloperInfographic,
} = require('../../assets/infographic-icons/webDeveloperInfographic.svg')
const {
  ReactComponent: webDeveloperInfographicAlt,
} = require('../../assets/infographic-icons/webDeveloperInfographicAlt.svg')
const { ReactComponent: webhooksAnimated1 } = require('../../assets/animated-icons/webhooksAnimated1.svg')
const { ReactComponent: webhooksAnimated2 } = require('../../assets/animated-icons/webhooksAnimated2.svg')
const { ReactComponent: webhooksDocsAnimated1 } = require('../../assets/animated-icons/webhooksDocsAnimated1.svg')
const { ReactComponent: webhooksDocsAnimated2 } = require('../../assets/animated-icons/webhooksDocsAnimated2.svg')
const {
  ReactComponent: webhooksDocsInfographic,
} = require('../../assets/infographic-icons/webhooksDocsInfographic.svg')
const { ReactComponent: webhooksInfographic } = require('../../assets/infographic-icons/webhooksInfographic.svg')
const { ReactComponent: webhooksMenu } = require('../../assets/menu-icons/webhooksMenu.svg')
const { ReactComponent: webInfographic } = require('../../assets/infographic-icons/webInfographic.svg')
const { ReactComponent: welcomeAnimated1 } = require('../../assets/animated-icons/welcomeAnimated1.svg')
const { ReactComponent: welcomeAnimated2 } = require('../../assets/animated-icons/welcomeAnimated2.svg')
const { ReactComponent: welcomeInfographic } = require('../../assets/infographic-icons/welcomeInfographic.svg')
const { ReactComponent: placeholderLarge } = require('../../assets/placeholder-images/placeholderLarge.svg')
const { ReactComponent: placeholderSmall } = require('../../assets/placeholder-images/placeholderSmall.svg')

export const iconSet = {
  appCategoryInfographic,
  agencyCloudInfographic,
  apiDocsInfographic,
  apiInfographic,
  appInfographic,
  appInfographicAlt,
  applicantInfographic,
  appMarketDarkInfographic,
  appMarketInfographic,
  appSettingsAuthDarkInfographic,
  appSettingsAuthInfographic,
  appTypeInfographic,
  barnInfographic,
  bungalowInfographic,
  codeInfographic,
  cottageInfographic,
  crmInfographic,
  customerInfographic,
  designInfographic,
  developerAppsInfographic,
  developmentInfographic,
  devicesInfographic,
  docsInfographic,
  doorLockInfographic,
  editAppCancelInfographic,
  editAppInfographic,
  elementsInfographic,
  farmInfographic,
  feedAltInfographic,
  feedInfographic,
  flatInfographic,
  foundationsCustomerInfographic,
  globeInfographic,
  graphQlInfographic,
  houseInfographic,
  htmlInfographic,
  landInfographic,
  landlordInfographic,
  leadGenerationInfographic,
  listInfographic,
  lockedInfographic,
  logoKeyInfographic,
  logoSettingsInfographic,
  mailInfographic,
  maisonetteInfographic,
  manageAppListingInfographic,
  manageWebhooksInfographic,
  marketingInfographic,
  marketplaceAppACInfographic,
  myAppsInfographic,
  newCustomerInfographic,
  phoneInfographic,
  productivityInfographic,
  propertyManagementInfographic,
  propTechInfographic,
  reapitConnectInfographic,
  reapitConnectSettingsDevicesDarkInfographic,
  reapitConnectSettingsDevicesInfographic,
  reapitLogoInfographic,
  reapitUserInfographic,
  refreshInfographic,
  reportInfographic,
  reportingInfographic,
  salesProgressionInfographic,
  selectInfographic,
  serverInfographic,
  shieldInfographic,
  userAuthInfographic,
  userDeviceInfographic,
  userHouseInfographic,
  userInfographic,
  utilityRegistrationInfographic,
  vendorInfographic,
  webDeveloperInfographic,
  webDeveloperInfographicAlt,
  webhooksDocsInfographic,
  webhooksInfographic,
  webInfographic,
  welcomeInfographic,
  // Thin System Icons
  addSystem,
  arrowDownSystem,
  arrowLeftSystem,
  arrowRightSystem,
  arrowUpSystem,
  asteriskSystem,
  authenticationSystem,
  backSystem,
  bulletListSystem,
  calendarSystem,
  cancelSystem,
  carSystem,
  checkSystem,
  circleSystem,
  closeSystem,
  cloudSystem,
  companySystem,
  dollarSystem,
  downloadSystem,
  downSystem,
  editSystem,
  emailSystem,
  errorSystem,
  euroSystem,
  favouriteSystem,
  filterSystem,
  geoLocationSystem,
  githubSystem,
  hamburgerMenuSystem,
  hideSystem,
  homeSystem,
  infoSystem,
  linkSystem,
  lockSystem,
  messageSystem,
  moreSystem,
  nextSystem,
  paymentSystem,
  phoneSystem,
  pinSystem,
  poundSystem,
  questionSystem,
  refreshSystem,
  searchSystem,
  securityTokenSystem,
  settingsSystem,
  shareSystem,
  sortSystem,
  trashSystem,
  upSystem,
  usernameSystem,
  videoSystem,
  viewSystem,
  walkingSystem,
  warningSystem,
  // Solid System Icons
  addSolidSystem,
  arrowDownSolidSystem,
  arrowLeftSolidSystem,
  arrowRightSolidSystem,
  arrowUpSolidSystem,
  asteriskSolidSystem,
  authenticationSolidSystem,
  backSolidSystem,
  bulletListSolidSystem,
  calendarSolidSystem,
  cancelSolidSystem,
  carSolidSystem,
  checkSolidSystem,
  circleSolidSystem,
  closeSolidSystem,
  cloudSolidSystem,
  companySolidSystem,
  dollarSolidSystem,
  downloadSolidSystem,
  downSolidSystem,
  editSolidSystem,
  emailSolidSystem,
  errorSolidSystem,
  euroSolidSystem,
  favouriteSolidSystem,
  filterSolidSystem,
  geoLocationSolidSystem,
  githubSolidSystem,
  hamburgerMenuSolidSystem,
  hideSolidSystem,
  homeSolidSystem,
  infoSolidSystem,
  linkSolidSystem,
  lockSolidSystem,
  messageSolidSystem,
  moreSolidSystem,
  nextSolidSystem,
  paymentSolidSystem,
  phoneSolidSystem,
  pinSolidSystem,
  poundSolidSystem,
  questionSolidSystem,
  refreshSolidSystem,
  searchSolidSystem,
  securityTokenSolidSystem,
  settingsSolidSystem,
  shareSolidSystem,
  sortSolidSystem,
  trashSolidSystem,
  upSolidSystem,
  usernameSolidSystem,
  videoSolidSystem,
  viewSolidSystem,
  walkingSolidSystem,
  warningSolidSystem,
  // Menu Icons
  accountMenu,
  analyticsMenu,
  apiMenu,
  appsMenu,
  dataMenu,
  defaultMenu,
  desktopMenu,
  developersMenu,
  docsMenu,
  hamburgerMenu,
  hamburgerOpenMenu,
  helpMenu,
  installedMenu,
  logoutMenu,
  manageMenu,
  mapMenu,
  marketplaceMenu,
  myAccountMenu,
  officesMenu,
  paymentsMenu,
  profileMenu,
  reapitLogoMenu,
  reapitLogoSelectedMenu,
  reapitLogoTextMenu,
  resultsMenu,
  searchMenu,
  supportMenu,
  uiMenu,
  usersMenu,
  webhooksMenu,
  // Placeholder Icons
  placeholderLarge,
  placeholderSmall,
  // Deprecated Icons
  docsAnimated1,
  docsAnimated2,
  webhooksAnimated1,
  webhooksAnimated2,
  webhooksDocsAnimated1,
  webhooksDocsAnimated2,
  welcomeAnimated1,
  welcomeAnimated2,
  saveSystem,
  tickSolidSystem,
  tickSystem,
  previewSystem,
  authenticatedInfographic,
  platformApiInfographic,
  sharedEntitiesInfographic,
}
