<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  src: { type: String },
})

const image = ref()
watchEffect(async () => {
  let path = `${location.origin}`
  path = path.indexOf('localhost') > -1 ? `${path}/src` : path
  image.value = path? `${path}/assets/${props.src}`: ''
})
</script>

<template>
  <img :src="image" />
</template>
