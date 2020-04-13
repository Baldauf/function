<template>
  <div>
    foo
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
  created () {
    let hsScript = document.createElement('script')
    hsScript.setAttribute('src',"//js.hsforms.net/forms/v2.js")
    document.head.appendChild(hsScript)
  },
  mounted () {
    console.log('hit')
    hbspt.forms.create({
            portalId: "7156206",
            formId: "d5dd2eec-b878-4b06-aa0d-81dcdf94a2a8"
    })
  }
}
</script>
