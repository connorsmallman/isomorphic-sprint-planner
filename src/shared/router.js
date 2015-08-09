exports.routes = {
  home: {
    url: '/',
    component: require('./home')
  }
}

exports.resolve = function(url) {
  for (var key in exports.routes) {
    var route = exports.routes[key];
    var match = typeof route.url == 'string' ? url == route.url : url.match(route.url);

   if (match) {
      var params = Array.isArray(match) ? match.slice(1) : [];

      return {
        key: key,
        fetchData: function(cb) {
          if (!route.component.fetchData) return cb();
          return route.component.fetchData.apply(null, params.concat(cb));
        }
      }
    }
  }
} 
