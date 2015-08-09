var http = require('http');
var browserify = require('browserify');
var literalify = require('literalify');
var React = require('react');
var router = require('../shared/router');
var App = React.createFactory(require('../shared/app'));

var DOM = React.DOM;
var body = DOM.body; 
var div = DOM.div;
var script = DOM.script;

var server = http.createServer(function(req, res) {

  var route = router.resolve(req.url);

  if (route) {
    res.setHeader('Content-Type', 'text/html');
    
    route.fetchData(function(err, data) {

      if (err) {
        res.statusCode = err.message == 'NotFound' ? 404 : 500;
        return res.end(err.toString());
      }

      var props = {
        routeKey: route.key,
        data: data,
      }

      var html = React.renderToStaticMarkup(body(null,

        div({id: 'content', dangerouslySetInnerHTML: {__html:
          React.renderToString(App(props))
        }}),

        script({dangerouslySetInnerHTML: {__html:
          'var APP_PROPS = ' + safeStringify(props) + ';'
        }}),

        script({src: '//fb.me/react-0.13.3.min.js'}),
        script({src: '/bundle.js'})
      ))

      res.end(html)
    });
  } else if (req.url == '/bundle.js') {
    res.setHeader('Content-Type', 'text/javascript')

    return browserify()
      .add('./client/browser.js')
      .transform(literalify.configure({
        'react': 'window.React'
      }))
      .bundle()
      .pipe(res)
  } else {
    res.statusCode = 404
    return res.end('Not Found')
  }

});

server.listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on 3000...')
})

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}