<template>
  <div>
    <div :id=`hubspotform-${this.blok.formId}`>
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
  mounted () {
    hbspt.forms.create({
            portalId: this.blok.portalId,
            formId: this.blok.formId,
            target: `'#hubspotform-'${this.blok.formId}`
    })
  }
}
</script>
