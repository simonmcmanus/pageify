Generate a page.js client side router.

[![Build Status](https://travis-ci.org/simonmcmanus/pageify.svg?branch=master)](https://travis-ci.org/simonmcmanus/pageify)

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

    - public
        - pages
            - js
                - search.js
                - shared.js
            - css
                - shared.css
                - search.css
                - home.css


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
