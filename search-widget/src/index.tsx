import React from 'react';
import ReactDOM from 'react-dom';
import SearchWidget from './search-widget';
import GoogleMap from './map/google-map'
import { property } from './map/mock-property'

ReactDOM.render(<SearchWidget />, document.getElementById('reapit-search-widget'));
ReactDOM.render(<GoogleMap params={{ key: "AIzaSyCsCzPm4VwBHlr7ERyNGizRWMQMNdswzSo" }} property={property} />, document.getElementById('reapit-search-map'))