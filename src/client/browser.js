var React = require('react');
var App = React.createFactory(require('../shared/app'));

React.render(App(window.APP_PROPS), document.getElementById('content'));