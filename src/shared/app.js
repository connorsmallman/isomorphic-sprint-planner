var React = require('react');
var router = require('./router');

module.exports = React.createClass({
  getInitialState: function() {
    return this.props
  },
  render: function() {
    return React.createElement(router.routes[this.state.routeKey].component, {data: this.state.data});
  },
});
