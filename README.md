# web-components

## Introduction
- This project contains embeddable TypeScript widgets to enhance static sites. The library will be built into two different types: as npm package to use with npm project,  as a UMD script to embed into other static sites.

## Build and publish NPM package
This action should be done by CI after a PR merged into master
Execute npm script: `build:npm` to build package into a folder named dist-npm, then `npm publish` to publish the package (make sure you have a required env set: NPM_TOKEN)

## Build and publish CDN static files
This action should be done by CI after a PR merged into master
Execute npm script: `build:cdn` to build package into a folder named dist-cdn, then `npm publish:cdn` to publish static files into AWS s3 (make sure you have configurated valid s3 credential: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

## Usage

### NPM package
* Install the package `yarn add @reapit/web-components` or `npm install @reapit/web-components` (make sure you have a correct .npmrc in your root folder)
* Import the widgets that you want to use
```
import { SearchWidget } from '@reapit/web-components'
```

### CDN package
* Add a script tag at the end of your static
```html
<script src="http://reapit-web-components.s3.amazonaws.com/search-widget.js"></script>
```

* Use the desired component follow the instruction of that component
```html
<div id="reapit-search-widget-container">
<div id="result"></div>
```

## Development
Create a storybook for your component, and execute `yarn storybook` to start to develop your component at `localhost:8080`