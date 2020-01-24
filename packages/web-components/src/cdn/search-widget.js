import * as React from 'react';
import ReactDOM from 'react-dom';
import { SearchWidget } from '@/components/search-widget';
window.initReapitSearchWidget = function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b, _c = _a.containerID, containerID = _c === void 0 ? 'reapit-search-widget' : _c, _d = _a.searchResultContainerID, searchResultContainerID = _d === void 0 ? 'reapit-search-widget-result' : _d;
    var container = document.getElementById(containerID);
    if (!container) {
        throw new Error('container not existed');
    }
    ReactDOM.render(React.createElement(SearchWidget, { theme: theme, searchResultContainerID: searchResultContainerID }), document.getElementById(containerID));
};
