import Vue from 'vue'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Page from '~/src/components/Templates/Page'
import Article from '~/src/components/Types/Article'
import Person from '~/src/components/Types/Person'

import Accordion from '~/src/components/Modules/Accordion'
import ASpot from '~/src/components/Modules/ASpot'
import Btn from '~/src/components/Elements/Btn'
import CardList from '~/src/components/Modules/CardList'
import Checklist from '~/src/components/Modules/Checklist'
import Cta from '~/src/components/Modules/Cta'
import FaqList from '~/src/components/Modules/FaqList'
import FeaturedCardList from '~/src/components/Modules/FeaturedCardList'
import Footer from '~/src/components/Modules/Footer'
import Form from '~/src/components/Modules/Forms'
import FormEmbed from '~/src/components/Modules/FormEmbed'
import IconTextList from '~/src/components/Modules/IconTextList'
import IconTextListCollapse from '~/src/components/Modules/IconTextList/collapse'
import IFrame from '~/src/components/Modules/IFrame'
import LogoList from '~/src/components/Modules/LogoList'
import LinkList from '~/src/components/Modules/LinkList'
import MemberList from '~/src/components/Modules/MemberList'
import Metrics from '~/src/components/Modules/Metrics'
import Navigation from '~/src/components/Modules/Navigation'
import Process from '~/src/components/Modules/Process'
import RichText from '~/src/components/Modules/RichText'
import Quote from '~/src/components/Modules/Quote'
import QuoteList from '~/src/components/Modules/QuoteList'
import Slider from '~/src/components/Modules/Slider'
import Stats from '~/src/components/Modules/Stats'
import StaffList from '~/src/components/Modules/StaffList'
import Table from '~/src/components/Modules/Table/table'
import TableList from '~/src/components/Modules/Table/tableList'
import Tabs from '~/src/components/Modules/Tabs'
import Testimonials from '~/src/components/Modules/Testimonials'
import Timeline from '~/src/components/Modules/Timeline'
import TitleBlock from '~/src/components/Modules/TitleBlock'
import VideoEmbed from '~/src/components/Modules/VideoEmbed'

import Takeover from '~/src/components/Modules/Takeover'

Vue.component('blok-page', Page)
Vue.component('blok-article', Article)
Vue.component('blok-person', Person)

Vue.component('blok-accordion', Accordion)
Vue.component('blok-a-spot', ASpot)
Vue.component('blok-btn', Btn)
Vue.component('blok-card-list', CardList)
Vue.component('blok-checklist', Checklist)
Vue.component('blok-cta', Cta)
Vue.component('blok-faq-list', FaqList)
Vue.component('blok-featured-card-list', FeaturedCardList)
Vue.component('blok-form', Form)
Vue.component('blok-hubspot-form', FormEmbed)
Vue.component('blok-footer', Footer)
Vue.component('blok-icon-text-list', IconTextList)
Vue.component('blok-icon-text-list-collapse', IconTextListCollapse)
Vue.component('blok-iframe', IFrame)
Vue.component('blok-link-list', LinkList)
Vue.component('blok-logo-list', LogoList)
Vue.component('blok-member-list', MemberList)
Vue.component('blok-metrics', Metrics)
Vue.component('blok-navigation', Navigation)
Vue.component('blok-process', Process)
Vue.component('blok-rich-text', RichText)
Vue.component('blok-quote', Quote)
Vue.component('blok-quote-list', QuoteList)
Vue.component('blok-slider', Slider)
Vue.component('blok-staff-list', StaffList)
Vue.component('blok-stats', Stats)
Vue.component('blok-step', BaseComponent)
Vue.component('blok-table', Table)
Vue.component('blok-table-list', TableList)
Vue.component('blok-tabs', Tabs)
Vue.component('blok-testimonials', Testimonials)
Vue.component('blok-timeline', Timeline)
Vue.component('blok-title-block', TitleBlock)
Vue.component('blok-video-embed', VideoEmbed)


Vue.component('blok-takeover', Takeover)
