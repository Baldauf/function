<template>
  <div>
    <div
      :class="BEM_B"
      :id="'hubspotform-' + blok.formId"
    >
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'FormEmbed'
    }
  },
  computed: {
    computeCls () {
      let arr = []
      if (this.blok && this.blok.classes) {
        arr = this.blok.classes.split(',')
      }

      return arr
    },
    BEM_B () {
      return BEM.methods.BlockCls(this.name, this.computeCls)
    }
  },
  mounted () {
    hbspt.forms.create({
            portalId: this.blok.portalId,
            formId: this.blok.formId,
            target: '#hubspotform-' + this.blok.formId
    })
  }
}
</script>
