<template>
  <div :class="collapses ? BEM_B + 'collapses' : BEM_B">
    <a :href="fancyPath"
       :class="!this.path ? BEM_E('link') + ' ' + BEM_E('link--no-path') : BEM_E('link')">
      <div :class="!this.image ? BEM_E('image') + ' no-image' : BEM_E('image')">
        <Vector v-if="this.svg" :name="this.svg" width="300" height="250" />
        <img v-if="this.image && this.image.imageLocation"
          :src="prepImg(this.image.imageLocation, imageDims ? imageDims[0] + 'x' + imageDims[1] + '/smart' : '600x300/smart')"
          :alt="this.image.imageAlt" />
        <img
          v-else-if="typeof this.image === 'string'"
          :src="prepImg(this.image, imageDims ? imageDims[0] + 'x' + imageDims[1] + '/smart' : '600x300/smart')">
        <img v-if="!this.image && !this.svg"
          :src="prepImg('//a.storyblok.com/f/52232/1920x1280/9c818873ed/placeholder.jpg', imageDims ? imageDims[0] + 'x' + imageDims[1] + '/smart' : '600x300/smart')" alt="Placeholder">
    </div>
      <div :class="BEM_E('details')">
        <div :class="BEM_E('metadata')"v-if="this.contentType || this.date">
          <span v-if="this.contentType" :class="BEM_E('contentType')">{{this.contentType}}</span>
          <span v-if="showDate">&nbsp;·&nbsp;</span>
          <DateTimeZone
            v-if="showDate"
            :blok="this.date"
            :disableTime="this.contentType == 'article' || this.contentType == 'webcast' ? true : null" />
        </div>
        <div :class="BEM_E('contents')">
          <div
            @click="handleCardCollapse($event)"
            :class="BEM_E('title')"
            aria-controls="cardCollapse"
            :aria-expanded="collapses ? showCollapse ? 'true' : 'false' : 'true'">
            <span>{{this.title}}</span>
            <Vector v-if="collapses" name="icon/caret-down" width="13" />
          </div>
          <b-collapse v-model="showCollapse" id="cardCollapse">
            <div v-if="this.caption" :class="BEM_E('caption')">{{truncateText(this.caption, 120)}}</div>
          </b-collapse>
          <span :class="BEM_E('link--sm')" v-if="this.link && this.linkLabel">{{this.linkLabel}}</span>
        </div>
        <div :class="BEM_E('tags')" v-if="this.tags && this.tags.length > 0">
          <TagList
            :tags="this.tags"
            :shouldLink="contentType === 'user' ? false : true"
            :allowMax="tagMax ? tagMax : 3"
            :linkType="contentType + 's'" />
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import DateTimeZone from '~/src/components/Elements/DateTimeZone'
import TagList from '~/src/components/Elements/TagList'

export default {
  extends: BaseComponent,
  components: {
    DateTimeZone,
    TagList
  },
  props: {
    name: {
      type: String,
      default: 'Card'
    },
    svg: String,
    image: [Object, String],
    imageDims: Array,
    title: String,
    caption: String,
    date: [Array, Object],
    contentType: String,
    tags: [Array, String],
    tagMax: Number,
    type: String,
    link: String,
    linkLabel: String,
    path: String,
    collapses: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showCollapse: !this.collapses
    }
  },
  methods: {
    handleCardCollapse (event) {
      if (event && this.collapses) {
        event.preventDefault()

        this.showCollapse = !this.showCollapse
      }

      return
    },
    truncateText(str, length) {
      let strLength = str.length
      let truncated = str.substring(0, length) + (strLength > length ? '...' : '')

      return truncated
    },
    checkResourceMatch(link) {
      let env = process.env.prodUrl

      let resourceMatch = [
        'resources', 'zh-cn/resources', 'zh-cn/zh_cn/resources',
        'articles',  'zh-cn/articles',  'zh-cn/zh_cn/articles',
        'events',    'zh-cn/events',    'zh-cn/events',
        'faqs',      'zh-cn/faqs',      'zh-cn/zh_cn/faqs',
        'people',    'zh-cn/people',    'zh-cn/zh_cn/people',
        'tools',     'zh-cn/tools',     'zh-cn/zh_cn/tools',
        'webcasts',  'zh-cn/webcasts',   'zh-cn/zh_cn/webcasts']

      let isResource = resourceMatch.some(function(v) { return link.startsWith(v) })
      let domainIsResources = env.includes('resources.wellcertified')

      if(isResource && domainIsResources) {
        return true
      } else if(!isResource && domainIsResources) {
        return false
      } else if(isResource && !domainIsResources) {
        return false
      } else if(!isResource && !domainIsResources) {
        return true
      }

      return false
    }
  },
  computed: {
    showDate() {
      if (this.contentType && this.contentType !== 'tool' && this.date && this.date.dateTime) {
        return true
      }
    },
    isStaffMember () {
      return this.path.includes('about/team')
    },
    fancyPath () {
      if(this.path) {
        let path = this.path

        // if story + matchesDomain, route story
        path = path.replace('zh-cn/zh_cn/', '/zh-cn/')

        if (this.isStaffMember && this.$route.path.endsWith('about/')) {
          path = path.replace('about/', '')
        }

        return path
      }
    }
  }
}
</script>
