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

an example can be found:

For lack of a simple example it can be seen in use at:

github.com/simonmcmanus/woodford.today


BAD EXPLAINATION FOLLOWS:

It will look for a pageify-config.js file in the project root and then generate a router based of that file.


So given a route-mappings.js file that looks like:


```js
module.exports = {
    '/': {
        page: 'home'
    }
};
```

It will look for a folder ./pages/home

If there is a css, js (extenstions can be configured) file for that page the router will load the compiled version of that resource when the browser hits that route.


Currently requires node 10 or above.
