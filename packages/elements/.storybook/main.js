module.exports =
  process.env.NODE_ENV === 'production'
    ? {
        stories: [
          '../src/components/**/*.stories.mdx',
          '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
          '../src/utils/**/*.stories.mdx',
          '../src/utils/**/*.stories.@(js|jsx|ts|tsx)',
        ],
        addons: [
          '@storybook/addon-links',
          '@whitespace/storybook-addon-html',
          '@storybook/addon-essentials',
          '@storybook/addon-storysource/register',
        ],
      }
    : {
        stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
        addons: [
          '@storybook/addon-links',
          '@whitespace/storybook-addon-html',
          '@storybook/addon-essentials',
          '@storybook/addon-storysource/register',
        ],
      }
