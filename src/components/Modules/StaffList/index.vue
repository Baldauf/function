<template>
  <div :class="BEM_B" :id="blok.id ? blok.id : null">
    <CardList
      :mods="['4-up']"
      :startsWith="this.$store.state.language !== 'en' ? this.$store.state.language + '/about/team/' : 'about/team/'"
      :sortOrder="blok.sortBy || 'position:desc'"
      :blok="blok && staffBlok ? staffBlok : []"
      :perPage="25"
      :cardImageDims="['300', '300']" />
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import CardList from '~/src/components/Modules/CardList'

export default {
  extends: BaseComponent,
  components: { CardList },
  props: {
    name: {
      type: String,
      default: 'StaffCardList'
    },
    blok: Object
  },
  computed: {
    staffBlok () {
      if (this.blok) {
        const staffBlock = this.blok
        staffBlock.cards = []

        return staffBlock
      }
    }
  }
}
</script>
