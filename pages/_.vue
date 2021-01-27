<template>
  <div 
  :class="[
  'Page',
  story.content.component,
  story.content.classes ? story.content.classes : null]"
  v-scroll="handleScroll">
    <component 
    v-if="story.content.component" 
    :key="story.content._uid" 
    :blok="story.content" 
    :is="story.content.component | dashify"
    :tagList="story.tag_list"></component>
  </div>
</template>

<script>
const loadData = function({lang, api, cacheVersion, errorCallback, version, path}) {
  return api.get(`cdn/stories${path}`, {
    version: version,
    cv: cacheVersion,
    resolve_links: 2
  }).then(res => {
    if(res.data) {
      return res.data
    }
  }).catch(res => {
    errorCallback({ statusCode: 404, message: 'Failed to receive content form api' })
  })
}

export default {
  data () {
    return { story: { content: {} } }
  },
  head () {
    return {
      title: this.story.content.metadata ? this.story.content.metadata.title : this.story.title,
      titleTemplate: '%s | Function',
      meta: [
        { hid: 'description', name: 'description', 
        content: this.story.content.metadata ? this.story.content.metadata.description : '' },

        { name: 'robots',
        content: this.story.content.noindex ? 'noindex' : '' },

        { name: 'twitter:card',
        content: this.story.content.twitterCardType || 'summary_large_image' },
        { name: 'twitter:site',
        content: "https://teamfunction.io/" },
        { name: 'twitter:creator',
        content: this.story.content.twitterAuthor || '@wellcertified' },
        { name: 'twitter:title',
        content: this.story.content.twitterTitle || this.story.title || 'Function' },
        { name: 'twitter:description',
        content: this.story.content.twitterDescription || 'Digitize your process' },
        { name: 'twitter:image',
        content: this.story.content.twitterImage || 'http://a.storyblok.com/f/58905/2658x1348/a7dfc7be83/social-thumbnail.png' },
        { name: 'og:url',
        content: this.story.full_slug },
        { name: 'og:type',
        content: "website" },
        { name: 'og:title',
        content: this.story.content.ogTitle ||  this.story.title || 'Function' },
        { name: 'og:description',
        content: this.story.content.ogDescription || 'Digitize your process' },
        { name: 'og:image',
          content: this.story.content.ogImage || 'http://a.storyblok.com/f/58905/2658x1348/a7dfc7be83/social-thumbnail.png'
        },
        { name: 'google-site-verification',
          content: 'vjP-rZM3zj8cHL0l8XgcSEGMuQRxdDP0A6wsKu2CPtE'
        }
      ],
      link: [
        { rel: 'canonical', href: 'https://www.wellcertified.com/' + this.story.full_slug !== 'home' ? this.story.full_slug : '' }
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=UA-55889031-1',
          type: 'text/javascript',
          async: true
        },
        { 
          innerHTML: 'window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'UA-55889031-1\'); gtag(\'config\', \'AW-699780384\');', 
          type: 'text/javascript',
          charset: 'utf-8'
        }
      ],
      __dangerouslyDisableSanitizers: ['script']
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.$nuxt.$loading.finish()
    })

    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action == 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else if (!event.slugChanged) {
        window.location.reload()
      }
    })
  },
  asyncData (context) {
    let editMode = false
    if(context.payload) {
      return { story: context.payload }
    } else {
      if (context.query._storyblok || context.isDev || (typeof window !== 'undefined' && window.localStorage.getItem('_storyblok_draft_mode'))) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('_storyblok_draft_mode', '1')
          if (window.location == window.parent.location) {
            window.localStorage.removeItem('_storyblok_draft_mode')
          }
        }

        editMode = true
      }

      let version = editMode ? 'draft' : 'published'

      // this wants to be lang agnostic
      let path = context.route.path === '/' ? '/home' : context.route.path === '/zh-cn/' ? '/zh-cn/home' : context.route.path

      let lang = context.nuxtState ? context.nuxtState.state.language : ''

      // Load the JSON from the API
      return loadData({
        lang: lang,
        version: version,
        api: context.app.$storyapi,
        cacheVersion: context.store.state.cacheVersion,
        errorCallback: context.error,
        path: path
      })
    }
  },
  methods: {
    handleScroll (evt, el) {
      let clsName = el.className
      let scrollCls = ' Page--scrolled'
      let includesScroll = clsName.includes(scrollCls)

      if (window.scrollY > 80) {
        if (!includesScroll) {
          el.setAttribute('class', clsName + scrollCls)
        }
      } else {
        if (includesScroll) {
          el.setAttribute('class', clsName.replace(scrollCls, ''))
        }
      }
    }
  }
}
</script>
