import { ComponentTypes } from '../../constants/component-types'

export const initializePropertyDetailComponent = editor => {
  const defaultType = editor.DomComponents.getType('default')
  const defaultModel = defaultType.model

  editor.DomComponents.addType(ComponentTypes.PROPERTY_DETAIL, {
    model: defaultModel.extend(
      {
        defaults: {
          ...defaultModel.prototype.defaults,
          apiKey: window.reapit.config.searchWidgetApiKey,
          reapitCustomerId: '',
          droppable: true,
          // TODO - allow user to select these using traits, for now getting key from config
          traits: [
            {
              label: 'API Key',
              name: 'apiKey',
              changeProp: 1,
            },
            {
              label: 'Reapit Customer Id',
              name: 'reapitCustomerId',
              changeProp: 1,
            },
          ],
          style: {
            width: '100%',
            'z-index': 1,
          },
          script: function() {
            const apiKey = '{[ apiKey ]}'
            // const reapitCustomerId = '{[ reapitCustomerId ]}'
            const container = this

            const initWidget = () => {
              container.innerHTML = ''
              new window.ReapitPropertyDetailWidget({
                theme: {
                  baseBackgroundColor: '#fff',
                  basefontSize: '16px',
                  basefontColor: '#556986',
                  inverseFontColor: '#fff',
                  secondaryfontColor: '#95aac9',
                  primaryHeadingFontSize: '22px',
                  secondaryHeadingFontSize: '18px',
                  baseFontFamily: '"Open Sans", sans-serif',
                  headingFontFamily: '"Montserrat", sans-serif',
                  primaryAccentColor: '#887e96',
                  secondaryAccentColor: '#7d9d88',
                  mapAccentColor: '',
                  breakPoints: {
                    mobile: '',
                    tablet: '',
                    laptop: '',
                    desktop: '',
                  },
                },
                apiKey,
                parentSelector: `#${container.id}`,
              })
            }

            if (!window.ReapitPropertyDetailWidget) {
              const styles = document.createElement('link')
              styles.href = 'https://web-components.reapit.cloud/property-detail-widget.css'
              styles.rel = 'stylesheet'
              document.head.appendChild(styles)

              const script = document.createElement('script')
              script.src = 'https://web-components.reapit.cloud/property-detail-widget.js'
              script.async = true
              script.defer = true
              script.onload = initWidget
              document.body.appendChild(script)
            } else {
              initWidget()
            }
          },
        },
      },
      {
        isComponent(el) {
          if (el.getAttribute && el.getAttribute('data-gjs-type') === ComponentTypes.PROPERTY_DETAIL) {
            return {
              type: ComponentTypes.PROPERTY_DETAIL,
            }
          }
        },
      },
    ),
    view: defaultType.view.extend({
      init() {
        this.listenTo(this.model, 'change:apiKey change:reapitCustomerId', this.updateScript)
        if (!this.model.attributes.apiKey.length) {
          console.log('TODO: should inform user about adding API key and customer id here')
        }
      },
    }),
  })
}
