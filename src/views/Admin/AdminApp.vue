<script setup>
import Navbar from '@/components/Navbar/Navbar.vue'
import Loading from '@/components/Loading.vue'

import store from '@/store/index.js'
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoading = computed(() => store.state.isLoading);

try {
  const profile = JSON.parse(localStorage.getItem('profile') || '');
  if (!profile) {
    throw new Error('Usuário não autenticado');
  }

  store.state.profile.user = profile;

  setTimeout(() => {
    store.commit('setIsLoading', false)
  }, 1000)
} catch (error) {
  router.push({ name: 'login' })
}
</script>

<template>
  <div>
    <Loading :active="isLoading" />
    <router-view />
    <Navbar />
  </div>
</template>

<style>
</style>
