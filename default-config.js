// overridable
// 
// 
module.exports = {
  NS:'NS',
  PAGES_FOLDER: '../woodford.today/pages/',
  JS_EXT: '.js',
  CSS_EXT: '.scss',
  OUT_FILE: './router.js',
  PUBLIC_FOLDER: '/public/pages',
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
    '/:line/:station': {
        page: 'station',
        route: 'station'

    }
  }
} ;
