<script setup>
import { ref } from "@vue/reactivity"
import { watch } from "@vue/runtime-core"
import Image from "./Helpers/Image.vue"

const props = defineProps({
  active: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: "Aguarde...",
  },
})

const isLoading = ref(props.active)
const loadingText = ref(props.text)

watch(props, (newProps) => {
  isLoading.value = newProps.active
  loadingText.value = newProps.text
})
</script>

<template>
  <div id="loading" v-if="isLoading">
    <h2>
      <Image src="/images/loading.gif" /> <br/>
      <span>{{ loadingText }}</span>
    </h2>
  </div>
</template>

<style scoped>
#loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.94);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
