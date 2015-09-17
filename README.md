Generate a page.js client side router from a pageify-config.js file.

[![Build Status](https://travis-ci.org/simonmcmanus/pageify.svg?branch=master)](https://travis-ci.org/simonmcmanus/pageify)


#example pageify-config.js

```js

  module.exports = {
    PAGES_FOLDER: './pages/',
    PUBLIC_FOLDER: '/',
    PUBLIC_PAGES_FOLDER: '/pages/',
    JS_EXT: '.js',
    CSS_EXT: '.scss',
    require: true, // should it include require('page'), set to false if you are not using browserify/webpack.
    scriptLoader: 'scriptjs', // package to use to load scripts into the browser. set to false if you wish to specify your own scriptLoader function();
    setupPage: function(page, context) {
      // setup page here.
    },
    STYLE_ID: '#perPageStyle',
    mappings: {
      '/': {
          page: 'home',
          route: 'home'
      },
      '/seach': {
          page: 'search',
          route: 'search'
      },

      '/about': {
          page: 'about',
          route: 'about'
      },
      '/:line/:stationName': {
          page: 'station',
          route: 'station'

      }
    }
  } ;


```

with browserify:

In your clientside js:

main.js :


```js
    require('pageify');
```


browserify:

    browserify -t pageify main.js -o bundle.js




# Config Options

## PAGES_FOLDER

The folder in which you store your pages. Should contain a folder for each page.

    - pages
        - home
            - home.scss
        - search
            - search.js
            - search.scss
        - shared
            - shared.js
            - shared.scss


## PUBLIC_FOLDER

The folder from which the compiled js and css files will be served.

in this case 'public'

    - public
      - js
        - shared.js
        - pages
          - search.js
          - home.js
      - css
        - shared.css
        - pages
          - search.css
          - home.css


## PUBLIC_PAGES_FOLDER

We build up the public url like so:

### css
  config.PUBLIC_FOLDER + 'css' + config.PUBLIC_PAGES_FOLDER + item.page + '.css'

### js

  config.PUBLIC_FOLDER + 'js' + config.PUBLIC_PAGES_FOLDER + item.page + '.js'


## JS_EXT

    default: '.js'

When it generates the route for each page it checks to see if there is a file with this extension to determine if it should include the js snippet for this route.

## CSS_EXT

    default: '.scss'

When it generates the route for each page it checks to see if there is a file with this extension to determine if it should include the js snippet for this route.

## STYLE_ID

The id of the link tag which should be updated when the page changes.


## MAPPINGS

    default: {}

    example: {
        '/search': {
            page: 'search',
        }
    }

given this config it would look for the files:

    /pages/css/search.scss

    /pages/js/search.js


if those files exist, when the url is hit the browser should request:

    /public/pages/css/search.css

    /public/pages/js/search.js

______


For lack of a simple example it can be seen in use at:

github.com/simonmcmanus/woodford.today

Currently requires node 10 or above.
