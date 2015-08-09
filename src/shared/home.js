var React = require('react');

var dom = React.DOM;
var div = dom.div;
var h1 = dom.h1;
var ul = dom.ul;
var li = dom.li;
var a = dom.a;

function getDays(cb) {
	return cb(null, [
		{
			name: 'Monday'
		},
		{
			name: 'Tuesday'
		},
		{
			name: 'Wednesday'
		},
		{
			name: 'Thursday'
		},
		{	
			name: 'Friday'
		}
	]);
}

module.exports = React.createClass({
  statics: {
    fetchData: getDays
  },
  render: function () {
    return div(null, 
    	h1(null, 'Sprint Planner'),
    	ul({ children: this.props.data.map(function(day) {
    		return li(null, day.name);
    	})})
    );
  }
});
