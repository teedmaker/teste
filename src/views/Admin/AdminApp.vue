<script setup>
import Navbar from '@/components/Navbar/Navbar.vue'
import Loading from '@/components/Loading.vue'

import store from '@/store/index.js'
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoading = computed(() => store.state.isLoading);
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
