<script setup>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { RouterView } from 'vue-router'
import { useRouter } from "vue-router";

import Loading from './components/Loading.vue'

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 500)

const router = useRouter();

router.afterEach((to, from) => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 500)
});
</script>

<template>
  <Loading :active="isLoading" />
  <div id="content">
    <RouterView />
  </div>
</template>

<style scoped>
#content {
  min-height: 100vh;
}

#content > main {
  min-height: 100vh;
}
</style>
