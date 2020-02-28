const pkg = require('./package')
const axios = require('axios')
const blokToken = 'pQ1qRdl9S8X1bwzXDIAg1Qtt'

const mainUrl = 'https://brave-clarke-662806.netlify.com/'
const resourceUrl = 'https://brave-clarke-662806.netlify.com/'
const config = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Function',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Function'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/uuy0bkd.css' }
    ]
  },

  env: {
    baseUrl: process.env.NODE_ENV == 'production' ? mainUrl : 'http://localhost:3000',
    prodUrl: mainUrl,
    mainUrl: mainUrl,
    resourcesUrl: resourceUrl
  },

  /*
  ** Customize the loading screen
  */
  loading: '~/src/components/Elements/Loading',

  /*
  ** Global CSS
  */
  css: [
    '~/src/assets/scss/main.scss'
  ],

  /*
  ** Build configuration
  */
  build: {
    extend(config, ctx) {},
    postcss: [
      require('autoprefixer')({
        browsers: ['> 5%']
      })
    ],
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: process.env.NODE_ENV == 'production' ? true : false,
        minifyJS: process.env.NODE_ENV == 'production' ? true : false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  },

  router: {
    base: '/',
    routeNameSplitter: '/',
    middleware: ['setCacheVersion', 'languageDetection']
  },

  /*
  ** Make client available everywhere via Nuxt plugins
  */
  plugins: [
    '~/plugins/components',
    '~/plugins/filters',
    '~/plugins/directives'
  ],

    /*
  ** Nuxt.js modules
  */
  modules: [
    ['bootstrap-vue/nuxt', { css: false }],
    ['storyblok-nuxt', 
      { accessToken: blokToken, cacheProvider: 'memory' }
    ],
    // ['@nuxtjs/google-analytics', {
    //   id: 'UA-55889031-1'
    // }],
  ],

  generate: {
    fallback: "404.html",
    routes: function (callback) {
      const per_page = 100
      let cache_version = 0
      
      let page = 1
      let routes = ['/']

      // Load space and receive latest cache version key to improve performance
      axios.get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${blokToken}`).then((space_res) => {

        // timestamp of latest publish
        cache_version = space_res.data.space.version
      
        // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
        axios.get(`https://api.storyblok.com/v1/cdn/stories?token=${blokToken}&per_page=${per_page}&page=${page}&cv=${cache_version}`).then((res) => {
          Object.keys(res.data.stories).forEach((key) => {
            if (res.data.stories[key].full_slug !== 'home' && res.data.stories[key].full_slug.startsWith('testing') == false) {
              routes.push('/' + res.data.stories[key].full_slug)
            }
          })

          // Check if there are more pages available otherwise execute callback with current routes.
          const total = res.headers.total
          const maxPage = Math.ceil(total / per_page)
          if (maxPage <= 1) {
            callback(null, routes)
          }

          // Since we know the total we now can pregenerate all requests we need to get all Links
          let contentRequests = [] 
          for (let page = 2; page <= maxPage; page++) {
            contentRequests.push(axios.get(`https://api.storyblok.com/v1/cdn/stories?token=${blokToken}&per_page=${per_page}&page=${page}`))
          }

          // Axios allows us to execute all requests using axios.spread we will than generate our routes and execute the callback
          axios.all(contentRequests).then(axios.spread((...responses) => {
            responses.forEach((response) => {
              Object.keys(response.data.links).forEach((key) => {
                if (response.data.stories[key].full_slug !== 'home' && res.data.stories[key].full_slug.startsWith('testing') == false) {
                  routes.push('/' + response.data.stories[key].full_slug)
                }
              })
            })
          
            callback(null, routes)
          })).catch(callback)
        })
      }) 
    }  
  }
}

module.exports = config

